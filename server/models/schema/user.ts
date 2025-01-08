import mongoose from "mongoose";

/**
 * The schema for the User collection
 * @type {mongoose.Schema}
 * @property {String} username - The username of the user
 * @property {String} email - The email of the user
 * @property {String} password - The password of the user
 */
const UserSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { collection: "User" }
);

export default UserSchema;
