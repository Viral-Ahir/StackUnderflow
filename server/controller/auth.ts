import express from "express";
import { Response } from "express";
import {
  findExistingUser,
  saveUser,
  createProfile,
  getUserByUsername,
} from "../models/application";
import { hashPassword, comparePasswords } from "../utils/passwordUtils";
import { generateToken } from "../utils/tokenUtils";
import {
  validateCredentialsMiddleware,
  RequestWithSanitizedCredentials,
} from "../sanitizers/credentialSanitizer";
import { logAction } from "../utils/logUtils"; // Import log utility

const router = express.Router();

/**
 * @typedef {Object} User
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The hashed password of the user.
 */

/**
 * POST /register
 * Registers a new user with a username, email, and password.
 *
 * @name Register
 * @function
 * @memberof Router
 * @param {RequestWithSanitizedCredentials} req - The request object containing sanitized credentials.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with a success message and JWT token if registration is successful.
 * @throws {Error} Responds with appropriate error messages for duplicate accounts or server errors.
 */
router.post(
  "/register",
  validateCredentialsMiddleware({ requireEmail: true }),
  async (req: RequestWithSanitizedCredentials, res: Response) => {
    try {
      const sanitizedUsername = req.sanitizedUsername!;
      const sanitizedPassword = req.sanitizedPassword!;
      const sanitizedEmail = req.sanitizedEmail!;

      const existingUser = await findExistingUser(
        sanitizedUsername,
        sanitizedEmail
      );
      if (existingUser) {
        logAction(
          "Registration Failed",
          `Username: ${sanitizedUsername}, Email: ${sanitizedEmail}, Reason: Already Exists`
        );
        return res
          .status(400)
          .json({ message: "Email or Username already exists" });
      }

      const hashedPassword = await hashPassword(sanitizedPassword);
      const newUser = await saveUser({
        username: sanitizedUsername,
        email: sanitizedEmail,
        password: hashedPassword,
      });

      await createProfile(sanitizedUsername!);

      const token = generateToken(newUser._id!);

      logAction(
        "Registration Successful",
        `Username: ${sanitizedUsername}, Email: ${sanitizedEmail}`
      );
      res.status(201).json({
        message: "Registration successful",
        user: newUser,
        token,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";

      logAction("Registration Error", `Error: ${errorMessage}`);

      res.status(500).json({
        message: "Registration failed",
        error: errorMessage,
      });
    }
  }
);

/**
 * POST /login
 * Logs in a user with their username and password.
 *
 * @name Login
 * @function
 * @memberof Router
 * @param {RequestWithSanitizedCredentials} req - The request object containing sanitized credentials.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with a success message and JWT token if login is successful.
 * @throws {Error} Responds with appropriate error messages for invalid credentials or server errors.
 */
router.post(
  "/login",
  validateCredentialsMiddleware({ requireEmail: false }),
  async (req: RequestWithSanitizedCredentials, res: Response) => {
    try {
      const sanitizedUsername = req.sanitizedUsername!;
      const sanitizedPassword = req.sanitizedPassword!;

      const user = await getUserByUsername(sanitizedUsername);
      if (!user) {
        logAction(
          "Login Failed",
          `Username: ${sanitizedUsername}, Reason: Account does not exist`
        );
        return res.status(404).json({ message: "Account does not exist" });
      }

      const isPasswordCorrect = await comparePasswords(
        sanitizedPassword,
        user.password
      );
      if (!isPasswordCorrect) {
        logAction(
          "Login Failed",
          `Username: ${sanitizedUsername}, Reason: Incorrect password`
        );
        return res.status(401).json({ message: "Incorrect password" });
      }

      const token = generateToken(user._id!);
      logAction("Login Successful", `Username: ${sanitizedUsername}`);
      return res.status(200).json({
        message: "Login successful",
        token,
        username: user.username,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      logAction("Login Error", `Error: ${errorMessage}`);

      res.status(500).json({
        message: "An error occurred during login",
        error: errorMessage,
      });
    }
  }
);

export default router;
