import { useEffect, useState } from "react";
import { getQuestionById } from "../services/questionService";
import { QuestionResponseType } from "../types/entityTypes";

/**
 * A hook to fetch a question by its id
 * @param qid the id of the question
 * @returns the question object
 */
export const useAnswerPage = (qid: string) => {
  /**
   * State to hold the question object
   */
  const [question, setQuestion] = useState<QuestionResponseType | null>(null);

  /**
   * Fetch the question by its id
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionById(qid);
        setQuestion(res || null);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchData();
  }, [qid]);

  return { question };
};
