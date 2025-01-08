import { useState } from "react";
import { addAnswer } from "../services/answerService";
import { QuestionIdFunctionType } from "../types/functionTypes";

/**
 * A hook to validate the entries in the new answer form
 * @param qid the id of the question
 * @param handleAnswer a function to render the answers
 */
export const useNewAnswer = (
  qid: string,
  handleAnswer: QuestionIdFunctionType
) => {
  /**
   * State to hold the username and the answer text
   */
  const [usrn, setUsrn] = useState<string>("");

  /**
   * State to hold the username and the answer text
   */
  const [text, setText] = useState<string>("");

  /**
   * State to hold the error messages for the username and the answer text
   */
  const [usrnErr, setUsrnErr] = useState<string>("");

  /**
   * State to hold the error messages for the username and the answer text
   */
  const [textErr, setTextErr] = useState<string>("");

  /**
   * Function to post the answer
   */
  const postAnswer = async () => {
    let isValid = true;

    if (!usrn) {
      setUsrnErr("Username cannot be empty");
      isValid = false;
    }

    if (!text) {
      setTextErr("Answer text cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const answer = {
      _id: "",
      text: text,
      ans_by: usrn,
      ans_date_time: new Date(),
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    const res = await addAnswer(qid, answer);
    if (res && res._id) {
      handleAnswer(qid);
    }
  };

  return {
    usrn,
    setUsrn,
    text,
    setText,
    usrnErr,
    textErr,
    postAnswer,
  };
};
