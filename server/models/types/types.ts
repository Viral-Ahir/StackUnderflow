import { Request, Response } from "express";

/**
 * @typedef ITag - Interface for Tag
 * @property {string} name.required - Name of the tag
 * @property {string} _id - Unique identifier of the tag
 */
export interface ITag {
  _id?: string;
  name: string;
}

/**
 * @typedef IComment - Interface for Comment
 * @property {string} text.required - Text of the comment
 * @property {IUser} commented_by.required - The user who made the comment
 * @property {Date} post_date_time.required - The date and time of the comment
 * @property {string} _id - Unique identifier of the comment
 */
export interface IComment {
  _id?: string;
  text: string;
  commented_by: IUser;
  post_date_time: Date;
}

/**
 * @typedef IAnswer - Interface for Answer
 * @property {string} text.required - Text of the answer
 * @property {string} ans_by.required - The username of the person who answered
 * @property {Date} ans_date_time.required - The date and time of the answer
 * @property {string} _id - Unique identifier of the answer
 * @property {IComment[]} comments - Comments on the answer
 * @property {number} vote_count - Number of votes on the answer
 * @property {IUser[]} upvotes_by - Users who upvoted the answer
 * @property {IUser[]} downvotes_by - Users who downvoted the answer
 */
export interface IAnswer {
  _id?: string;
  text: string;
  ans_by: string;
  ans_date_time: Date;
  comments: IComment[];
  vote_count: number;
  upvotes_by: IUser[];
  downvotes_by: IUser[];
}

/**
 * @typedef IQuestion - Interface for Question
 * @property {string} title.required - Title of the question
 * @property {string} text.required - Text of the question
 * @property {ITag[]} tags.required - Tags associated with the question
 * @property {IAnswer[]} answers - Answers to the question
 * @property {string} asked_by - Username of the person who asked the question
 * @property {Date} ask_date_time.required - The date and time the question was asked
 * @property {number} views - Number of views for the question
 * @property {string} _id - Unique identifier of the question
 * @property {IComment[]} comments - Comments on the question
 * @property {number} vote_count - Number of votes on the question
 * @property {IUser[]} upvotes_by - Users who upvoted the question
 * @property {IUser[]} downvotes_by - Users who downvoted the question
 */
export interface IQuestion {
  _id?: string;
  title: string;
  text: string;
  tags: ITag[];
  answers: IAnswer[];
  asked_by?: string;
  ask_date_time: Date;
  views: number;
  comments: IComment[];
  vote_count: number;
  upvotes_by: IUser[];
  downvotes_by: IUser[];
}

/**
 * @typedef IProfile - Interface for Profile
 * @property {string} username.required - Username associated with the profile
 * @property {string} bio - Bio of the user
 * @property {string[]} savedQuestions - Array of IDs for saved questions
 */
export interface IProfile {
  _id?: string;
  username: string;
  bio: string;
  savedQuestions: IQuestion[];
}

/**
 * @typedef IUser - Interface for User
 * @property {string} username.required - Username of the user
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Hashed password of the user
 * @property {string} _id - Unique identifier of the user
 */
export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
}

/**
 * @typedef RegisterUserRequest - HTTP Request for user registration
 * @property {string} username.required - Username of the user
 * @property {string} email.required - Email of the user
 * @property {string} password.required - Password of the user
 */
export interface RegisterUserRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
  };
}

/**
 * @typedef ProfileRequest - HTTP Request for updating a profile
 * @property {string} userId.required - ID of the user making the request
 * @property {string} currentUsername.required - Current username of the user
 * @property {string} newUsername.required - New username of the user
 * @property {string} bio - Updated bio for the profile
 */
export interface ProfileRequest extends Request {
  body: {
    userId: string;
    currentUsername: string;
    newUsername: string;
    bio: string;
  };
}

/**
 * @typedef CommentRequest - HTTP Request for adding a comment
 * @extends ProfileRequest
 * @property {string} description.required - Content of the comment
 * @property {string} parentId.required - ID of the parent entity (question/answer)
 * @property {string} parentType.required - Type of parent entity (question/answer)
 */
export interface CommentRequest extends ProfileRequest {
  body: {
    userId: string;
    description: string;
    parentId: string;
    parentType: string;
    currentUsername: string;
    newUsername: string;
    bio: string;
  };
}

/**
 * @typedef SaveQuestionRequest - HTTP Request to save a question
 * @extends ProfileRequest
 * @property {IQuestion} question.required - The question to save
 * @property {string} userId.required - ID of the user saving the question
 * @property {string} currentUsername.required - Current username of the user
 * @property {string} newUsername.required - New username of the user
 * @property {string} bio - Updated bio for the profile
 */
export interface SaveQuestionRequest extends ProfileRequest {
  body: {
    userId: string;
    question: IQuestion;
    currentUsername: string;
    newUsername: string;
    bio: string;
  };
}

/**
 * @typedef AddAnswerRequest - HTTP Request for adding an answer
 * @property {string} qid.required - ID of the question being answered
 * @property {IAnswer} ans.required - The answer being added
 * @property {string} userId.required - ID of the user adding the answer
 */
export interface AddAnswerRequest extends Request {
  body: {
    qid: string;
    ans: IAnswer;
  };
}

/**
 * @typedef AddAnswerResponse - HTTP Response for adding an answer
 * @property {string} ans_by.required - Username of the user who added the answer
 * @property {string} ans_date_time.required - Date and time the answer was added
 * @property {string} text.required - Text of the answer
 * @property {string} _id - Unique identifier of the answer
 */
export interface AddAnswerResponse extends Response {
  ans_by: string;
  ans_date_time: string;
  text: string;
  _id: string;
}

/**
 * @typedef GetQuestionsByFilterRequest - HTTP Request for filtering questions
 * @property {string} order - Order in which questions are sorted
 * @property {string} search - Search query for filtering questions
 */
export interface GetQuestionsByFilterRequest extends Request {
  query: {
    order?: string;
    search?: string;
  };
}

/**
 * @typedef GetQuestionByIdRequest - HTTP Request for fetching a question by ID
 * @property {string} qid.required - ID of the question to fetch
 */
export interface GetQuestionByIdRequest extends Request {
  params: {
    qid: string;
  };
}

/**
 * @typedef AddQuestionRequest - HTTP Request for adding a new question
 * @property {IQuestion} body.required - Question to add
 */
export interface AddQuestionRequest extends Request {
  body: IQuestion;
}

/**
 * @typedef QuestionAPIResponse - HTTP Response for adding a new question
 * @property {string} _id.required - Unique identifier of the question
 * @property {string} title.required - Title of the question
 * @property {string} text.required - Text of the question
 * @property {ITag[]} tags.required - Tags associated with the question
 * @property {IAnswer[]} answers - Answers to the question
 * @property {string} asked_by - Username of the person who asked the question
 * @property {string} ask_date_time.required - Date and time the question was asked
 * @property {number} views - Number of views the question has
 */
export interface QuestionAPIResponse extends Response {
  _id: string;
  title: string;
  text: string;
  tags: ITag[];
  answers: IAnswer[];
  asked_by: string;
  ask_date_time: string;
  views: number;
}
