import { useEffect, useState } from "react";
import axios from "axios";
import { getQuestionById } from "../services/questionService";
import { QuestionResponseType } from "../types/entityTypes";
import { REACT_APP_API_URL } from "../services/config";

/**
 *  Custom hook to fetch and manage the state of the answer page view.
 * @param {string} qid - The ID of the question.
 * @returns {Object} - An object containing the question, update state, saved state, and functions to save and unsave the question.
 */
export const useAnswerPageView = (qid: string) => {
  /**
   * The question object containing the question details.
   */
  const [question, setQuestion] = useState<QuestionResponseType | null>(null);

  /**
   * The update state of the question.
   */
  const [updateState, setUpdateState] = useState(0);

  /**
   * The saved state of the question.
   */
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    /**
     *  Fetches the question by its ID.
     * @returns {Promise<void>} - Fetches the question by its ID.
     */
    const fetchQuestion = async () => {
      setQuestion((await getQuestionById(qid)) || {});
    };

    /**
     *  Fetches the saved state of the question from the user's profile.
     * @returns {Promise<void>} - Fetches the saved state of the question from the user's profile.
     */
    const fetchSavedState = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${REACT_APP_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { savedQuestions } = response.data;
        setIsSaved(
          savedQuestions.some((q: QuestionResponseType) => q._id === qid)
        );
      } catch (error) {
        console.error("Error fetching saved state:", error);
      }
    };

    fetchQuestion();
    fetchSavedState();
  }, [qid, updateState]);

  /**
   *  Saves the question to the user's profile.
   * @returns {Promise<boolean>} - Returns true if the question was saved successfully, false otherwise.
   */
  const handleSaveQuestion = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to save questions.");
        return false;
      }

      const response = await axios.post(
        `${REACT_APP_API_URL}/profile/save`,
        { question: { _id: qid } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Question saved successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error saving question:", error);
      alert("Failed to save the question. Please try again.");
    }
    return false;
  };

  /**
   *  Unsaves the question from the user's profile.
   * @returns {Promise<boolean>} - Returns true if the question was unsaved successfully, false otherwise.
   */
  const handleUnsaveQuestion = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to unsave questions.");
        return false;
      }

      const response = await axios.post(
        `${REACT_APP_API_URL}/profile/unsave`,
        { question: { _id: qid } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Question unsaved successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error unsaving question:", error);
      alert("Failed to unsave the question. Please try again.");
    }
    return false;
  };

  return {
    question,
    setUpdateState,
    isSaved,
    handleSaveQuestion,
    handleUnsaveQuestion,
  };
};
