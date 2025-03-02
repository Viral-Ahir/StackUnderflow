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
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <img
            src="/Assets/images/profile.jpg"
            alt="Profile Pic"
            className="w-24 h-24 rounded-full"
          />
          <div className="mt-2">
            {message && <p className="message mt-4">{message}</p>}
            <h2 className="h2-bold text-dark100_light900">{username}</h2>
            {bio && (
              <p className="paragraph-regular text-dark400_light800 mt-4">
                Bio: {bio}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <button
            className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
      <div className="profile-details">
        <div className="h2-bold text_light900 mt-10">Saved Questions</div>
        {savedQuestions.length > 0 ? (
          <div id="question_list" className="mt-10 flex flex-col gap-6">
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
          <div id="no_question_list" className="no_question_list">
            <div className="mt-10 flex w-full flex-col items-center justify-center">
              <img
                src="./assets/images/light-illustration.png"
                alt="Not-result-page"
                width={270}
                height={200}
                className="block object-contain dark:hidden"
              />
              <h2 className="h2-bold text-dark200_light900 mt-8">
                There is No Saved question to show
              </h2>
              <p className="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
                Be the first to break the silence! 🚀 Ask a Question and
                kickstart the discussion. our query could be the next big thing
                others learn from. Get involved! 💡
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileView;
