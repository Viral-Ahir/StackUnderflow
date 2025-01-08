import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";
import { QuestionResponseType } from "../types/entityTypes";

/**
 * A custom hook to manage the user's profile state and data fetching.
 * @returns The profile details and error message (if any).
 */
export const useProfile = () => {
  /**
   * State variables for the user's profile
   */
  const [username, setUsername] = useState<string>("");

  /**
   * State variables for the user's profile
   */
  const [bio, setBio] = useState<string | null>(null);

  /**
   *  State variables for the user's profile
   */
  const [savedQuestions, setSavedQuestions] = useState<QuestionResponseType[]>(
    []
  );

  /**
   * State variables for the user's profile
   */
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = await getProfile();
        setUsername(profile.username);
        setBio(profile.bio);
        setSavedQuestions(profile.savedQuestions || []);
      } catch (error) {
        setMessage("Error fetching profile data");
      }
    };

    fetchProfileData();
  }, []);

  return { username, bio, savedQuestions, message };
};
