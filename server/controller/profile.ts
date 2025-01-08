import express from "express";
import { Response } from "express";
import {
  getUserById,
  getUserByUsername,
  getUserProfile,
  updateUserProfile,
} from "../models/application";
import { authenticateToken } from "../utils/tokenUtils";
import Question from "../models/questions";
import {
  ProfileRequestWithSanitizedFields,
  sanitizeProfileInput,
} from "../sanitizers/profileInputSanitizer";
import {
  ProfileRequestWithSanitizedId,
  validateUserIdMiddleware,
} from "../sanitizers/userIdSanitizer";
import {
  SaveRequestWithSanitizedId,
  validateSaveQuestionInputs,
} from "../sanitizers/saveQuestionSanitizer";
import { logAction } from "../utils/logUtils";

const router = express.Router();

/**
 * GET /
 * Retrieves user profile details and saved questions.
 *
 * @name GetProfile
 * @function
 * @memberof Router
 * @param {ProfileRequestWithSanitizedId} req - The request object containing the sanitized user ID.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with the user's bio, saved questions, and username.
 * @throws {Error} Sends an error message for user not found or server issues.
 */
router.get(
  "/",
  authenticateToken,
  validateUserIdMiddleware,
  async (req: ProfileRequestWithSanitizedId, res: Response) => {
    const sanitizedUserId = req.sanitizedUserId!;

    try {
      const user = await getUserById(sanitizedUserId);
      if (!user) {
        logAction(
          "Profile Retrieval Failed",
          `User ID: ${sanitizedUserId}, Reason: User not found`
        );
        return res.status(404).json({ message: "User not found" });
      }

      const username = user.username;

      const profile = await getUserProfile(username);
      if (!profile || "error" in profile) {
        logAction(
          "Profile Retrieval Failed",
          `Username: ${username}, Reason: Profile not found`
        );
        return res
          .status(404)
          .json({ message: profile?.error || "Profile not found" });
      }

      const populatedSavedQuestions = await Question.find({
        _id: { $in: profile.savedQuestions },
      })
        .populate("tags")
        .populate("answers");

      logAction(
        "Profile Retrieved",
        `Username: ${username}, User ID: ${sanitizedUserId}`
      );
      res.status(200).json({
        bio: profile.bio,
        savedQuestions: populatedSavedQuestions,
        username: profile.username,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      logAction(
        "Profile Retrieval Error",
        `User ID: ${sanitizedUserId}, Error: ${errorMessage}`
      );

      console.error("Error retrieving profile:", errorMessage);

      res.status(500).json({ message: "Error retrieving profile" });
    }
  }
);

/**
 * PUT /edit
 * Edits user profile details.
 *
 * @name EditProfile
 * @function
 * @memberof Router
 * @param {ProfileRequestWithSanitizedFields} req - The request object containing sanitized profile fields.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 * @throws {Error} Sends an error message for invalid input or server issues.
 */
const profileEditHandler = async (
  req: ProfileRequestWithSanitizedFields,
  res: Response
) => {
  const { sanitizedCurrentUsername, sanitizedNewUsername, sanitizedBio } = req;

  try {
    const existingUser = await getUserByUsername(sanitizedNewUsername!);
    if (existingUser && existingUser.username !== sanitizedCurrentUsername) {
      logAction(
        "Profile Edit Failed",
        `Current Username: ${sanitizedCurrentUsername}, New Username: ${sanitizedNewUsername}, Reason: Username already taken`
      );
      return res
        .status(400)
        .json({ message: "Username already taken by another user" });
    }

    const updatedProfile = await updateUserProfile(sanitizedCurrentUsername!, {
      username: sanitizedNewUsername!,
      bio: sanitizedBio,
    });

    if ("error" in updatedProfile) {
      logAction(
        "Profile Edit Error",
        `Username: ${sanitizedCurrentUsername}, Reason: ${updatedProfile.error}`
      );
      return res.status(500).json({ message: updatedProfile.error });
    }

    logAction(
      "Profile Edited",
      `Current Username: ${sanitizedCurrentUsername}, New Username: ${sanitizedNewUsername}`
    );
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    logAction(
      "Profile Edit Error",
      `Username: ${sanitizedCurrentUsername}, Error: ${errorMessage}`
    );

    console.error("Error updating profile:", errorMessage);

    res.status(500).send("Error updating profile");
  }
};

router.put("/edit", sanitizeProfileInput, profileEditHandler);

/**
 * POST /save
 * Saves a question to the user's profile.
 *
 * @name SaveQuestion
 * @function
 * @memberof Router
 * @param {SaveRequestWithSanitizedId} req - The request object containing sanitized user ID and question ID.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 * @throws {Error} Sends an error message for invalid input or server issues.
 */
router.post(
  "/save",
  authenticateToken,
  validateSaveQuestionInputs,
  async (req: SaveRequestWithSanitizedId, res: Response) => {
    const { sanitizedUserId, sanitizedQuestion } = req;

    try {
      const user = await getUserById(sanitizedUserId!);
      if (!user) {
        logAction(
          "Save Question Failed",
          `User ID: ${sanitizedUserId}, Reason: User not found`
        );
        return res.status(404).json({ message: "User not found" });
      }

      const profileData = await getUserProfile(user.username);
      if (!profileData || "error" in profileData) {
        logAction(
          "Save Question Failed",
          `Username: ${user.username}, Reason: Profile not found`
        );
        return res
          .status(404)
          .json({ message: profileData?.error || "Profile not found" });
      }

      if (!profileData.savedQuestions.includes(sanitizedQuestion!)) {
        profileData.savedQuestions.push(sanitizedQuestion!);
        await profileData.save();
        logAction(
          "Question Saved",
          `User ID: ${sanitizedUserId}, Question ID: ${sanitizedQuestion?._id}`
        );
      }

      res.status(200).json({ message: "Question saved successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      logAction(
        "Save Question Error",
        `User ID: ${sanitizedUserId}, Error: ${errorMessage}`
      );

      console.error("Error saving question:", errorMessage);

      res.status(500).json({ message: "Error saving question" });
    }
  }
);

/**
 * POST /unsave
 * Unsaves a question from the user's profile.
 *
 * @name UnsaveQuestion
 * @function
 * @memberof Router
 * @param {SaveRequestWithSanitizedId} req - The request object containing sanitized user ID and question ID.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} Responds with a success message or an error message.
 * @throws {Error} Sends an error message for invalid input or server issues.
 */
router.post(
  "/unsave",
  authenticateToken,
  validateSaveQuestionInputs,
  async (req: SaveRequestWithSanitizedId, res: Response) => {
    const { sanitizedUserId, sanitizedQuestion } = req;

    try {
      const user = await getUserById(sanitizedUserId!);
      if (!user) {
        logAction(
          "Unsave Question Failed",
          `User ID: ${sanitizedUserId}, Reason: User not found`
        );
        return res.status(404).json({ message: "User not found" });
      }

      const profileData = await getUserProfile(user.username);
      if (!profileData || "error" in profileData) {
        logAction(
          "Unsave Question Failed",
          `Username: ${user.username}, Reason: Profile not found`
        );
        return res
          .status(404)
          .json({ message: profileData?.error || "Profile not found" });
      }

      profileData.savedQuestions = profileData.savedQuestions.filter(
        (qId) => qId.toString() !== sanitizedQuestion?._id?.toString()
      );
      await profileData.save();

      logAction(
        "Question Unsaved",
        `User ID: ${sanitizedUserId}, Question ID: ${sanitizedQuestion?._id}`
      );
      res.status(200).json({ message: "Question unsaved successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      logAction(
        "Unsave Question Error",
        `User ID: ${sanitizedUserId}, Error: ${errorMessage}`
      );

      console.error("Error unsaving question:", errorMessage);

      res.status(500).json({ message: "Error unsaving question" });
    }
  }
);

export default router;
