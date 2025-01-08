import mongoose from "mongoose";

/**
 * The schema for the Question collection
 * @type {mongoose.Schema}
 * @property {String} title - The title of the question
 * @property {String} text - The text of the question
 * @property {String} asked_by - The user who asked the question
 * @property {Date} ask_date_time - The date and time when the question was asked
 * @property {Number} views - The number of views the question has
 * @property {Array<mongoose.Schema.Types.ObjectId>} answers - The answers to the question
 * @property {Array<mongoose.Schema.Types.ObjectId>} tags - The tags associated with the question
 * @property {Array<mongoose.Schema.Types.ObjectId>} comments - The comments on the question
 * @property {Number} vote_count - The number of votes the question has
 * @property {Array<mongoose.Schema.Types.ObjectId>} upvotes_by - The users who upvoted the question
 * @property {Array<mongoose.Schema.Types.ObjectId>} downvotes_by - The users who downvoted the question
 */
const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
    asked_by: {
      type: String,
    },
    ask_date_time: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    answers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Answer",
    },
    tags: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tag",
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Comment",
    },
    vote_count: {
      type: Number,
      default: 0,
    },
    upvotes_by: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
    downvotes_by: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  },
  { collection: "Question" }
);

export default QuestionSchema;
