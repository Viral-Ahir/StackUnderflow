import { useState } from "react";
import { addQuestion } from "../services/questionService";
import { VoidFunctionType } from "../types/functionTypes";

/**
 * A hook to validate the entries in the new question form
 * @param handleQuestions a function to render the questions
 * including the new one
 */
export const useNewQuestion = (handleQuestions: VoidFunctionType) => {
  /**
   * State to hold the title, text, tags, and username
   */
  const [title, setTitle] = useState<string>("");

  /**
   * State to hold the title, text, tags, and username
   */
  const [text, setText] = useState<string>("");

  /**
   * State to hold the title, text, tags, and username
   */
  const [tag, setTag] = useState<string>("");

  /**
   * State to hold the title, text, tags, and username
   */
  const [usrn, setUsrn] = useState<string>("");

  /**
   * State to hold the error messages for the title, text, tags, and username
   */
  const [titleErr, setTitleErr] = useState<string>("");

  /**
   * State to hold the error messages for the title, text, tags, and username
   */
  const [textErr, setTextErr] = useState<string>("");

  /**
   * State to hold the error messages for the title, text, tags, and username
   */
  const [tagErr, setTagErr] = useState<string>("");

  /**
   * State to hold the error messages for the title, text, tags, and username
   */
  const [usrnErr, setUsrnErr] = useState<string>("");

  /**
   * Function to post the question
   */
  const postQuestion = async () => {
    let isValid = true;

    if (!title) {
      setTitleErr("Title cannot be empty");
      isValid = false;
    } else if (title.length > 100) {
      setTitleErr("Title cannot be more than 100 characters");
      isValid = false;
    }

    if (!text) {
      setTextErr("Question text cannot be empty");
      isValid = false;
    }

    const tags = tag.split(" ").filter((tag) => tag.trim() !== "");
    if (tags.length === 0) {
      setTagErr("Should have at least 1 tag");
      isValid = false;
    } else if (tags.length > 5) {
      setTagErr("Cannot have more than 5 tags");
      isValid = false;
    }

    for (const tag of tags) {
      if (tag.length > 20) {
        setTagErr("New tag length cannot be more than 20");
        isValid = false;
        break;
      }
    }

    const tagObjects = tags.map((tag) => ({ name: tag }));

    if (!usrn) {
      setUsrnErr("Username cannot be empty");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const question = {
      title: title,
      text: text,
      tags: tagObjects,
      asked_by: usrn,
      ask_date_time: new Date(),
    };

    const res = await addQuestion(question);
    if (res && res._id) {
      handleQuestions();
    }
  };

  return {
    title,
    setTitle,
    text,
    setText,
    tag,
    setTag,
    usrn,
    setUsrn,
    titleErr,
    textErr,
    tagErr,
    usrnErr,
    postQuestion,
  };
};
