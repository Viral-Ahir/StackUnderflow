import React from "react";
import "./UserLoginView.css";
import { useUserLogin } from "../../../hooks/useUserLogin";

/**
 * Props for the UserLoginView component.
 *
 * @typedef {Object} UserLoginViewProps
 * @property {Function} onLogin - Callback function to handle post-login logic, receives username and token as arguments.
 */
interface UserLoginViewProps {
  onLogin: (username: string, token: string) => void;
}

/**
 * UserLoginView Component
 *
 * @component
 * @param {UserLoginViewProps} props - Props passed to the UserLoginView component.
 * @returns {JSX.Element} The rendered UserLoginView component.
 *
 * @description
 * This component provides a form for users to log in to their accounts. It captures the username and password,
 * displays any messages (e.g., errors), and submits the login form using the `useUserLogin` hook. Upon successful login,
 * it invokes the `onLogin` callback with the username and token.
 *
 * @example
 * <UserLoginView
 *   onLogin={(username, token) => {
 *     console.log("Logged in:", username, "Token:", token);
 *   }}
 * />
 */
const UserLoginView: React.FC<UserLoginViewProps> = ({ onLogin }) => {
  /**
   * Get the username, password, message, and handleSubmit function from the useUserLogin hook.
   */
  const {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleSubmit,
  } = useUserLogin(onLogin);

  return (
    <div className="user-login-container">
      <h2>Log In to Your Account</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="user-login-form">
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default UserLoginView;
