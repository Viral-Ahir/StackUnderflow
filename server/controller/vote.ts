import express from "express";
import { Response } from "express";
import { authenticateToken } from "../utils/tokenUtils";
import { addVoteToQuestion, addVoteToAnswer } from "../models/application";
import {
  validateVoteInputsMiddleware,
  RequestWithSanitizedVoteInputs,
} from "../sanitizers/voteSanitizer";
import { logAction } from "../utils/logUtils";

const router = express.Router();

/**
 * POST /vote
 * Handles adding a vote to a question or an answer.
 *
 * @name AddVote
 * @function
 * @memberof Router
 * @param {RequestWithSanitizedVoteInputs} req - The request object containing sanitized vote inputs.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with the updated entity or an error message.
 */
const addVoteHandler = async (
  req: RequestWithSanitizedVoteInputs,
  res: Response
) => {
  const sanitizedVoteType = req.sanitizedVoteType!;
  const sanitizedParentId = req.sanitizedParentId!;
  const sanitizedParentType = req.sanitizedParentType!;
  const sanitizedUserId = req.sanitizedUserId!;

  try {
    if (sanitizedParentType === "question") {
      const updatedQuestion = await addVoteToQuestion(
        sanitizedParentId,
        sanitizedUserId,
        sanitizedVoteType
      );

      if (!updatedQuestion) {
        logAction(
          "Vote Error",
          `Failed to update question vote. UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
        );
        return res.status(500).send("Error while updating question with vote.");
      }

      if (
        "error" in updatedQuestion &&
        updatedQuestion.error === "You have already voted on this question"
      ) {
        logAction(
          "Duplicate Vote Attempt",
          `UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
        );
        return res.status(403).json(updatedQuestion);
      }

      logAction(
        "Vote Success",
        `Question vote added. UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
      );
      return res.status(200).json(updatedQuestion);
    }

    if (sanitizedParentType === "answer") {
      const updatedAnswer = await addVoteToAnswer(
        sanitizedParentId,
        sanitizedUserId,
        sanitizedVoteType
      );

      if (!updatedAnswer) {
        logAction(
          "Vote Error",
          `Failed to update answer vote. UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
        );
        return res.status(500).send("Error while updating answer with vote.");
      }

      if (
        "error" in updatedAnswer &&
        updatedAnswer.error === "You have already voted on this answer"
      ) {
        logAction(
          "Duplicate Vote Attempt",
          `UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
        );
        return res.status(403).json(updatedAnswer);
      }

      logAction(
        "Vote Success",
        `Answer vote added. UserID: ${sanitizedUserId}, ParentID: ${sanitizedParentId}, VoteType: ${sanitizedVoteType}`
      );
      return res.status(200).json(updatedAnswer);
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    logAction("Vote Error", `Error: ${errorMessage}`);
    res.status(500).send(errorMessage);
  }
};

router.post(
  "/",
  authenticateToken,
  validateVoteInputsMiddleware(),
  addVoteHandler
);

export default router;
