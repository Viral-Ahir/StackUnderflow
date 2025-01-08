import Answers from "../models/answers";
import {
  IAnswer,
  IQuestion,
  IUser,
  IProfile,
  IComment,
} from "../models/types/types";
import Questions from "../models/questions";
import Comments from "../models/comments";
import Tags from "../models/tags";
import mongoose from "mongoose";
import User from "../models/user";
import Profile from "../models/profile";

export type SortOrder = "active" | "newest" | "unanswered";
export type ErrorWrapped<T> = { error: string } | T;

/**
 * Check if a user with the provided username or email already exists
 * @param username - The username to check
 * @param email - The email to check
 * @returns The existing user object or null if not found
 */
export const findExistingUser = async (
  username: string,
  email: string
): Promise<IUser | null> => {
  return await User.findOne({ $or: [{ username }, { email }] }).exec();
};

/**
 * Save a new user to the database
 * @param userData - The user data to save
 * @returns The saved user object
 */
export const saveUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

/**
 * Get a user by username
 * @param username - The username to search for
 * @returns The user object or null if not found
 */
export const getUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  return await User.findOne({ username }).exec();
};

/**
 * Fetches a user from the database using their userId
 * @param userId - The ID of the user to fetch
 * @returns The user object if found, otherwise null
 */
