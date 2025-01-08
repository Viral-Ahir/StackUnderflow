import express from "express";
import { Response } from "express";
import { authenticateToken } from "../utils/tokenUtils";
import { IComment } from "../models/types/types";
import {
  saveComment,
  addCommentToQuestion,
  addCommentToAnswer,
} from "../models/application";
import {
  sanitizeCommentInput,
  CommentRequestWithSanitizedFields,
} from "../sanitizers/commentSanitizer";
import { logAction } from "../utils/logUtils";

const router = express.Router();

/**
 * Handles the logic for adding a comment to a question or an answer.
 *
 * @async
 * @function addCommentHandler
 * @param {CommentRequestWithSanitizedFields} req - The request object with sanitized fields.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Sends an appropriate response indicating success or failure.
 * @throws {Error} Responds with an error message for any issues during comment addition.
 */
const addCommentHandler = async (
  req: CommentRequestWithSanitizedFields,
  res: Response
) => {
  const { sanitizedDescription, sanitizedParentId, sanitizedParentType } = req;

  try {
    const userId = req.body.userId;
    const newComment: IComment = {
      text: sanitizedDescription!,
      commented_by: userId,
      post_date_time: new Date(),
    };

    const savedComment = await saveComment(newComment);
    if ("error" in savedComment) {
      logAction(
        "Comment Save Failed",
        `User: ${userId}, Comment: "${sanitizedDescription}", Reason: Database save error`
      );
      return res.status(500).send("Error while saving comment to database");
    }

    if (sanitizedParentType === "question") {
      const updatedQuestion = await addCommentToQuestion(
        sanitizedParentId!,
        savedComment
      );

      if (!updatedQuestion || "error" in updatedQuestion) {
        logAction(
          "Comment Attach Failed",
          `User: ${userId}, Comment ID: ${savedComment._id}, Target: Question, Reason: Update error`
        );
        return res
          .status(500)
          .send("Error while updating question with comment");
      }
    } else if (sanitizedParentType === "answer") {
      const updatedAnswer = await addCommentToAnswer(
        sanitizedParentId!,
        savedComment
      );

      if (!updatedAnswer || "error" in updatedAnswer) {
        logAction(
          "Comment Attach Failed",
          `User: ${userId}, Comment ID: ${savedComment._id}, Target: Answer, Reason: Update error`
        );
        return res.status(500).send("Error while updating answer with comment");
      }
    }

    logAction(
      "Comment Added",
      `User: ${userId}, Comment ID: ${savedComment._id}, Parent Type: ${sanitizedParentType}, Parent ID: ${sanitizedParentId}`
    );
    res.status(200).json(savedComment);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    console.error("Error while adding comment:", errorMessage);

    logAction(
      "Comment Add Error",
      `User: ${req.body.userId}, Error: ${errorMessage}`
    );

    res.status(500).send("Internal Server Error while adding comment");
  }
};

/**
 * POST /
 * Adds a comment to a question or an answer.
 *
 * @name AddComment
 * @function
 * @memberof Router
 * @param {CommentRequestWithSanitizedFields} req - The request object with sanitized comment fields.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with the saved comment or an error message.
 * @throws {Error} Responds with appropriate error messages for failed operations or server issues.
 */
router.post("/", authenticateToken, sanitizeCommentInput, addCommentHandler);

export default router;
