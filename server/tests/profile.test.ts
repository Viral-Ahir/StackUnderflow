import request from "supertest";
import express from "express";
import profileRouter from "../controller/profile";
import {
  getUserById,
  getUserByUsername,
  getUserProfile,
  updateUserProfile,
} from "../models/application";
import { authenticateToken } from "../utils/tokenUtils";
import Question from "../models/questions";
import { logAction } from "../utils/logUtils";

const mockToken = process.env.MOCK_TOKEN || "defaultMockToken";

// Mock dependencies
jest.mock("../models/application");
jest.mock("../utils/tokenUtils");

jest.mock("../utils/logUtils", () => ({
  logAction: jest.fn(),
}));

// Mock Mongoose model methods
jest.mock("../models/questions", () => ({
  find: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use("/profile", profileRouter);

describe("Profile Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /profile", () => {
    it("should return 404 if profile is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to return null
      (getUserProfile as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get("/profile").send({
        userId: "63e2c59b1f456e001cf12345",
      });

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });

    it("should return 404 if profile contains an error field", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to return an object with an error field
      (getUserProfile as jest.Mock).mockResolvedValue({
        error: "Profile error",
      });

      const response = await request(app).get("/profile").send({
        userId: "63e2c59b1f456e001cf12345",
      });

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile error" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });

    it("should return user profile data successfully", async () => {
      // Mock the authentication middleware to proceed
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock the getUserById function to return a mock user object
      (getUserById as jest.Mock).mockResolvedValue({
        username: "testUser",
      });

      // Mock the getUserProfile function to return a mock profile object
      (getUserProfile as jest.Mock).mockResolvedValue({
        bio: "This is a test bio",
        savedQuestions: ["673627a74cd4f025d13505bc"],
        username: "testUser",
      });

      // Mock the Question.find() method to return populated question details
      const mockQuestions = [
        {
          _id: "673627a74cd4f025d13505bc",
          title: "Sample Question Title",
          text: "Sample Question Text",
          tags: [{ name: "Tag1" }, { name: "Tag2" }],
          answers: [{ text: "Sample Answer" }],
        },
      ];
      (Question.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          populate: jest.fn().mockResolvedValue(mockQuestions),
        }),
      });

      // Perform a GET request to the /profile endpoint
      const response = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({ userId: "63e2c59b1f456e001cf12345" });

      // Assert the response status and body
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        bio: "This is a test bio",
        savedQuestions: [
          {
            _id: "673627a74cd4f025d13505bc",
            title: "Sample Question Title",
            text: "Sample Question Text",
            tags: [{ name: "Tag1" }, { name: "Tag2" }],
            answers: [{ text: "Sample Answer" }],
          },
        ],
        username: "testUser",
      });

      // Verify that the mocked functions were called
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
      expect(Question.find).toHaveBeenCalledWith({
        _id: { $in: ["673627a74cd4f025d13505bc"] },
      });
    });

    it("should return 404 if user is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .get("/profile")
        .send({ userId: "63e2c59b1f456e001cf12345" });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 500 if there is an error retrieving profile", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/profile")
        .send({ userId: "63e2c59b1f456e001cf12345" });

      expect(response.status).toBe(500);
    });

    it("should return 401 if userId is missing", async () => {
      const response = await request(app).get("/profile").send({});
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Unauthorized" });
    });

    it("should return 404 if profile is not found or contains an error", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });
      (getUserProfile as jest.Mock).mockResolvedValue({
        error: "Profile database error",
      });

      const response = await request(app)
        .get("/profile")
        .send({ userId: "63e2c59b1f456e001cf12345" });
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile database error" });
    });
  });

  describe("PUT /profile/edit", () => {
    it("should return 400 if currentUsername is invalid (non-alphanumeric)", async () => {
      const response = await request(app).put("/profile/edit").send({
        currentUsername: "invalid!username",
        newUsername: "validNewUsername",
        bio: "Valid bio",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          "Current username must be 3-30 characters long and alphanumeric.",
      });
    });

    it("should return 400 if currentUsername is invalid (too short)", async () => {
      const response = await request(app).put("/profile/edit").send({
        currentUsername: "ab",
        newUsername: "validNewUsername",
        bio: "Valid bio",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message:
          "Current username must be 3-30 characters long and alphanumeric.",
      });
    });

    it("should return 400 if newUsername is invalid (non-alphanumeric)", async () => {
      const response = await request(app).put("/profile/edit").send({
        currentUsername: "validUsername",
        newUsername: "new!invalid",
        bio: "Valid bio",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "New username must be 3-30 characters long and alphanumeric.",
      });
    });

    it("should return 400 if newUsername is invalid (too long)", async () => {
      const response = await request(app)
        .put("/profile/edit")
        .send({
          currentUsername: "validUsername",
          newUsername: "a".repeat(31), // 31 characters
          bio: "Valid bio",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "New username must be 3-30 characters long and alphanumeric.",
      });
    });

    it("should return 400 if bio is not a string", async () => {
      const response = await request(app).put("/profile/edit").send({
        currentUsername: "validUsername",
        newUsername: "validNewUsername",
        bio: 12345, // Invalid bio
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Invalid bio",
      });
    });

    it("should allow valid currentUsername, newUsername, and bio", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue(null);
      (updateUserProfile as jest.Mock).mockResolvedValue({});

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "validUsername",
        newUsername: "validNewUsername",
        bio: "This is a valid bio.",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Profile updated successfully",
      });
    });

    it("should return 401 if currentUsername is missing", async () => {
      const response = await request(app).put("/profile/edit").send({
        newUsername: "newTestUser",
        bio: "Updated bio",
      });

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Unauthorized" });
    });

    it("should return 500 if there is an error in updatedProfile", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue(null);
      (updateUserProfile as jest.Mock).mockResolvedValue({
        error: "Failed to update profile",
      });

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "newTestUser",
        bio: "Updated bio",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Failed to update profile" });
    });

    it("should update the user profile successfully", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue(null);
      (updateUserProfile as jest.Mock).mockResolvedValue({});

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "newTestUser",
        bio: "Updated bio",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Profile updated successfully",
      });
      expect(getUserByUsername).toHaveBeenCalledWith("newTestUser");
      expect(updateUserProfile).toHaveBeenCalledWith("testUser", {
        username: "newTestUser",
        bio: "Updated bio",
      });
    });

    it("should update only the bio successfully", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue(null);
      (updateUserProfile as jest.Mock).mockResolvedValue({});

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "testUser",
        bio: "Updated bio only",
      });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Profile updated successfully",
      });
      expect(getUserByUsername).toHaveBeenCalledWith("testUser");
      expect(updateUserProfile).toHaveBeenCalledWith("testUser", {
        username: "testUser",
        bio: "Updated bio only",
      });
    });

    it("should return 400 if new username is empty", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "",
        bio: "Updated bio",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Username cannot be empty" });
    });

    it("should return 400 if new username is already taken", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue({
        username: "anotherUser",
      });

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "anotherUser",
        bio: "Updated bio",
      });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Username already taken by another user",
      });
    });

    it("should return 500 if there is an error updating the profile", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserByUsername as jest.Mock).mockResolvedValue(null);
      (updateUserProfile as jest.Mock).mockRejectedValue(
        new Error("Update error")
      );

      const response = await request(app).put("/profile/edit").send({
        currentUsername: "testUser",
        newUsername: "newTestUser",
        bio: "Updated bio",
      });

      expect(response.status).toBe(500);
    });
  });

  // Tests for POST /profile/save
  describe("POST /profile/save", () => {
    // Test case for profile not found
    it("should return 404 if profile is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to return null
      (getUserProfile as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/profile/save").send({
        userId: "63e2c59b1f456e001cf12345",
        question: "673627a74cd4f025d13505bc",
      });

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });

    // Test case for profile containing an error field
    it("should return 404 if profile contains an error field", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to return an object with an error field
      (getUserProfile as jest.Mock).mockResolvedValue({
        error: "Profile database error",
      });

      const response = await request(app).post("/profile/save").send({
        userId: "63e2c59b1f456e001cf12345",
        question: "673627a74cd4f025d13505bc",
      });

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile database error" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });

    it("should return 404 if user is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/profile/save").send({
        userId: "63e2c59b1f456e001cf12345",
        question: "673627a74cd4f025d13505bc",
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
    });

    it("should return 404 if profile data is not found or contains an error", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });
      (getUserProfile as jest.Mock).mockResolvedValue({
        error: "Profile database error",
      });

      const response = await request(app).post("/profile/save").send({
        userId: "63e2c59b1f456e001cf12345",
        question: "673627a74cd4f025d13505bc",
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile database error" });
    });

    it("should return 500 if an error occurs during saving question", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });
      (getUserProfile as jest.Mock).mockResolvedValue({
        savedQuestions: [],
        save: jest.fn().mockRejectedValue(new Error("Save error")),
      });

      const response = await request(app).post("/profile/save").send({
        userId: "63e2c59b1f456e001cf12345",
        question: "673627a74cd4f025d13505bc",
      });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error saving question" });
    });
  });

  it("should save a question successfully", async () => {
    (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
      next()
    );
    (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });
    (getUserProfile as jest.Mock).mockResolvedValue({
      savedQuestions: [],
      save: jest.fn().mockResolvedValue(true),
    });

    const response = await request(app).post("/profile/save").send({
      userId: "63e2c59b1f456e001cf12345",
      question: "673627a74cd4f025d13505bc",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Question saved successfully" });
  });

  it("should return 401 if userId or question is missing", async () => {
    const response = await request(app).post("/profile/save").send({});
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: "Invalid request" });
  });

  // Tests for POST /profile/unsave
  describe("POST /profile/unsave", () => {
    it("should log the action when a user unsaves a question", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mocking getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mocking getUserProfile to return a profile with saved questions
      const mockProfileData = {
        savedQuestions: ["673627a74cd4f025d13505bc"],
        save: jest.fn().mockResolvedValue(true),
      };
      (getUserProfile as jest.Mock).mockResolvedValue(mockProfileData);

      // Perform a POST request to /profile/unsave
      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Question unsaved successfully",
      });

      // Verify that the logAction function was called
      expect(logAction).toHaveBeenCalledWith(
        "Question Unsaved",
        "User ID: 63e2c59b1f456e001cf12345, Question ID: 673627a74cd4f025d13505bc"
      );

      // Verify that savedQuestions were updated correctly
      expect(mockProfileData.savedQuestions).toEqual([]);
    });

    it("should unsave a question successfully", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });
      (getUserProfile as jest.Mock).mockResolvedValue({
        savedQuestions: ["673627a74cd4f025d13505bc"],
        save: jest.fn().mockResolvedValue(true),
      });

      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: "Question unsaved successfully",
      });
    });

    it("should return 401 if userId or question is missing", async () => {
      const response = await request(app).post("/profile/unsave").send({});
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: "Invalid request" });
    });

    it("should return 500 if there is an error unsaving the question", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Simulate an error during the profile fetch or save
      (getUserProfile as jest.Mock).mockResolvedValue({
        savedQuestions: ["673627a74cd4f025d13505bc"],
        save: jest.fn().mockRejectedValue(new Error("Save error")),
      });

      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ message: "Error unsaving question" });
    });

    it("should return 404 if user is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return null
      (getUserById as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "User not found" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
    });

    it("should return 404 if profile data is not found", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to return null
      (getUserProfile as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Profile not found" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });

    it("should return 404 if there is an error fetching the profile", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      // Mock getUserById to return a valid user
      (getUserById as jest.Mock).mockResolvedValue({ username: "testUser" });

      // Mock getUserProfile to throw an error
      (getUserProfile as jest.Mock).mockResolvedValue({
        error: "Database error",
      });

      const response = await request(app)
        .post("/profile/unsave")
        .send({
          userId: "63e2c59b1f456e001cf12345",
          question: { _id: "673627a74cd4f025d13505bc" },
        });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Database error" });
      expect(getUserById).toHaveBeenCalledWith("63e2c59b1f456e001cf12345");
      expect(getUserProfile).toHaveBeenCalledWith("testUser");
    });
  });
});
