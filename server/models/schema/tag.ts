import mongoose from "mongoose";

/**
 * The schema for the Tag collection
 * @type {mongoose.Schema}
 * @property {String} name - The name of the tag
 */
const TagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },
  { collection: "Tag" }
);

export default TagSchema;
