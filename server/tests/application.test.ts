const mockingoose = require("mockingoose");
import {
  addTag,
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  saveQuestion,
  getTagIds,
  saveAnswer,
  getTagCountMap,
  findExistingUser,
  saveUser,
  getUserByUsername,
  getUserById,
  getUserProfile,
  createProfile,
  updateUserProfile,
  addAnswerToQuestion,
  saveComment,
  addCommentToQuestion,
  addCommentToAnswer,
  addVoteToAnswer,
  addVoteToQuestion,
} from "../models/application";
import { IAnswer, IComment, IQuestion, ITag } from "../models/types/types";
import Questions from "../models/questions";
import Tags from "../models/tags";
import User from "../models/user";
import Profile from "../models/profile";
import Answers from "../models/answers";
import Comments from "../models/comments";

Questions.schema.path("answers", Array);
Questions.schema.path("tags", Array);
Questions.schema.path("comments", Array);
Questions.schema.path("upvotes_by", Array);
Questions.schema.path("downvotes_by", Array);
Answers.schema.path("comments", Array);
Answers.schema.path("upvotes_by", Array);
Answers.schema.path("downvotes_by", Array);

const _tag1: ITag = {
  _id: "507f191e810c19729de860ea",
  name: "react",
};

const _tag2: ITag = {
  _id: "65e9a5c2b26199dbcc3e6dc8",
  name: "javascript",
};

const _tag3: ITag = {
  _id: "65e9b4b1766fca9451cba653",
  name: "android",
};

const _ans1: IAnswer = {
  _id: "65e9b58910afe6e94fc6e6dc",
  text: "ans1",
  ans_by: "ans_by1",
  ans_date_time: new Date("2023-11-18T09:24:00"),
  comments: [],
  vote_count: 0,
  upvotes_by: [],
  downvotes_by: [],
};

const _ans2: IAnswer = {
  _id: "65e9b58910afe6e94fc6e6dd",
  text: "ans2",
  ans_by: "ans_by2",
  ans_date_time: new Date("2023-11-20T09:24:00"),
  comments: [],
  vote_count: 0,
  upvotes_by: [],
  downvotes_by: [],
};

const _ans3: IAnswer = {
  _id: "65e9b58910afe6e94fc6e6de",
  text: "ans3",
  ans_by: "ans_by3",
  ans_date_time: new Date("2023-11-19T09:24:00"),
  comments: [],
  vote_count: 0,
  upvotes_by: [],
  downvotes_by: [],
};

const _ans4: IAnswer = {
  _id: "65e9b58910afe6e94fc6e6df",
  text: "ans4",
  ans_by: "ans_by4",
  ans_date_time: new Date("2023-11-19T09:24:00"),
  comments: [],
  vote_count: 0,
  upvotes_by: [],
  downvotes_by: [],
};

const _user = {
  _id: "507f191e810c19729de860ea",
  username: "testuser",
  email: "testuser@example.com",
  password: "hashedpassword",
};

const _comment: IComment = {
  _id: "507",
  text: "This is a test comment",
  commented_by: _user,
  post_date_time: new Date("2023-11-20T09:24:00"),
};

const _questions: IQuestion[] = [
  {
    _id: "65e9b58910afe6e94fc6e6dc",
    title: "Quick question about storage on android",
    text: "I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains",
    tags: [_tag3, _tag2],
    answers: [_ans1, _ans2],
    ask_date_time: new Date("2023-11-16T09:24:00"),
    views: 48,
    comments: [],
    vote_count: 0,
    upvotes_by: [],
    downvotes_by: [],
  },
  {
    _id: "65e9b5a995b6c7045a30d823",
    title: "Object storage for a web application",
    text: "I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.",
    tags: [_tag1, _tag2],
    answers: [_ans1, _ans2, _ans3],
    ask_date_time: new Date("2023-11-17T09:24:00"),
    views: 34,
    comments: [],
    vote_count: 0,
    upvotes_by: [],
    downvotes_by: [],
  },
  {
    _id: "65e9b9b44c052f0a08ecade0",
    title: "Is there a language to write programmes by pictures?",
    text: "Does something like that exist?",
    tags: [],
    answers: [],
    ask_date_time: new Date("2023-11-19T09:24:00"),
    views: 12,
    comments: [],
    vote_count: 0,
    upvotes_by: [],
    downvotes_by: [],
  },
  {
    _id: "65e9b716ff0e892116b2de09",
    title: "Unanswered Question #2",
    text: "Does something like that exist?",
    tags: [],
    answers: [],
    ask_date_time: new Date("2023-11-20T09:24:00"),
    views: 233,
    comments: [],
    vote_count: 0,
    upvotes_by: [],
    downvotes_by: [],
  },
];

