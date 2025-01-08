import rateLimit from "express-rate-limit";
import { logAction } from "../utils/logUtils";
/**
 * Rate limiter middleware for controlling the number of requests to the application.
 *
 * @constant appRateLimiter
 * @type {Function} Middleware function to limit the number of requests to the application.
 * @name appRateLimiter - Rate limiter middleware for the application.
 */
export const appRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 200,
  message: {
    message:
      "Too many requests to the profile endpoint, please try again later.",
  },
  skip: () => process.env.NODE_ENV === "test",
  handler: (req, res, next, options) => {
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent") || "Unknown";
    const requestUrl = req.originalUrl;
    const time = new Date().toISOString();

    logAction(
      "Rate Limit Exceeded",
      `IP: ${ipAddress}, URL: ${requestUrl}, User-Agent: ${userAgent}, Time: ${time}`
    );

    res.status(options.statusCode).json(options.message);
  },
});
