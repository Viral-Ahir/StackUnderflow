import { Request, Response, NextFunction } from "express";
import { logAction } from "../utils/logUtils";

/**
 * @typedef CommentRequestWithSanitizedFields
 * @extends Request
 * @property {string} [sanitizedDescription] - The sanitized description of the comment.
 * @property {string} [sanitizedParentId] - The sanitized ID of the parent entity (question/answer).
 * @property {string} [sanitizedParentType] - The sanitized type of the parent entity (question/answer).
 */
export interface CommentRequestWithSanitizedFields extends Request {
  sanitizedDescription?: string;
  sanitizedParentId?: string;
  sanitizedParentType?: string;
}

/**
 * Sanitize input string to remove unsafe characters.
 *
 * @function sanitizeInput
 * @param {string} input - The input string to sanitize.
 * @returns {string} The sanitized string with `$` and `.` characters removed.
 *
 * @description
 * This function removes any keys starting with `$` or containing `.` to prevent NoSQL injection attacks.
 */
const sanitizeInput = (input: string): string => {
  return input.replace(/[$.]/g, "");
};

/**
 * Middleware to validate and sanitize comment input fields.
 *
 * @function sanitizeCommentInput
 * @param {CommentRequestWithSanitizedFields} req - The request object containing comment data.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} Proceeds to the next middleware or sends a 400 response if validation fails.
 */
export const sanitizeCommentInput = (
  req: CommentRequestWithSanitizedFields,
  res: Response,
  next: NextFunction
) => {
  const { description, parentId, parentType } = req.body;

  if (!description || typeof description !== "string" || !description.trim()) {
    logAction(
      "Comment Validation Failed",
      `Invalid description. Description: ${description}`
    );
    return res.status(400).json({ message: "Description cannot be empty" });
  }
  req.sanitizedDescription = sanitizeInput(description.trim());
  logAction(
    "Sanitization Successful",
    `Sanitized description: ${req.sanitizedDescription}`
  );

  if (!parentId || typeof parentId !== "string" || !parentId.trim()) {
    logAction(
      "Comment Validation Failed",
      `Invalid parentId. ParentId: ${parentId}`
    );
    return res.status(400).json({ message: "Invalid parentId" });
  }
  req.sanitizedParentId = sanitizeInput(parentId.trim());
  logAction(
    "Sanitization Successful",
    `Sanitized parentId: ${req.sanitizedParentId}`
  );

  if (!parentType || typeof parentType !== "string") {
    logAction(
      "Comment Validation Failed",
      `Invalid parentType. ParentType: ${parentType}`
    );
    return res.status(400).json({ message: "Invalid parentType" });
  }
  if (!["question", "answer"].includes(parentType.toLowerCase())) {
    logAction(
      "Comment Validation Failed",
      `Invalid parentType value. ParentType: ${parentType}`
    );
    return res
      .status(400)
      .json({ message: "Parent type must be 'question' or 'answer'" });
  }
  req.sanitizedParentType = sanitizeInput(parentType.trim().toLowerCase());
  logAction(
    "Sanitization Successful",
    `Sanitized parentType: ${req.sanitizedParentType}`
  );

  next();
};
