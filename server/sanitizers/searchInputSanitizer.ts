import { Request, Response, NextFunction } from "express";

/**
 * Custom sanitization function to remove unsafe characters from search strings.
 * Escapes SQL-related special characters like `%`, `_`, and others.
 */
const sanitizeSearchInput = (input: string): string => {
  return input.replace(/[%_;'"\\]/g, "").trim(); // Remove unsafe characters and trim whitespace
};

/**
 * @typedef GetQuestionsRequestWithSanitizedQuery
 * @extends Request
 * @property {string} [sanitizedOrder] - The sanitized sort order parameter.
 * @property {string} [sanitizedSearch] - The sanitized search query parameter.
 */
export interface GetQuestionsRequestWithSanitizedQuery extends Request {
  sanitizedOrder?: string;
  sanitizedSearch?: string;
}

/**
 * Middleware to validate and sanitize order and search query parameters.
 */
export const sanitizeGetQuestionsInput = (
  req: GetQuestionsRequestWithSanitizedQuery,
  res: Response,
  next: NextFunction
) => {
  const { order, search } = req.query;

  const allowedOrders = ["newest", "active", "unanswered"];
  req.sanitizedOrder = allowedOrders.includes(order as string)
    ? (order as string)
    : "newest"; // Default to "newest" if invalid or missing

  if (search && typeof search === "string") {
    req.sanitizedSearch = sanitizeSearchInput(search);
  } else {
    req.sanitizedSearch = ""; // Default to empty string if missing or invalid
  }

  next();
};
