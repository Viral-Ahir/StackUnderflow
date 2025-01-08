import { useState } from "react";
import { loginUser } from "../services/userService";
import axios from "axios";

/**
 * A custom hook to handle user login
 * @param onLogin - Callback function to handle post-login logic
 * @returns State and handlers for user login
 */
export const useUserLogin = (
  onLogin: (username: string, token: string) => void
) => {
  /**
   * State variables for the user login form
   */
  const [username, setUsername] = useState<string>("");

  /**
   * State variables for the user login form
   */
  const [password, setPassword] = useState<string>("");

  /**
   * State variables for the user login form
   */
  const [message, setMessage] = useState<string>("");

  /**
   * Handles the form submission to log in the user
   * @param e - The form event
   * @returns A Promise that resolves when the user is logged in
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      setMessage("Login successful!");
      onLogin(username, response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        if (errorMessage === "Incorrect password") {
          setMessage("Incorrect password. Please try again.");
        } else if (errorMessage === "Account does not exist") {
          setMessage("Account does not exist. Please check your username.");
        } else {
          setMessage(errorMessage);
        }
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    message,
    handleSubmit,
  };
};
