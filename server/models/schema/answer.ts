import mongoose from "mongoose";

/**
 * The schema for the Answer collection
 * @type {mongoose.Schema}
 * @property {String} text - The answer text
 * @property {String} ans_by - The user who answered the question
 * @property {Date} ans_date_time - The date and time when the answer was posted
 * @property {Array<mongoose.Schema.Types.ObjectId>} comments - The comments on the answer
 * @property {Number} vote_count - The number of votes on the answer
 * @property {Array<mongoose.Schema.Types.ObjectId>} upvotes_by - The users who upvoted the answer
 * @property {Array<mongoose.Schema.Types.ObjectId>} downvotes_by - The users who downvoted the answer
 */
const AnswerSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    ans_by: {
      type: String,
    },
    ans_date_time: {
      type: Date,
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
  { collection: "Answer" }
);

export default AnswerSchema;
