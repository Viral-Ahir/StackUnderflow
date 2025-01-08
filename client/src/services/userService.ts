import { api, REACT_APP_API_URL } from "./config";

/**
 * Registers a new user
 * @param username - The user's username
 * @param email - The user's email
 * @param password - The user's password
 * @returns The response containing the token
 */
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<{ token: string }> => {
  const USER_API_URL = `${REACT_APP_API_URL}/auth/register`;

  try {
    const response = await api.post(USER_API_URL, {
      username,
      email,
      password,
    });

    if (response.status !== 201) {
      throw new Error(response.data.message || "Error registering user");
    }

    return response.data;
  } catch (error) {
    console.error("Error during registration: ", error);
    throw error;
  }
};

/**
 * Logs in a user
 * @param username - The user's username
 * @param password - The user's password
 * @returns The response containing the token
 */
export const loginUser = async (
  username: string,
  password: string
): Promise<{ token: string }> => {
  const LOGIN_API_URL = `${REACT_APP_API_URL}/auth/login`;

  try {
    const response = await api.post(LOGIN_API_URL, { username, password });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Error logging in");
    }

    return response.data;
  } catch (error) {
    console.error("Error during login: ", error);
    throw error;
  }
};
