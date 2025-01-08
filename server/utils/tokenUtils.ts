import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { ProfileRequest } from "../models/types/types";

const SECRET_KEY = process.env.JWT_SECRET || "your_jwt_secret_key";

/**
 * Generates a JWT token for the user
 * @param userId - The user's ID
 * @param username - The user's username
 * @returns The generated JWT token
 */
export const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
};

/**
 * Middleware to authenticate the JWT token
 * @param req - The request object with an optional user property
 * @param res - The response object
 * @param next - The next middleware function
 */
export const authenticateToken = (
  req: ProfileRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const user = jwt.verify(token, SECRET_KEY) as { id: string };
    req.body.userId = user.id;
    next();
  } catch {
    res.status(403).json({ message: "Invalid access token" });
  }
};
