import React from "react";
import "./UserRegistrationView.css";
import { useUserRegistration } from "../../../hooks/useUserRegistration";

/**
 * Props for the UserRegistrationView component.
 *
 * @typedef {Object} UserRegistrationViewProps
 * @property {Function} onSignUp - Callback function to handle post-registration logic, receives username and token as arguments.
 */
interface UserRegistrationViewProps {
  onSignUp: (username: string, token: string) => void;
}

/**
 * UserRegistrationView Component
 *
 * @component
 * @param {UserRegistrationViewProps} props - Props passed to the UserRegistrationView component.
 * @returns {JSX.Element} The rendered UserRegistrationView component.
 *
 * @description
 * This component provides a form for users to register a new account. It captures the username, email, and password,
 * displays any messages (e.g., errors), and submits the registration form using the `useUserRegistration` hook.
 * Upon successful registration, it invokes the `onSignUp` callback with the username and token.
 */
const UserRegistrationView: React.FC<UserRegistrationViewProps> = ({
  onSignUp,
}) => {
  /**
   * Get the username, email, password, message, and handleSubmit function from the useUserRegistration hook.
   */
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleSubmit,
  } = useUserRegistration(onSignUp);

  return (
    <div className="user-registration-container">
      <h2>Create Your Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="user-registration-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationView;
