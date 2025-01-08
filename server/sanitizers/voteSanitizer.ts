import { Request, Response, NextFunction } from "express";
import { logAction } from "../utils/logUtils";

/**
 * @typedef RequestWithSanitizedVoteInputs
 * @extends Request
 * @property {string} [sanitizedVoteType] - The sanitized vote type.
 * @property {string} [sanitizedParentId] - The sanitized parent ID.
 * @property {string} [sanitizedParentType] - The sanitized parent type.
 * @property {string} [sanitizedUserId] - The sanitized user ID.
 */
export interface RequestWithSanitizedVoteInputs extends Request {
  sanitizedVoteType?: string;
  sanitizedParentId?: string;
  sanitizedParentType?: string;
  sanitizedUserId?: string;
}

/**
 * Middleware to validate and sanitize vote inputs.
 *
 * @function validateVoteInputsMiddleware
 * @returns {Function} Middleware function for validation and sanitization.
 */
export const validateVoteInputsMiddleware = () => {
  return (
    req: RequestWithSanitizedVoteInputs,
    res: Response,
    next: NextFunction
  ) => {
    const { vote_type, parent_id, parent_type, userId } = req.body;

    if (!vote_type || typeof vote_type !== "string") {
      logAction(
        "Validation Failed",
        `Invalid vote_type provided. Received: ${vote_type}`
      );
      return res.status(500).send("Invalid vote type provided.");
    }
    req.sanitizedVoteType = vote_type.trim();

    if (!parent_id || typeof parent_id !== "string" || !parent_id.trim()) {
      logAction(
        "Validation Failed",
        `Invalid parent_id provided. Received: ${parent_id}`
      );
      return res.status(500).send("Invalid parent ID provided.");
    }
    req.sanitizedParentId = parent_id.trim();

    const allowedParentTypes = ["question", "answer"];
    if (
      !parent_type ||
      typeof parent_type !== "string" ||
      !allowedParentTypes.includes(parent_type.trim())
    ) {
      logAction(
        "Validation Failed",
        `Invalid parent_type provided. Received: ${parent_type}`
      );
      return res.status(500).send("Invalid parent type provided.");
    }
    req.sanitizedParentType = parent_type.trim();

    if (!userId || typeof userId !== "string" || !userId.trim()) {
      logAction(
        "Validation Failed",
        `Invalid userId provided. Received: ${userId}`
      );
      return res
        .status(500)
        .json("Invalid user ID: must be a non-empty string.");
    }
    req.sanitizedUserId = userId.trim();

    logAction(
      "Validation Successful",
      `Sanitized inputs: vote_type=${req.sanitizedVoteType}, parent_id=${req.sanitizedParentId}, parent_type=${req.sanitizedParentType}, userId=${req.sanitizedUserId}`
    );

    next();
  };
};
