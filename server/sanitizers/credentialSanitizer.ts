import { Request, Response, NextFunction } from "express";
import { logAction } from "../utils/logUtils";

/**
 * @typedef RequestWithSanitizedCredentials
 * @extends Request
 * @property {string} [sanitizedUsername] - The sanitized username.
 * @property {string} [sanitizedPassword] - The sanitized password.
 * @property {string} [sanitizedEmail] - The sanitized email.
 */
export interface RequestWithSanitizedCredentials extends Request {
  sanitizedUsername?: string;
  sanitizedPassword?: string;
  sanitizedEmail?: string;
}

/**
 * Middleware to validate and sanitize user credentials.
 *
 * @function validateCredentialsMiddleware
 * @param {Object} [options] - Optional configuration for the middleware.
 * @param {boolean} [options.requireEmail=false] - Whether the `email` field is required.
 * @returns {Function} Middleware function for validation and sanitization.
 */
export const validateCredentialsMiddleware = (options?: {
  requireEmail?: boolean;
}) => {
  return (
    req: RequestWithSanitizedCredentials,
    res: Response,
    next: NextFunction
  ) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
      logAction(
        "Validation Failed",
        `Missing required fields. Username: ${username}, Password: ${password}`
      );
      return res.status(400).json({ message: "All fields are required" });
    }

    if (options?.requireEmail && !email) {
      logAction(
        "Validation Failed",
        `Email is required but missing. Username: ${username}`
      );
      return res.status(400).json({ message: "All fields are required" });
    }
    if (typeof username !== "string" || typeof password !== "string") {
      logAction(
        "Validation Failed",
        `Invalid types. Username: ${username}, Password: ${password}`
      );
      return res.status(400).json({
        message: "Invalid input: 'username' and 'password' must be strings.",
      });
    }

    const isValidUsername = /^[a-zA-Z0-9_]{3,30}$/.test(username);
    if (!isValidUsername) {
      logAction(
        "Validation Failed",
        `Invalid username format. Username: ${username}`
      );
      return res.status(400).json({
        message:
          "Invalid username: Must be 3-30 characters long and contain only alphanumeric characters or underscores.",
      });
    }

    const isValidPassword = /^[^\s]{8,50}$/.test(password);
    if (!isValidPassword) {
      logAction(
        "Validation Failed",
        `Invalid password format. Username: ${username}`
      );
      return res.status(400).json({
        message:
          "Invalid password: Must be 8-50 characters long and cannot contain spaces.",
      });
    }

    if (options?.requireEmail) {
      if (typeof email !== "string") {
        logAction(
          "Validation Failed",
          `Email is not a string. Username: ${username}, Email: ${email}`
        );
        return res.status(400).json({
          message: "Invalid input: 'email' must be a string.",
        });
      }

      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
      if (!isValidEmail) {
        logAction(
          "Validation Failed",
          `Invalid email format. Username: ${username}, Email: ${email}`
        );
        return res.status(400).json({
          message: "Invalid email: Must be a valid email address.",
        });
      }

      req.sanitizedEmail = email.trim();
      logAction(
        "Sanitization Successful",
        `Sanitized email: ${req.sanitizedEmail}`
      );
    }

    req.sanitizedUsername = username.trim();
    req.sanitizedPassword = password;
    logAction(
      "Sanitization Successful",
      `Sanitized username: ${req.sanitizedUsername}`
    );
    next();
  };
};
