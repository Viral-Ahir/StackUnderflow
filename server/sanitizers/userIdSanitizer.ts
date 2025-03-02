import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";
import { logAction } from "../utils/logUtils"; // Assuming a logging utility

/**
 * @typedef ProfileRequestWithSanitizedId
 * @extends Request
 * @property {string} [sanitizedUserId] - The sanitized user ID.
 */
export interface ProfileRequestWithSanitizedId extends Request {
  sanitizedUserId?: string;
}

/**
 * Middleware to validate and sanitize the user ID from the request body.
 *
 * @function validateUserIdMiddleware
 * @param {ProfileRequestWithSanitizedId} req - The request object containing the user ID in the body.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} Proceeds to the next middleware or sends a 401 response if validation fails.
 */
export const validateUserIdMiddleware = (
  req: ProfileRequestWithSanitizedId,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body?.userId;

  if (!userId || !isValidObjectId(userId)) {
    logAction(
      "Validation Failed",
      `Invalid or missing userId. Received: ${userId}`
    );
    return res.status(401).json({ message: "Log in to continue" });
  }

  req.sanitizedUserId = userId;
  logAction(
    "Sanitization Successful",
    `Sanitized userId: ${req.sanitizedUserId}`
  );

  next();
};
