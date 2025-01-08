import mongoose from "mongoose";
import { IProfile } from "./types/types";
import ProfileSchema from "./schema/profile";

/**
 * Create a Profile model
 */
const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);

export default Profile;