const _profile = {
  _id: "607f1f77bcf86cd799439011",
  username: "testuser",
  bio: "This is a test bio",
};

// findExistingUser
test("findExistingUser returns user if username or email exists", async () => {
  mockingoose(User).toReturn(_user, "findOne");
  const result = await findExistingUser("testuser", "testuser@example.com");
  expect(result).toBeDefined();
  expect(result?.username).toEqual("testuser");
  expect(result?.email).toEqual("testuser@example.com");
});

test("findExistingUser returns null if no user exists", async () => {
  mockingoose(User).toReturn(null, "findOne");
  const result = await findExistingUser(
    "nonexistent",
    "nonexistent@example.com"
  );
  expect(result).toBeNull();
});

// saveUser
test("saveUser saves a new user and returns it", async () => {
  mockingoose(User).toReturn(_user, "save");
  const result = await saveUser(_user);
  expect(result).toBeDefined();
  expect(result.username).toEqual("testuser");
  expect(result.email).toEqual("testuser@example.com");
});

// getUserByUsername
test("getUserByUsername returns user when username exists", async () => {
  mockingoose(User).toReturn(_user, "findOne");
  const result = await getUserByUsername("testuser");
  expect(result).toBeDefined();
  expect(result?.username).toEqual("testuser");
});

test("getUserByUsername returns null if user does not exist", async () => {
  mockingoose(User).toReturn(null, "findOne");
  const result = await getUserByUsername("nonexistent");
  expect(result).toBeNull();
});

// getUserById
test("getUserById returns user when ID exists", async () => {
  // Correctly mock the response for findById (use findOne)
  mockingoose(User).toReturn(_user, "findOne");

  const result = await getUserById("507f191e810c19729de860ea");

  expect(result).toBeDefined();
  expect(result?.username).toEqual("testuser");
  expect(result?.email).toEqual("testuser@example.com");
});

test("getUserById returns null if user ID does not exist", async () => {
  // Mock findOne to return null, simulating no user found
  mockingoose(User).toReturn(null, "findOne");

  const result = await getUserById("invalidID");

  expect(result).toBeNull();
});

test("getUserById returns null on database error", async () => {
  // Mock findOne to throw an error
  mockingoose(User).toReturn(new Error("Database error"), "findOne");

  const result = await getUserById("507f191e810c19729de860ea");

  expect(result).toBeNull(); // Ensure the function handles errors and returns null
});

// getUserProfile
test("getUserProfile returns profile if user exists", async () => {
  mockingoose(Profile).toReturn(_profile, "findOne");
  const result = await getUserProfile("testuser");

  // Check if the result is not an error object
  if (result && "error" in result) {
    fail(`Expected a profile but got an error: ${result.error}`);
  } else {
    expect(result).toBeDefined();
    expect(result?.username).toEqual("testuser");
    expect(result?.bio).toEqual("This is a test bio");
  }
});

test("getUserProfile returns error if profile fetch fails", async () => {
  // Mock Profile.findOne to throw an error
  mockingoose(Profile).toReturn(new Error("Profile not found"), "findOne");

  const result = await getUserProfile("testuser");

  // Check if the result is an error object
  if (result && "error" in result) {
    expect(result).toHaveProperty("error");
    expect(result.error).toEqual("Profile not found");
  } else {
    fail(`Expected an error but got a profile: ${JSON.stringify(result)}`);
  }
});

// createProfile
test("createProfile creates a new profile and returns it", async () => {
  mockingoose(Profile).toReturn(_profile, "save");
  const result = await createProfile("testuser");
  expect(result).toBeDefined();
  expect(result.username).toEqual("testuser");
});

