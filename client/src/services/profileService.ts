import { QuestionResponseType } from "../types/entityTypes";
import { api, REACT_APP_API_URL } from "./config";

/**
 * @typedef {Object} ProfileResponseType
 * @property {string} username - The username of the user.
 * @property {string | null} bio - The bio of the user (nullable).
 * @property {QuestionResponseType[]} [savedQuestions] - An optional list of questions saved by the user.
 */
interface ProfileResponseType {
  username: string;
  bio: string | null;
  savedQuestions?: QuestionResponseType[];
}

/**
 * @typedef {Object} UpdateProfileRequest
 * @property {string} currentUsername - The current username of the user.
 * @property {string} newUsername - The new username to update.
 * @property {string | null} bio - The bio of the user to update (nullable).
 */
interface UpdateProfileRequest {
  currentUsername: string;
  newUsername: string;
  bio: string | null;
}

/**
 * Fetches the user's profile data from the server.
 *
 * @function getProfile
 * @returns {Promise<ProfileResponseType>} The user's profile details.
 *
 * @throws Will throw an error if the request fails.
 */
export const getProfile = async (): Promise<ProfileResponseType> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`${REACT_APP_API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch profile data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

/**
 * Updates the user's profile data on the server.
 * @function updateProfile
 * @param {UpdateProfileRequest} profile - The profile data to update.
 * @returns {Promise<void>} Resolves if the profile update is successful.
 *
 * @throws Will throw an error if the update request fails.
 */
export const updateProfile = async (
  profile: UpdateProfileRequest
): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.put(
      `${REACT_APP_API_URL}/profile/edit`,
      profile,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
