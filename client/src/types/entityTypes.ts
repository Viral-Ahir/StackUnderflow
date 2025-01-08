/**
 * Type definitions for entities
 */

/**
 * Type definition for Answer entity
 * @property {string} text - answer text
 * @property {string} ans_by - answered by
 * @property {Date} ans_date_time - answered date time
 * @property {number} vote_count - answer vote count
 * @property {UserType[]} upvotes_by - users who upvoted the answer
 * @property {UserType[]} downvotes_by - users who downvoted the answer
 * @property {CommentType[]} comments - answer comments
 */
interface AnswerType {
  _id: string;
  comments: CommentType[];
  text: string;
  ans_by: string;
  ans_date_time: Date;
  vote_count: number;
  upvotes_by: UserType[];
  downvotes_by: UserType[];
}

/**
 * Type definition for User entity
 * @property {string} username - username
 * @property {string} email - email
 * @property {string} password - password
 */
interface UserType {
  username: string;
  email: string;
  password: string;
}

/**
 * Type definition for Comment entity
 * @property {string} text - comment text
 * @property {string} commented_by - commented by
 * @property {Date} post_date_time - commented date time
 */
interface CommentType {
  text: string;
  commented_by: UserType;
  post_date_time: Date;
}

/**
 * Type definition for Answer response entity
 * @property {string} ans_by - answered by
 * @property {string} ans_date_time - answered date time
 * @property {string} text - answer text
 * @property {string} _id - answer id
 */
interface AnswerResponseType {
  ans_by: string;
  ans_date_time: string;
  text: string;
  _id: string;
}

/**
 * Type definition for Question entity
 * @property {AnswerType[]} answers - answers for the question
 * @property {string} title - question title
 * @property {number} views - question views
 * @property {string} text - question text
 * @property {string} asked_by - question asked by
 * @property {string} ask_date_time - question asked date time
 */
interface QuestionType {
  title: string;
  text: string;
  tags: Tag[];
  asked_by: string;
  ask_date_time: Date;
}

/**
 * Type definition for Question response entity
 * @property {string} _id - question id
 * @property {AnswerResponseType[]} answers - answers for the question
 * @property {number} views - question views
 * @property {string} title - question title
 * @property {Tag[]} tags - question tags
 * @property {string} asked_by - question asked by
 * @property {string} ask_date_time - question asked date time
 * @property {string} text - question text
 * @property {CommentType[]} comments - question comments
 * @property {number} vote_count - question vote count
 * @property {string[]} upvotes_by - users who upvoted the question
 * @property {string[]} downvotes_by - users who downvoted the question
 */
interface QuestionResponseType {
  _id: string;
  answers: AnswerType[];
  views: number;
  title: string;
  tags: { name: string }[];
  asked_by: string;
  ask_date_time: string;
  text: string;
  comments: CommentType[];
  vote_count: number;
  upvotes_by: string[];
  downvotes_by: string[];
}

/**
 * Type definition for Question entity
 * @property {AnswerType[]} answers - answers for the question
 * @property {string} title - question title
 * @property {number} views - question views
 * @property {string} text - question text
 * @property {string} asked_by - question asked by
 * @property {string} ask_date_time - question asked date time
 */
interface Question {
  answers: {
    text: string;
    ans_by: string;
    ans_date_time: string;
  }[];
  title: string;
  views: number;
  text: string;
  asked_by: string;
  ask_date_time: string;
}

/**
 * Type definition for Tag entity
 * @property {string} name - tag name
 */
interface Tag {
  name: string;
}

/**
 * Type definition for Tag response entity
 * @property {string} name - tag name
 * @property {string} _id - tag id
 * @property {number} qcnt - question count
 */
interface TagResponseType {
  name: string;
  _id: string;
  qcnt: number;
}

export type {
  AnswerType,
  UserType,
  QuestionType,
  Question,
  Tag,
  AnswerResponseType,
  QuestionResponseType,
  TagResponseType,
  CommentType,
};