// updateUserProfile
test("updateUserProfile updates user and profile successfully", async () => {
  mockingoose(User).toReturn(_user, "findOne");
  mockingoose(Profile).toReturn(null, "findOneAndUpdate");

  const result = await updateUserProfile("testuser", {
    username: "newuser",
    bio: "Updated bio",
  });
  expect(result).toEqual({});
});

test("updateUserProfile returns error if user is not found", async () => {
  mockingoose(User).toReturn(null, "findOne");

  const result = await updateUserProfile("nonexistent", {
    username: "newuser",
    bio: "Updated bio",
  });
  expect(result).toHaveProperty("error");
  expect(result.error).toEqual("User not found");
});

test("updateUserProfile returns error on database error", async () => {
  mockingoose(User).toReturn(new Error("Database error"), "findOne");

  const result = await updateUserProfile("testuser", {
    username: "newuser",
    bio: "Updated bio",
  });
  expect(result).toHaveProperty("error");
  expect(result.error).toEqual("Error updating profile");
});

describe("application module", () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  describe("saveComment", () => {
    const _comment = {
      _id: "507",
      text: "This is a test comment",
      commented_by: _user,
      post_date_time: new Date("2023-11-20T09:24:00"),
    };

    test("saveComment should save a valid comment", async () => {
      mockingoose(Comments).toReturn(_comment, "create");

      const result = await saveComment(_comment);

      expect(result).toHaveProperty("_id");
      if ("error" in result) {
        fail(`Expected a comment but got an error: ${result.error}`);
      } else {
        expect(result._id).toBeDefined();
      }
      expect(result.text).toBe("This is a test comment");
    });

    test("saveComment should remove invalid _id and save the comment", async () => {
      const commentWithInvalidId = { ..._comment, _id: "invalidId" };
      mockingoose(Comments).toReturn(
        { ..._comment, _id: "newValidId" },
        "create"
      );

      const result = await saveComment(commentWithInvalidId);

      expect(result).toHaveProperty("_id");
      if ("error" in result) {
        fail(`Expected a comment but got an error: ${result.error}`);
      } else {
        expect(result._id).toBeDefined();
      }
    });

    test("saveComment should return an error if save fails", async () => {
      const errorMessage = "Database error during save";
      mockingoose(Comments).toReturn(new Error(errorMessage), "save");

      const result = await saveComment(_comment);

      if ("error" in result) {
        expect(result.error).toEqual(errorMessage);
      } else {
        fail("Expected an error, but got a successful result.");
      }
    });
  });

  test("addTag return tag id if the tag already exists", async () => {
    mockingoose(Tags).toReturn(_tag1, "findOne");

    const result = await addTag("react");
    if (result) expect(result.toString()).toEqual(_tag1._id?.toString());
    else fail(`Expected a String but got null`);
  });

  test("addTag return tag id of new tag if does not exist in database", async () => {
    mockingoose(Tags).toReturn(null, "findOne");
    const result = await addTag("javascript");
    expect(result).toBeDefined();
  });

  test("addTag returns null if findOne throws an error", async () => {
    mockingoose(Tags).toReturn(new Error("error"), "findOne");
    const result = await addTag("react");
    expect(result).toBeNull();
  });

  test("addTag returns null if save throws an error", async () => {
    mockingoose(Tags).toReturn(null, "findOne");
    mockingoose(Tags).toReturn(new Error("error"), "save");
    const result = await addTag("javascript");
    expect(result).toBeNull();
  });

  test("filter questions with empty search string should return all questions", () => {
    const result = filterQuestionsBySearch(_questions, "");

    expect(result.length).toEqual(_questions.length);
  });

  test("filter questions with undefined list of questions should return empty list", () => {
    const result = filterQuestionsBySearch(undefined, "react");
    expect(result.length).toEqual(0);
  });

  test("filter questions with empty list of questions should return empty list", () => {
    const result = filterQuestionsBySearch([], "react");
    expect(result.length).toEqual(0);
  });

  test("filter questions with empty questions and empty string should return empty list", () => {
    const result = filterQuestionsBySearch([], "");
    expect(result.length).toEqual(0);
  });

  test("filter question by one tag", () => {
    const result = filterQuestionsBySearch(_questions, "[android]");

    expect(result.length).toEqual(1);
    expect(result[0]._id).toEqual("65e9b58910afe6e94fc6e6dc");
  });

  test("filter question by multiple tags", () => {
    const result = filterQuestionsBySearch(_questions, "[android] [react]");

    expect(result.length).toEqual(2);
    expect(result[0]._id).toEqual("65e9b58910afe6e94fc6e6dc");
    expect(result[1]._id).toEqual("65e9b5a995b6c7045a30d823");
  });

  test("filter question by one keyword", () => {
    const result = filterQuestionsBySearch(_questions, "website");

    expect(result.length).toEqual(1);
    expect(result[0]._id).toEqual("65e9b5a995b6c7045a30d823");
  });

  test("filter question by tag and keyword", () => {
    const result = filterQuestionsBySearch(_questions, "website [android]");

    expect(result.length).toEqual(2);
    expect(result[0]._id).toEqual("65e9b58910afe6e94fc6e6dc");
    expect(result[1]._id).toEqual("65e9b5a995b6c7045a30d823");
  });

  test("get active questions, newest questions sorted by most recently answered 1", async () => {
    mockingoose(Questions).toReturn(_questions.slice(0, 3), "find");

    const result = await getQuestionsByOrder("active");

    expect(result.length).toEqual(3);
    expect(result[0]._id?.toString()).toEqual("65e9b5a995b6c7045a30d823");
    expect(result[1]._id?.toString()).toEqual("65e9b58910afe6e94fc6e6dc");
    expect(result[2]._id?.toString()).toEqual("65e9b9b44c052f0a08ecade0");
  });

  test("get active questions, newest questions sorted by most recently answered 2", async () => {
    const questions = [
      {
        _id: "65e9b716ff0e892116b2de01",
        answers: [_ans1, _ans3], // 18, 19 => 19
        ask_date_time: new Date("2023-11-20T09:24:00"),
      },
      {
        _id: "65e9b716ff0e892116b2de02",
        answers: [_ans1, _ans2, _ans3, _ans4], // 18, 20, 19, 19 => 20
        ask_date_time: new Date("2023-11-20T09:24:00"),
      },
      {
        _id: "65e9b716ff0e892116b2de03",
        answers: [_ans2], // 20 => 20
        ask_date_time: new Date("2023-11-20T09:24:00"),
      },
    ];

    mockingoose(Questions).toReturn(questions, "find");

    const result = await getQuestionsByOrder("active");

    expect(result.length).toEqual(3);
    expect(result[0]._id?.toString()).toEqual("65e9b716ff0e892116b2de02");
    expect(result[1]._id?.toString()).toEqual("65e9b716ff0e892116b2de03");
    expect(result[2]._id?.toString()).toEqual("65e9b716ff0e892116b2de01");
  });

  test("get newest questions", async () => {
    const questions = [
      {
        _id: "65e9b716ff0e892116b2de01",
        ask_date_time: new Date("2023-11-21T09:24:00"),
      },
      {
        _id: "65e9b716ff0e892116b2de02",
        ask_date_time: new Date("2023-11-19T09:24:00"),
      },
      {
        _id: "65e9b716ff0e892116b2de03",
        ask_date_time: new Date("2023-11-20T09:24:00"),
      },
    ];

    mockingoose(Questions).toReturn(questions, "find");

    const result = await getQuestionsByOrder("newest");

    expect(result.length).toEqual(3);
    expect(result[0]._id?.toString()).toEqual("65e9b716ff0e892116b2de01");
    expect(result[1]._id?.toString()).toEqual("65e9b716ff0e892116b2de03");
    expect(result[2]._id?.toString()).toEqual("65e9b716ff0e892116b2de02");
  });

  test("get unanswered questions", async () => {
    mockingoose(Questions).toReturn([_questions[2], _questions[3]], "find");

    const result = await getQuestionsByOrder("unanswered");

    expect(result.length).toEqual(2);
    expect(result[1]._id?.toString()).toEqual("65e9b9b44c052f0a08ecade0");
    expect(result[0]._id?.toString()).toEqual("65e9b716ff0e892116b2de09");
  });

  test("fetchAndIncrementQuestionViewsById returns error on database failure", async () => {
    mockingoose(Questions).toReturn(
      new Error("Database error"),
      "findOneAndUpdate"
    );
    const result = await fetchAndIncrementQuestionViewsById(
      "65e9b58910afe6e94fc6e6dc"
    );
    expect(result).toHaveProperty("error", "Database error");
  });

  test("fetchAndIncrementQuestionViewsById throws error when given empty id", async () => {
    mockingoose(Questions).toReturn(new Error("error"), "findOneAndUpdate");
    const result = await fetchAndIncrementQuestionViewsById("");

    expect(result).toEqual({
      error: "Error when fetching and updating a question",
    });
  });

  test("fetchAndIncrementQuestionViewsById returns question object", async () => {
    const question = _questions[0];
    const questionWithUpdatedViews = { ...question, views: question.views + 1 };
    mockingoose(Questions).toReturn(
      questionWithUpdatedViews,
      "findOneAndUpdate"
    );

    const result = await fetchAndIncrementQuestionViewsById(
      "65e9b58910afe6e94fc6e6dc"
    );
    expect((result as IQuestion)._id?.toString()).toEqual(
      "65e9b58910afe6e94fc6e6dc"
    );
    expect((result as IQuestion).views).toEqual(49);
  });

  test("saveQuestion should save question with tag IDs", async () => {
    const currentQuestion: IQuestion = {
      _id: "test",
      title: "How do I use async/await in JavaScript?",
      text: "I need help understanding how to use async/await in JavaScript.",
      tags: [],
      answers: [],
      ask_date_time: new Date("2023-11-20T09:24:00"),
      asked_by: "test",
      views: 0,
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };
    mockingoose(Questions).toReturn(_questions[0], "create");
    const result = await saveQuestion(currentQuestion);

    expect(result).toHaveProperty("_id");
    expect((result as IQuestion)._id).toBeDefined();
  });

  test("saveQuestion should return error if save fails", async () => {
    const currentQuestion: IQuestion = {
      _id: "test",
      title: "How do I use async/await in JavaScript?",
      text: "I need help understanding how to use async/await in JavaScript.",
      tags: [],
      answers: [],
      ask_date_time: new Date("2023-11-20T09:24:00"),
      asked_by: "test",
      views: 0,
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    const errorMessage = "Database error during save";
    mockingoose(Questions).toReturn(new Error(errorMessage), "save");

    const result = await saveQuestion(currentQuestion);

    if ("error" in result) {
      expect(result.error).toEqual(errorMessage);
    } else {
      fail("Expected an error, but got a successful result.");
    }
  });

  test("saveAnswer should save answer", async () => {
    mockingoose(Questions).toReturn(_questions[0], "findOne");
    mockingoose(Questions).toReturn(
      { ..._questions[0], answers: [_questions[0].answers, _ans3] },
      "save"
    );
    const currentAnswer: IAnswer = {
      _id: "test",
      text: "test",
      ans_by: "test",
      ans_date_time: new Date("2023-11-20T09:24:00"),
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };
    const result = await saveAnswer(currentAnswer);

    expect((result as IAnswer)._id).toBeDefined();
  });

  test("getTagIds should return list of tag ids", async () => {
    mockingoose(Tags).toReturn(_tag1, "findOne");
    mockingoose(Tags).toReturn(_tag2, "findOne");

    const result = await getTagIds(["react", "javascript"]);

    expect(result.length).toEqual(2);
  });

  test("getTagCountMap should return tag count map", async () => {
    mockingoose(Tags).toReturn([_tag1, _tag2, _tag3], "find");

    const result = await getTagCountMap();
    if (result && !(result instanceof Map) && "error" in result) {
      fail(`Expected a Map but got an error: ${result.error}`);
    } else if (result instanceof Map) {
      expect(result.get("react")).toBeDefined();
      expect(result.get("javascript")).toBeDefined();
      expect(result.get("android")).toBeDefined();
    } else {
      fail("Expected a Map but got null");
    }
  });

  test("getTagCountMap should return tag count map with the expected number of questions for each tag", async () => {
    mockingoose(Tags).toReturn([_tag1, _tag2, _tag3], "find");
    mockingoose(Questions).toReturn(_questions, "find");
    const result = await getTagCountMap();

    if (result && !(result instanceof Map) && "error" in result) {
      fail(`Expected a Map but got an error: ${result.error}`);
    } else if (result instanceof Map) {
      expect(result.get("react")).toEqual(1);
      expect(result.get("javascript")).toEqual(2);
      expect(result.get("android")).toEqual(1);
    } else {
      fail("Expected a Map but got null");
    }
  });

  test("getTagIds should throw an error if tag fetching or creation fails", async () => {
    const errorMessage = "Error fetching or creating tag IDs";
    mockingoose(Tags).toReturn(new Error(errorMessage), "findOne");

    await expect(getTagIds(["react"])).rejects.toThrow(errorMessage);
  });

  test("addAnswerToQuestion should return error if question is not found", async () => {
    mockingoose(Questions).toReturn(null, "findById");
    const result = await addAnswerToQuestion("invalidQuestionId", _ans1);

    if (result && "error" in result) {
      expect(result.error).toEqual("Question not found");
    } else {
      fail("Expected an error, but got a question instead");
    }
  });

  test("addCommentToQuestion should return error if question is not found", async () => {
    mockingoose(Questions).toReturn(null, "findById");
    const result = await addCommentToQuestion("invalidQuestionId", _comment);

    if (result && "error" in result) {
      expect(result.error).toEqual("Question not found");
    } else {
      fail("Expected an error, but got a question instead");
    }
  });

  test("addCommentToAnswer should return error if answer is not found", async () => {
    mockingoose(Answers).toReturn(null, "findById");
    const result = await addCommentToAnswer("invalidAnswerId", _comment);

    if (result && "error" in result) {
      expect(result.error).toEqual("Answer not found");
    } else {
      fail("Expected an error, but got an answer instead");
    }
  });

  test("should add a upvote to an answer", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");
    mockingoose(Answers).toReturn(
      { ...answer, upvotes_by: ["testuser"], vote_count: 1 },
      "findOneAndUpdate"
    );

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("upvotes_by");
    if (result && "upvotes_by" in result) {
      expect(result.upvotes_by).toContain("testuser");
      expect(result.vote_count).toBe(1);
    }
  });

  test("should add a upvote to an question", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");
    mockingoose(Questions).toReturn(
      { ...question, upvotes_by: ["testuser"], vote_count: 1 },
      "findOneAndUpdate"
    );

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("upvotes_by");
    if (result && "upvotes_by" in result) {
      expect(result.upvotes_by).toContain("testuser");
      expect(result.vote_count).toBe(1);
    }
  });

  test("should throw error if user has already voted in answer", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: ["testuser"],
      downvotes_by: [],
      vote_count: 1,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("User has already voted on this answer");
    }
  });

  test("should throw error if user has already voted in question", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: ["testuser"],
      downvotes_by: [],
      vote_count: 1,
    };

    const user = { _id: "testuser" };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("User has already voted on this question");
    }
  });

  test("should add a downvote to an answer", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");
    mockingoose(Answers).toReturn(
      { ...answer, downvotes_by: ["testuser"], vote_count: -1 },
      "findOneAndUpdate"
    );
    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "down"
    );

    expect(result).toHaveProperty("downvotes_by");
    if (result && "downvotes_by" in result) {
      expect(result.downvotes_by).toContain("testuser");
      expect(result.vote_count).toBe(-1);
    }
  });

  test("should add a downvote to a question", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");
    mockingoose(Questions).toReturn(
      { ...question, downvotes_by: ["testuser"], vote_count: -1 },
      "findOneAndUpdate"
    );

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "down"
    );

    expect(result).toHaveProperty("downvotes_by");
    if (result && "downvotes_by" in result) {
      expect(result.downvotes_by).toContain("testuser");
      expect(result.vote_count).toBe(-1);
    }
  });

  test("should throw error if invalid vote type in answer", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "invalid"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("Invalid vote type");
    }
  });

  test("should throw error if invalid vote type in question", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "invalid"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("Invalid vote type");
    }
  });

  test("should catch the error in addVoteToAnswer", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");
    mockingoose(Answers).toReturn(new Error("error"), "findOneAndUpdate");

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("error");
    }
  });

  test("should catch the error in addVoteToQuestion", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");
    mockingoose(Questions).toReturn(new Error("error"), "findOneAndUpdate");

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("error");
    }
  });

  test("should catch the error in addVoteToAnswer when user is not found", async () => {
    const answer = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    mockingoose(User).toReturn(null, "findOne");
    mockingoose(Answers).toReturn(answer, "findOne");

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("User not found");
    }
  });

  test("should catch the error in addVoteToQuestion when user is not found", async () => {
    const question = {
      _id: "65e9b58910afe6e94fc6e6dc",
      upvotes_by: [],
      downvotes_by: [],
      vote_count: 0,
    };

    mockingoose(User).toReturn(null, "findOne");
    mockingoose(Questions).toReturn(question, "findOne");

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("User not found");
    }
  });

  test("should catch the error in addVoteToAnswer when answer is not found", async () => {
    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");

    mockingoose(Answers).toReturn(null, "findOne");

    const result = await addVoteToAnswer(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("Answer not found");
    }
  });

  test("should catch the error in addVoteToQuestion when question is not found", async () => {
    const user = {
      _id: "testuser",
    };

    mockingoose(User).toReturn(user, "findOne");

    mockingoose(Questions).toReturn(null, "findOne");

    const result = await addVoteToQuestion(
      "65e9b58910afe6e94fc6e6dc",
      "testuser",
      "up"
    );

    expect(result).toHaveProperty("error");
    if (result && "error" in result) {
      expect(result.error).toBe("Question not found");
    }
  });

  test("addAnswerToQuestion should successfully add an answer to the question", async () => {
    mockingoose(Questions).toReturn(_questions[0], "findOne");
    const updatedQuestion = {
      ..._questions[0],
      answers: [..._questions[0].answers, _ans1],
    };
    jest
      .spyOn(Questions.prototype, "save")
      .mockResolvedValueOnce(updatedQuestion);

    const result = await addAnswerToQuestion(
      _questions[0]._id as string,
      _ans1
    );

    const questionResult = result as IQuestion;

    expect(questionResult.answers.length).toBe(
      _questions[0].answers.length + 1
    );
    expect(
      questionResult.answers[questionResult.answers.length - 1].text
    ).toEqual(_ans1.text);

    jest.restoreAllMocks();
  });

  test("addCommentToQuestion should successfully add a comment to the question", async () => {
    mockingoose(Questions).toReturn(_questions[0], "findOne");
    const updatedQuestion = {
      ..._questions[0],
      comments: [..._questions[0].comments, _comment],
    };
    jest
      .spyOn(Questions.prototype, "save")
      .mockResolvedValueOnce(updatedQuestion);

    const result = await addCommentToQuestion(
      _questions[0]._id as string,
      _comment
    );

    const questionResult = result as IQuestion;

    expect(questionResult.comments.length).toBe(
      _questions[0].comments.length + 1
    );
    expect(
      questionResult.comments[questionResult.comments.length - 1].text
    ).toEqual(_comment.text);

    jest.restoreAllMocks();
  });

  test("addCommentToAnswer should successfully add a comment to the answer", async () => {
    mockingoose(Answers).toReturn(_ans1, "findOne");
    const updatedAnswer = {
      ..._ans1,
      comments: [..._ans1.comments, _comment],
    };
    jest.spyOn(Answers.prototype, "save").mockResolvedValueOnce(updatedAnswer);

    const result = await addCommentToAnswer(_ans1._id as string, _comment);

    const answerResult = result as IAnswer;

    expect(answerResult.comments.length).toBe(_ans1.comments.length + 1);
    expect(
      answerResult.comments[answerResult.comments.length - 1].text
    ).toEqual(_comment.text);

    jest.restoreAllMocks();
  });

  test("addAnswerToQuestion should return error if save fails", async () => {
    mockingoose(Questions).toReturn(_questions[0], "findById");
    mockingoose(Questions).toReturn(new Error("Question not found"), "save");
    const result = await addAnswerToQuestion(
      _questions[0]._id as string,
      _ans1
    );

    if (result && "error" in result) {
      expect(result.error).toEqual("Question not found");
    } else {
      fail("Expected an error, but got a question instead");
    }
  });

  test("addCommentToQuestion should return error if save fails", async () => {
    mockingoose(Questions).toReturn(_questions[0], "findById");
    mockingoose(Questions).toReturn(new Error("Question not found"), "save");
    const result = await addCommentToQuestion(
      _questions[0]._id as string,
      _comment
    );

    if (result && "error" in result) {
      expect(result.error).toEqual("Question not found");
    } else {
      fail("Expected an error, but got a question instead");
    }
  });

  test("addCommentToAnswer should return error if save fails", async () => {
    mockingoose(Answers).toReturn(_ans1, "findById");
    mockingoose(Answers).toReturn(new Error("Answer not found"), "save");
    const result = await addCommentToAnswer(_ans1._id as string, _comment);

    if (result && "error" in result) {
      expect(result.error).toEqual("Answer not found");
    } else {
      fail("Expected an error, but got an answer instead");
    }
  });

  test("addAnswerToQuestion should return an error if an exception is thrown", async () => {
    const mockAnswer: IAnswer = {
      _id: "mockAnswerId",
      text: "This is a test answer",
      ans_by: "mockUser",
      ans_date_time: new Date(),
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    jest.spyOn(Questions, "findById").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const result = await addAnswerToQuestion("mockQuestionId", mockAnswer);
    if (result && "error" in result) {
      expect(result.error).toEqual("Database error");
    } else {
      fail("Expected an error, but got a question object instead");
    }

    jest.restoreAllMocks();
  });

  test("addCommentToQuestion should return an error if an exception is thrown", async () => {
    jest.spyOn(Questions, "findById").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const result = await addCommentToQuestion("mockQuestionId", _comment);
    if (result && "error" in result) {
      expect(result.error).toEqual("Database error");
    } else {
      fail("Expected an error, but got a question object instead");
    }

    jest.restoreAllMocks();
  });

  test("addCommentToAnswer should return an error if an exception is thrown", async () => {
    jest.spyOn(Answers, "findById").mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const result = await addCommentToAnswer("mockAnswerId", _comment);
    if (result && "error" in result) {
      expect(result.error).toEqual("Database error");
    } else {
      fail("Expected an error, but got an answer object instead");
    }

    jest.restoreAllMocks();
  });

  test("getTagCountMap should return an error if tag count fetching fails", async () => {
    const errorMessage = "Error fetching tag count map";
    mockingoose(Tags).toReturn(new Error(errorMessage), "find");

    const result = await getTagCountMap();

    if ("error" in result) {
      expect(result.error).toEqual(errorMessage);
    } else {
      fail("Expected an error, but got a tag count map instead");
    }
  });

  test("getTagIds should create and save a new tag if it is not found", async () => {
    const tagName = "newTag";
    const findOneMock = jest.spyOn(Tags, "findOne").mockReturnValueOnce({
      exec: jest.fn().mockResolvedValueOnce(null),
    } as unknown as ReturnType<typeof Tags.findOne>);

    const saveMock = jest
      .spyOn(Tags.prototype, "save")
      .mockImplementationOnce(async function () {
        return { _id: "newTagId", name: tagName } as ITag;
      });

    const result = await getTagIds([tagName]);
    expect(result.length).toBe(1);
    findOneMock.mockRestore();
    saveMock.mockRestore();
  });

  test("saveAnswer should return an error if save fails", async () => {
    const mockAnswer: IAnswer = {
      _id: "invalidId",
      text: "This is a test answer",
      ans_by: "testUser",
      ans_date_time: new Date("2023-11-20T09:24:00"),
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    jest.spyOn(Answers.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Save failed");
    });

    const result = await saveAnswer(mockAnswer);

    if ("error" in result) {
      expect(result.error).toEqual("Save failed");
    } else {
      fail("Expected an error, but got a successful result");
    }

    jest.restoreAllMocks();
  });
});
