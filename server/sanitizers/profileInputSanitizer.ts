import { Request, Response, NextFunction } from "express";
import { logAction } from "../utils/logUtils";

/**
 * @typedef ProfileRequestWithSanitizedFields
 * @extends Request
 * @property {string} [sanitizedCurrentUsername] - The sanitized current username of the user.
 * @property {string} [sanitizedNewUsername] - The sanitized new username of the user.
 * @property {string} [sanitizedBio] - The sanitized bio of the user.
 */
export interface ProfileRequestWithSanitizedFields extends Request {
  sanitizedCurrentUsername?: string;
  sanitizedNewUsername?: string;
  sanitizedBio?: string;
}

/**
 * Custom sanitization function to remove unsafe characters.
 * Removes keys starting with `$` or containing `.` to prevent NoSQL injection.
 */
const sanitizeInput = (input: string): string => {
  return input.replace(/[$.]/g, "");
};

/**
 * Middleware to validate and sanitize profile input fields.
 */
export const sanitizeProfileInput = (
  req: ProfileRequestWithSanitizedFields,
  res: Response,
  next: NextFunction
) => {
  const { currentUsername, newUsername, bio } = req.body;

  if (!currentUsername || typeof currentUsername !== "string") {
    logAction("Validation Failed", "Missing or invalid currentUsername");
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(currentUsername)) {
    logAction(
      "Validation Failed",
      `Invalid currentUsername format. CurrentUsername: ${currentUsername}`
    );
    return res.status(400).json({
      message:
        "Current username must be 3-30 characters long and alphanumeric.",
    });
  }
  req.sanitizedCurrentUsername = sanitizeInput(currentUsername.trim());
  logAction(
    "Sanitization Successful",
    `Sanitized currentUsername: ${req.sanitizedCurrentUsername}`
  );

  if (!newUsername || typeof newUsername !== "string" || !newUsername.trim()) {
    logAction(
      "Validation Failed",
      `Missing or invalid newUsername. NewUsername: ${newUsername}`
    );
    return res.status(400).json({ message: "Username cannot be empty" });
  }
  if (!/^[a-zA-Z0-9_]{3,30}$/.test(newUsername)) {
    logAction(
      "Validation Failed",
      `Invalid newUsername format. NewUsername: ${newUsername}`
    );
    return res.status(400).json({
      message: "New username must be 3-30 characters long and alphanumeric.",
    });
  }
  req.sanitizedNewUsername = sanitizeInput(newUsername.trim());
  logAction(
    "Sanitization Successful",
    `Sanitized newUsername: ${req.sanitizedNewUsername}`
  );

  if (bio && typeof bio !== "string") {
    logAction("Validation Failed", "Invalid bio format");
    return res.status(400).json({ message: "Invalid bio" });
  }
  req.sanitizedBio = bio ? sanitizeInput(bio.trim()) : undefined;
  if (bio) {
    logAction("Sanitization Successful", `Sanitized bio: ${req.sanitizedBio}`);
  }

  next();
};
