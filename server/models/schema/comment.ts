import mongoose from "mongoose";

/**
 * The schema for the Comment collection
 * @type {mongoose.Schema}
 * @property {String} text - The text of the comment
 * @property {mongoose.Schema.Types.ObjectId} commented_by - The user who commented
 * @property {Date} post_date_time - The date and time when the comment was posted
 */
const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    commented_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post_date_time: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  { collection: "Comment" }
);

export default CommentSchema;
