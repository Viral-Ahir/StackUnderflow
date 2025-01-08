import mongoose from "mongoose";

/**
 * The schema for the Profile collection
 * @type {mongoose.Schema}
 * @property {String} username - The username of the user
 * @property {String} bio - The bio of the user
 * @property {Array<mongoose.Schema.Types.ObjectId>} savedQuestions - The questions saved by the user
 */
const ProfileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      default: "",
    },
    savedQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
  },
  { collection: "Profile" }
);

export default ProfileSchema;
