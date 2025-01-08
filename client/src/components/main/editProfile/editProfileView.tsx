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
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileView;
