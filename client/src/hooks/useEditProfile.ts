import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../services/profileService";
import axios from "axios";

/**
 * A custom hook to manage the Edit Profile state and functionality
 * @param handleProfile - Function to navigate back to the profile page
 * @returns The state and functions needed for the Edit Profile view
 */
export const useEditProfile = (handleProfile: () => void) => {
  /**
   * State variables for the Edit Profile view
   */
  const [currentUsername, setCurrentUsername] = useState<string>("");

  /**
   * State variables for the Edit Profile view
   */
  const [newUsername, setNewUsername] = useState<string>("");

  /**
   * State variables for the Edit Profile view
   */
  const [bio, setBio] = useState<string | null>(null);

  /**
   * State variables for the Edit Profile view
   */
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profile = await getProfile();
        setCurrentUsername(profile.username);
        setNewUsername(profile.username);
        setBio(profile.bio);
      } catch (error) {
        setMessage("Please Log in to edit your profile.");
      }
    };

    fetchProfileData();
  }, []);

  /**
   * Handles the form submission to update the user's profile
   * @param e - The form event
   * @returns A Promise that resolves when the profile is updated
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      setMessage("Username cannot be empty.");
      return;
    }

    try {
      await updateProfile({
        currentUsername,
        newUsername,
        bio,
      });
      setMessage("Profile updated successfully.");
      handleProfile();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        setMessage(errorMessage || "Error updating profile.");
      } else {
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return {
    newUsername,
    setNewUsername,
    bio,
    setBio,
    message,
    handleSubmit,
  };
};
