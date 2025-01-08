import mongoose from "mongoose";
import { IUser } from "./types/types";
import UserSchema from "./schema/user";

/**
 * @typedef IUser
 * @property {string} username.required - The username of the user.
 * @property {string} email.required - The email address of the user.
 * @property {string} password.required - The hashed password of the user.
 * @property {string} _id - The unique identifier for the user.
 */

/**
 * Create a User model
 */
const User = mongoose.model<IUser>("User", UserSchema);

export default User;
