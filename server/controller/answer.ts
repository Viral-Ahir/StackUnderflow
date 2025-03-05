import express from "express";
import { saveAnswer, addAnswerToQuestion } from "../models/application";
import { IAnswer, AddAnswerRequest } from "../models/types/types";

const router = express.Router();

/**
 * Handler to add an answer to a question
 * @param req  The request object
 * @param res  The response object
 * @returns  The response object.
 */
const addAnswerHandler = async (
  req: AddAnswerRequest,
  res: express.Response
) => {
  const { qid, ans } = req.body;

  if (!qid || typeof qid !== "string") {
    return res.status(400).send("Invalid answer");
  }

  if (!ans || typeof ans !== "object") {
    return res.status(400).send("Invalid answer");
  }

  const { text, ans_by, ans_date_time } = ans;

  if (!text || typeof text !== "string") {
    return res.status(400).send("Invalid answer");
  }

  if (!ans_by || typeof ans_by !== "string") {
    return res.status(400).send("Invalid answer");
  }

  if (!ans_date_time) {
    return res.status(400).send("Invalid answer");
  }

  try {
    const newAnswer: IAnswer = {
      text,
      ans_by,
      ans_date_time,
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    const savedAnswer = await saveAnswer(newAnswer);

    if ("error" in savedAnswer) {
      return res.status(500).send("Error while saving answer to database");
    }

    const updatedQuestion = await addAnswerToQuestion(qid, savedAnswer);

    if (!updatedQuestion || "error" in updatedQuestion) {
      return res.status(500).send("Error while updating question with answer");
    }
    res.status(200).json(savedAnswer);
  } catch (error) {
    console.error("Error while adding answer:", error);
    res.status(500).send("Internal Server Error while adding answer");
  }
};

/**
 * Route to add an answer to a question
 */
router.post("/addAnswer", addAnswerHandler);

export default router;
