import { Request, Response, NextFunction } from "express";
import { IQuestion } from "../models/types/types";
import { logAction } from "../utils/logUtils";

/**
 * @typedef SaveRequestWithSanitizedId
 * @extends Request
 * @property {string} [sanitizedUserId] - The sanitized user ID.
 * @property {IQuestion} [sanitizedQuestion] - The sanitized question object.
 */
export interface SaveRequestWithSanitizedId extends Request {
  sanitizedUserId?: string;
  sanitizedQuestion?: IQuestion;
}

/**
 * Middleware to validate and sanitize userId and question inputs.
 */
export const validateSaveQuestionInputs = (
  req: SaveRequestWithSanitizedId,
  res: Response,
  next: NextFunction
) => {
  const { userId, question } = req.body;
  if (!userId || !question) {
    logAction(
      "Validation Failed",
      `Invalid or missing userId. UserId: ${userId}`
    );
    return res.status(401).json({ message: "Invalid request" });
  }
  req.sanitizedUserId = userId.trim();
  req.sanitizedQuestion = question;

  next();
};
