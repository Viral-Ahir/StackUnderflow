import "./index.css";
// import "./tailwind.css";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import Modal from "react-modal";
import UserRegistrationView from "../main/userRegistration/UserRegistrationView";
import UserLoginView from "../main/userLogin/UserLoginView";
import { QuestionsPageQueryFuntionType } from "../../types/functionTypes";
import { PageInstanceType } from "../types/pageInstanceType";
import HomePageClass from "../main/routing/home";

/**
 * Interface for common properties shared across the application.
 *
 * @typedef {Object} CommonProps
 * @property {Function} handleProfile - Function to handle profile navigation.
 * @property {Function} handleEditProfile - Function to handle profile editing.
 * @property {string} search - Current search query.
 * @property {string} title - Current page title.
 * @property {Function} setQuestionPage - Function to set the question page, optionally with search and title.
 * @property {string} questionOrder - Current question order (e.g., newest, active).
 * @property {Function} setQuestionOrder - Function to set the question order.
 * @property {string} qid - Current question ID.
 * @property {Function} handleQuestions - Function to handle question-related actions.
 * @property {Function} handleTags - Function to handle tag-related actions.
 * @property {Function} handleAnswer - Function to handle answers for a specific question.
 * @property {Function} clickTag - Function to handle tag clicks.
 * @property {Function} handleNewQuestion - Function to handle the creation of new questions.
 * @property {Function} handleNewAnswer - Function to handle the creation of new answers.
 */
interface CommonProps {
  handleProfile: () => void;
  handleEditProfile: () => void;
  search: string;
  title: string;
  setQuestionPage: (search?: string, title?: string) => void;
  questionOrder: string;
  setQuestionOrder: (order: string) => void;
  qid: string;
  handleQuestions: () => void;
  handleTags: () => void;
  handleAnswer: (qid: string) => void;
  clickTag: (tname: string) => void;
  handleNewQuestion: () => void;
  handleNewAnswer: () => void;
}

/**
 * Interface for the Header component's props.
 *
 * @typedef {Object} HeaderProps
 * @property {string} search - The current search query.
 * @property {QuestionsPageQueryFuntionType} setQuestionPage - Function to set the question page query.
 * @property {Function} setPageInstance - Function to set the current page instance.
 * @property {CommonProps} commonProps - Common properties shared across the application.
 */
interface HeaderProps {
  search: string;
  setQuestionPage: QuestionsPageQueryFuntionType;
  setPageInstance: (pageInstance: PageInstanceType) => void;
  commonProps: CommonProps;
}

Modal.setAppElement("#root");

/**
 * Header component for the application.
 * @param {HeaderProps} props - Props passed to the Header component.
 * @returns {JSX.Element} The rendered Header component.
 * @description
 * The Header component provides navigation and user-related actions, such as login, signup, logout, and search functionality.
 * It displays the app's title and includes modals for user registration and login.
 */
const Header = ({
  search,
  setQuestionPage,
  setPageInstance,
  commonProps,
}: HeaderProps): JSX.Element => {
  /**
   * State variables to manage the visibility of the signup and login modals.
   */
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  /**
   * State variables to manage the visibility of the signup and login modals.
   */
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  /**
   * State variable to manage the search input value.
   */
  const [val, setVal] = useState<string>(search);

  /**
   * Handles changes to the search input.
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  /**
   * Handles the key down event for the search input.
   * Triggers the search when the "Enter" key is pressed.
   * @param {KeyboardEvent<HTMLInputElement>} e - The key down event.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setQuestionPage(e.currentTarget.value, "Search Results");
    }
  };

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  /**
   * Handles user login, storing the token and closing the login modal.
   * @param {string} username - The username of the user.
   * @param {string} token - The authentication token.
   */
  const handleLogin = (username: string, token: string) => {
    localStorage.setItem("token", token);
    closeLoginModal();
  };

  /**
   * Handles user signup, storing the token and closing the signup modal.
   * @param {string} username - The username of the user.
   * @param {string} token - The authentication token.
   */
  const handleSignUp = (username: string, token: string) => {
    localStorage.setItem("token", token);
    closeSignUpModal();
  };

  /**
   * Handles user logout, clearing the token and navigating to the home page.
   */
  const handleLogout = () => {
    localStorage.removeItem("token");
    setPageInstance(new HomePageClass(commonProps)); // Navigate to HomePage
  };

  /**
   * Handles navigation to the user profile page.
   */
  const handleProfile = () => {
    commonProps.handleProfile();
  };

  return (
    <div
      id="header"
      className="flex justify-between items-center p-4 bg-light-900 z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12"
    >
      <div className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
        Stack <span className="text-primary-500">Underflow</span>
      </div>
      <div className="relative w-full max-w-[600px] max-lg:hidden">
        <div className="background-light800 relative flex min-h-[35px] grow items-center gap-1 rounded-xl px-4">
          <img
            src="/assets/icons/search.svg"
            alt="search"
            height={24}
            width={24}
            className="cursor-pointer"
          />
          <input
            id="searchBar"
            placeholder="Search.."
            type="text"
            value={val}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="pl-3 paragraph-regular text-light700 no-focus placeholder border-none bg-transparent shadow-none outline-none"
          />
        </div>
      </div>

      {/* <div className="header-buttons">
        {localStorage.getItem("token") ? (
          <>
            <button
              className="header-button username-button"
              onClick={handleProfile}
            >
              User Profile
            </button>
            <button className="header-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="header-button" onClick={openLoginModal}>
              Login
            </button>
            <button className="header-button" onClick={openSignUpModal}>
              SignUp
            </button>
          </>
        )}
      </div> */}
      <div className="flex gap-2.5">
        {localStorage.getItem("token") ? (
          <>
            <button
              className="px-3 py-1.5 bg-primary-500 text-light-900 rounded-md text-sm cursor-pointer hover:bg-primary-100 hover:shadow-light-200"
              onClick={handleProfile}
            >
              User Profile
            </button>
            <button
              className="px-3 py-1.5 bg-primary-500 text-light-900 rounded-md text-sm cursor-pointer hover:bg-primary-100 hover:shadow-light-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="px-3 py-1.5 bg-primary-500 text-light-900 rounded-md text-sm cursor-pointer hover:bg-primary-100 hover:shadow-light-200"
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              className="px-3 py-1.5 bg-primary-500 text-light-900 rounded-md text-sm cursor-pointer hover:bg-primary-100 hover:shadow-light-200"
              onClick={openSignUpModal}
            >
              SignUp
            </button>
          </>
        )}
      </div>

      <Modal
        isOpen={isSignUpModalOpen}
        onRequestClose={closeSignUpModal}
        contentLabel="User Registration"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeSignUpModal} className="close-button">
          X
        </button>
        <UserRegistrationView onSignUp={handleSignUp} />
      </Modal>
      <Modal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        contentLabel="User Login"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <button onClick={closeLoginModal} className="close-button">
          X
        </button>
        <UserLoginView onLogin={handleLogin} />
      </Modal>
    </div>
  );
};

export default Header;
