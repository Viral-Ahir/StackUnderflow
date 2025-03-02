import React from "react";
import "./editProfileView.css";
import { useEditProfile } from "../../../hooks/useEditProfile";

/**
 * Props for the EditProfileView component.
 *
 * @typedef {Object} EditProfileViewProps
 * @property {Function} handleProfile - Function to navigate back to the profile page after editing.
 */
interface EditProfileViewProps {
  handleProfile: () => void;
}

/**
 * EditProfileView Component
 * @param {EditProfileViewProps} props - Props passed to the EditProfileView component.
 * @returns {JSX.Element} The rendered EditProfileView component.
 *
 * @description
 * This component renders a form for editing the user's profile, including their username and bio.
 * It uses the `useEditProfile` hook to manage state and handle form submission.
 *
 * @example
 * <EditProfileView handleProfile={() => navigateToProfile()} />
 */
const EditProfileView: React.FC<EditProfileViewProps> = ({ handleProfile }) => {
  /**
   * State and functions for editing the user's profile.
   */
  const { newUsername, setNewUsername, bio, setBio, message, handleSubmit } =
    useEditProfile(handleProfile);

  return (
    <div className="">
      <h2 className="h1-bold text-dark100_light900">Edit Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-9 flex w-full flex-col gap-9">
        <div className="space-y-3.5">
          <label
            htmlFor="username"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-dark400_light800"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
            className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
          />
        </div>
        <div className="space-y-3.5">
          <label
            htmlFor="bio"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-dark400_light800"
          >
            Bio
          </label>
          <textarea
            id="bio"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 no-focus paragraph-regular light-border-2 background-light800_dark300 text-dark300_light700 min-h-[56px] border"
          ></textarea>
        </div>
        <div className="mt-7 flex justify-end">
          <button
            type="submit"
            className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 primary-gradient w-fit !text-light-900"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileView;
