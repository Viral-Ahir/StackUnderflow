import React from "react";
import "./profileView.css";
import { useProfile } from "../../../hooks/useProfile";
import Question from "../questionPage/question/questionView";

/**
 * Props for the ProfileView component.
 *
 * @typedef {Object} ProfileViewProps
 * @property {Function} handleEditProfile - Function to navigate to the edit profile page.
 * @property {Function} clickTag - Function to handle tag clicks.
 * @property {Function} handleAnswer - Function to handle answers for a question.
 */
interface ProfileViewProps {
  handleEditProfile: () => void;
  clickTag: (tagName: string) => void;
  handleAnswer: (id: string) => void;
}

/**
 * ProfileView Component
 *
 * @component
 * @param {ProfileViewProps} props - Props passed to the ProfileView component.
 * @returns {JSX.Element} The rendered ProfileView component.
 *
 * @description
 * This component displays the user's profile details, including their username, bio, and a list of saved questions.
 * It provides options to edit the profile and interact with tags and answers.
 */
const ProfileView: React.FC<ProfileViewProps> = ({
  handleEditProfile,
  clickTag,
  handleAnswer,
}) => {
  /**
   * Get the user's profile details from the useProfile hook.
   */
  const { username, bio, savedQuestions, message } = useProfile();

  return (
    <div className="profile-container">
      <div className="header-section">
        <h2>{username || "Profile"}</h2>
        <button className="edit-profile-button" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
      {message && <p className="message">{message}</p>}
      <div className="profile-details">
        <p>
          <strong>Bio:</strong> {bio || "No bio available"}
        </p>
        <h3>Saved Questions</h3>
        {savedQuestions.length > 0 ? (
          <div id="question_list" className="question_list">
            {savedQuestions.map((q, idx) => (
              <Question
                q={q}
                key={idx}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
              />
            ))}
          </div>
        ) : (
          <p id="no_question_list" className="no_question_list">
            No saved questions
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
