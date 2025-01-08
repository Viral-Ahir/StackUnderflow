import { REACT_APP_API_URL, api } from "./config";
import { AnswerType, AnswerResponseType } from "../types/entityTypes";

/**
 * The answer API URL
 */
const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;

/**
 * Function to add an answer
 * @param qid The question id
 * @param ans The answer object
 * @returns The response from the server
 */
const addAnswer = async (
  qid: string,
  ans: AnswerType
): Promise<AnswerResponseType> => {
  const data = { qid: qid, ans: ans };
  try {
    const res = await api.post(`${ANSWER_API_URL}/addAnswer`, data);
    if (res.status !== 200) {
      throw new Error("Error while creating a new answer");
    }
    return res.data;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error;
  }
};

export { addAnswer };
