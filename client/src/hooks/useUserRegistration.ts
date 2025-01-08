import { useState } from "react";
import { registerUser } from "../services/userService";
import axios from "axios";

/**
 * A custom hook to handle user registration
 * @param onSignUp - Callback function to handle post-registration logic
 * @returns State and handlers for user registration
 */
export const useUserRegistration = (
  onSignUp: (username: string, token: string) => void
) => {
  /**
   * username - State variables for the user registration form
   */
  const [username, setUsername] = useState<string>("");

  /**
   * email - State variables for the user registration form
   */
  const [email, setEmail] = useState<string>("");

  /**
   * password - State variables for the user registration form
   */
  const [password, setPassword] = useState<string>("");

  /**
   * message - State variables for the user registration form
   */
  const [message, setMessage] = useState<string>("");

  /**
   * Handles the form submission to register the user
   * @param e - The form event
   * @returns A Promise that resolves when the user is registered
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await registerUser(username, email, password);
      setMessage("Registration successful!");
      onSignUp(username, response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setMessage(errorMessage || "An error occurred during registration.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    message,
    handleSubmit,
  };
};