export const getUserById = async (userId: string): Promise<IUser | null> => {
  try {
    const user = await User.findById(userId).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};

/**
 * Retrieve the profile details of the user, including saved questions
 * @param username - The Name of the user
 * @returns The user profile details including saved questions
 */
export const getUserProfile = async (username: string) => {
  try {
    const profile = await Profile.findOne({ username });
    return profile;
  } catch (error) {
    return { error: (error as Error).message || "Error retrieving profile" };
  }
};

/**
 * Create a new profile for the user
 * @param name - The ID of the user
 * @returns The created profile object
 */
export const createProfile = async (name: string): Promise<IProfile> => {
  const profile = new Profile({ username: name });
  return await profile.save();
};

/**
 * Function to update a user's profile
 * @param currentUsername - The current username of the user
 * @param updates - The updates to apply (username and/or bio)
 * @returns - The updated profile or an error object
 */
export const updateUserProfile = async (
  currentUsername: string,
  updates: { username: string; bio?: string }
): Promise<{ error?: string }> => {
  try {
    const user = await User.findOne({ username: currentUsername });
    if (!user) {
      return { error: "User not found" };
    }
    user.username = updates.username;
    await user.save();

    await Profile.findOneAndUpdate(
      { username: currentUsername },
      { username: updates.username, bio: updates.bio || "" }
    );

    return {};
  } catch (error) {
    console.error("Error updating profile:", error);
    return { error: "Error updating profile" };
  }
};

/**
 * A function to add a tag to the database
 * @param tname - the tag name
 * @returns the id of an existing tag, the id of the newly added tag, or null if an error occurs
 */
const addTag = async (tname: string): Promise<string | null> => {
  try {
    const checkTag = await Tags.findOne({ name: tname }).exec();
    if (checkTag) {
      return checkTag._id;
    } else {
      const newTag = new Tags({ name: tname });
      const savedTag = await newTag.save();
      return savedTag._id;
    }
  } catch (error) {
    console.error("Error in addTag:", error);
    return null;
  }
};

/**
 * retrieve questions based on a specified order
 * @param order the order to sort the questions
 * @returns list of questions sorted by the specified order
 */
const getQuestionsByOrder = async (order: SortOrder) => {
  let result: IQuestion[] = await Questions.find()
    .populate("tags")
    .populate("answers");

  if (order === "newest") {
    result.sort(
      (a, b) => b.ask_date_time.getTime() - a.ask_date_time.getTime()
    );
  } else if (order === "unanswered") {
    result = result.filter((q) => q.answers.length === 0);
    result.sort(
      (a, b) => b.ask_date_time.getTime() - a.ask_date_time.getTime()
    );
  } else if (order === "active") {
    result = result.sort(
      (a, b) => b.ask_date_time.getTime() - a.ask_date_time.getTime()
    );
    result.sort(
      (a, b) => getMaxAnswerDate(b.answers) - getMaxAnswerDate(a.answers)
    );
  }
  return result;
};

/**
 * A function to get the maximum answer date from a list of answers
 * @param answers the list of answers
 * @returns the maximum answer date
 */
const getMaxAnswerDate = (answers: IAnswer[]) => {
  const answerDates = answers.map((a) => a.ans_date_time.getTime());
  return Math.max(...answerDates);
};

/**
 * A function to filter questions based on search string
 * @param qlist - the list of questions to be filtered
 * @param search - the filter string
 * @returns the filtered list of questions
 */
const filterQuestionsBySearch = (
  qlist: IQuestion[] | undefined,
  search: string
): IQuestion[] => {
  if (!search.trim()) {
    return qlist || [];
  }

  let result: IQuestion[] = [];
  search = search.trim().toLowerCase();
  const searchTerms =
    search.replace(/\[[^[\]]+\]/g, " ").match(/\b\w+\b/g) || [];
  const searchTags = (search.match(/\[[^[\]]+\]/g) || []).map((word) =>
    word.slice(1, -1)
  );

  if (searchTags.length > 0) {
    result = (qlist || []).filter((q) =>
      q.tags.some((t) => searchTags.includes(t.name))
    );
  }

  if (searchTerms.length > 0) {
    const titleOrTextMatches = (qlist || []).filter((q) =>
      searchTerms.some(
        (term) =>
          q.title.toLowerCase().includes(term) ||
          q.text.toLowerCase().includes(term)
      )
    );
    result.push(...titleOrTextMatches.filter((q) => !result.includes(q)));
  }

  return result;
};

/**
 * Function that fetches a question by id and increments the views by 1
 * @param qid the question id
 * @returns a question object with the incremented views
 */
const fetchAndIncrementQuestionViewsById = async (
  qid: string
): Promise<ErrorWrapped<IQuestion | null>> => {
  try {
    if (!qid) return { error: "Error when fetching and updating a question" };
    const r: IQuestion | null = await Questions.findOneAndUpdate(
      { _id: qid },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate({
        path: "answers",
        populate: {
          path: "comments",
          populate: { path: "commented_by", model: "User" },
        },
      })
      .populate({
        path: "comments",
        populate: { path: "commented_by", model: "User" },
      })
      .populate("tags")
      .populate("upvotes_by")
      .populate("downvotes_by");
    return r;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * saves a question to the database
 * @param q question object to save
 * @returns the question object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the question is invalid
 */
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

/**
 * Save a question to the database.
 * @function saveQuestion
 * @param {IQuestion} q - The question object to save.
 * @returns {Promise<IQuestion | { error: string }>} The saved question object or an error object if the save fails.
 * @throws {Error} If an exception occurs during the save process.
 */
const saveQuestion = async (
  q: IQuestion
): Promise<IQuestion | { error: string }> => {
  try {
    const questionData = { ...q };
    if (questionData._id && !isValidObjectId(questionData._id)) {
      delete questionData._id; // Remove invalid ID if present
    }
    const newQuestion = new Questions(questionData);
    const savedQuestion = await newQuestion.save();
    return savedQuestion;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * saves an answer to the database
 * @param a answer object to save
 * @returns the answer object saved to the database
 * or an object with an error message if the save failed
 * @throws an error if the answer is invalid
 */
const saveAnswer = async (a: IAnswer): Promise<ErrorWrapped<IAnswer>> => {
  try {
    const answerData = { ...a };

    if (answerData._id && !isValidObjectId(answerData._id)) {
      delete answerData._id;
    }

    const newAnswer = new Answers(answerData);
    const savedAnswer = await newAnswer.save();
    return savedAnswer;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Save a comment to the database.
 * @function saveComment
 * @param {IComment} c - The comment object to save.
 * @returns {Promise<ErrorWrapped<IComment>>} The saved comment object or an error object if the save fails.
 * @throws {Error} If an exception occurs during the save process.
 */
const saveComment = async (c: IComment): Promise<ErrorWrapped<IComment>> => {
  try {
    const commentData = { ...c };

    if (commentData._id && !isValidObjectId(commentData._id)) {
      delete commentData._id; // Remove invalid ID if present
    }

    const newComment = new Comments(commentData);
    const savedComment = await newComment.save();
    return savedComment;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Add a comment to a question.
 * @function addCommentToQuestion
 * @param {string} qid - The ID of the question to which the comment will be added.
 * @param {IComment} comment - The comment object to add.
 * @returns {Promise<ErrorWrapped<IQuestion | null>>} The updated question object or an error object if the operation fails.
 * @throws {Error} If an exception occurs during the operation.
 */
const addCommentToQuestion = async (
  qid: string,
  comment: IComment
): Promise<ErrorWrapped<IQuestion | null>> => {
  try {
    const question = await Questions.findById(qid);
    if (!question) return { error: "Question not found" };

    question.comments.push(comment);
    await question.save();
    return question;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Add a comment to an answer.
 * @function addCommentToAnswer
 * @param {string} aid - The ID of the answer to which the comment will be added.
 * @param {IComment} comment - The comment object to add.
 * @returns {Promise<ErrorWrapped<IAnswer | null>>} The updated answer object or an error object if the operation fails.
 * @throws {Error} If an exception occurs during the operation.
 */
const addCommentToAnswer = async (
  aid: string,
  comment: IComment
): Promise<ErrorWrapped<IAnswer | null>> => {
  try {
    const answer = await Answers.findById(aid);
    if (!answer) return { error: "Answer not found" };

    answer.comments.push(comment);
    await answer.save();
    return answer;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Add a vote to a question.
 * @function addVoteToQuestion
 * @param {string} qid - The ID of the question to vote on.
 * @param {string} userId - The ID of the user casting the vote.
 * @param {string} voteType - The type of vote to cast (up or down).
 * @returns {Promise<ErrorWrapped<IQuestion | null>>} The updated question object or an error object if the operation fails.
 * @throws {Error} If an exception occurs during the operation.
 */
const addVoteToQuestion = async (
  qid: string,
  userId: string,
  voteType: string
): Promise<ErrorWrapped<IQuestion | null>> => {
  try {
    const user = await User.findById(userId);
    const question = await Questions.findById(qid);

    if (!user) return { error: "User not found" };
    if (!question) return { error: "Question not found" };

    if (
      question.upvotes_by.map(String).includes(userId) ||
      question.downvotes_by.map(String).includes(userId)
    ) {
      return { error: "User has already voted on this question" };
    }

    let update: {
      $inc: { vote_count: number };
      $push: { upvotes_by?: string; downvotes_by?: string };
    } = { $inc: { vote_count: 0 }, $push: {} };

    if (voteType === "up") {
      update = {
        $inc: { vote_count: 1 },
        $push: { upvotes_by: userId },
      };
    } else if (voteType === "down") {
      update = {
        $inc: { vote_count: -1 },
        $push: { downvotes_by: userId },
      };
    } else {
      return { error: "Invalid vote type" };
    }

    const updatedQuestion = await Questions.findByIdAndUpdate(qid, update, {
      new: true,
    });

    if (!updatedQuestion) return { error: "Failed to update question" };

    return updatedQuestion;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Add a vote to an answer.
 * @function addVoteToAnswer
 * @param {string} aid - The ID of the answer to vote on.
 * @param {string} userId - The ID of the user casting the vote.
 * @param {string} voteType - The type of vote to cast (up or down).
 * @returns {Promise<ErrorWrapped<IAnswer | null>>} The updated answer object or an error object if the operation fails.
 * @throws {Error} If an exception occurs during the operation.
 */
const addVoteToAnswer = async (
  aid: string,
  userId: string,
  voteType: string
): Promise<ErrorWrapped<IAnswer | null>> => {
  try {
    const user = await User.findById(userId);
    const answer = await Answers.findById(aid);

    if (!user) return { error: "User not found" };
    if (!answer) return { error: "Answer not found" };

    if (
      answer.upvotes_by.map(String).includes(userId) ||
      answer.downvotes_by.map(String).includes(userId)
    ) {
      return { error: "User has already voted on this answer" };
    }
    let update: {
      $inc: { vote_count: number };
      $push: { upvotes_by?: string; downvotes_by?: string };
    } = { $inc: { vote_count: 0 }, $push: {} };

    if (voteType === "up") {
      update = {
        $inc: { vote_count: 1 },
        $push: { upvotes_by: userId },
      };
    } else if (voteType === "down") {
      update = {
        $inc: { vote_count: -1 },
        $push: { downvotes_by: userId },
      };
    } else {
      return { error: "Invalid vote type" };
    }

    const updatedAnswer = await Answers.findByIdAndUpdate(aid, update, {
      new: true,
    });

    if (!updatedAnswer) return { error: "Failed to update answer" };

    return updatedAnswer;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Retrieves tag ids from the database
 * @param tagNames a list of tag names
 * @returns returns a string array of tag ids
 * or empty array if the tag ids could not be retrieved
 */
const getTagIds = async (tagNames: string[]): Promise<string[]> => {
  try {
    const tagIds = await Promise.all(
      tagNames.map(async (tagName) => {
        let tag = await Tags.findOne({ name: tagName }).exec();
        if (!tag) {
          tag = new Tags({ name: tagName });
          await tag.save();
        }
        return tag._id;
      })
    );

    return tagIds;
  } catch (error) {
    throw new Error(
      (error as Error).message || "Error fetching or creating tag IDs"
    );
  }
};

/**
 * save an answer in the database, add the answer to the question, and update the question in the database
 * @param qid the question id
 * @param ans the answer object to be added
 * @returns the question object with the added answer or an object with an error message if the operation failed
 */
const addAnswerToQuestion = async (
  qid: string,
  ans: IAnswer
): Promise<ErrorWrapped<IQuestion | null>> => {
  try {
    const question = await Questions.findById(qid);
    if (!question) return { error: "Question not found" };

    question.answers.push(ans);
    await question.save();
    return question;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

/**
 * Retrieves the question count of each tag in the database
 * @returns a map where the key is the tag name and the value is the count of questions with that tag
 */
const getTagCountMap = async (): Promise<ErrorWrapped<Map<string, number>>> => {
  try {
    const tags = await Tags.find();
    const tagMap = new Map<string, number>();

    tags.forEach((tag) => {
      tagMap.set(tag.name, 0);
    });

    const questions = await Questions.find().populate("tags");
    if (questions) {
      questions.forEach((question) => {
        question.tags.forEach((tag) => {
          if (tagMap.has(tag.name)) {
            tagMap.set(tag.name, (tagMap.get(tag.name) ?? 0) + 1);
          }
        });
      });
    }

    return tagMap;
  } catch (error) {
    return { error: (error as Error).message };
  }
};

export {
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  saveQuestion,
  getTagIds,
  saveAnswer,
  addAnswerToQuestion,
  getTagCountMap,
  saveComment,
  addCommentToQuestion,
  addCommentToAnswer,
  addVoteToQuestion,
  addVoteToAnswer,
};
