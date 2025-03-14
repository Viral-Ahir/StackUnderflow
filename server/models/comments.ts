import mongoose from "mongoose";
import { IComment } from "./types/types";
import CommentSchema from "./schema/comment";

/**
 * Create a model for the comments
 */
const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
