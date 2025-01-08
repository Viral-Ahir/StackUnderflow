import request from "supertest";
import express from "express";
import voteRouter from "../controller/vote";
import { addVoteToQuestion, addVoteToAnswer } from "../models/application";
import { authenticateToken } from "../utils/tokenUtils";

const mockToken = process.env.MOCK_TOKEN || "defaultMockToken";

jest.mock("../models/application");
jest.mock("../utils/tokenUtils");

const app = express();
app.use(express.json());
app.use("/votes", voteRouter);

describe("Vote Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /votes", () => {
    it("should successfully add an upvote to a question", async () => {
      const mockUpdatedQuestion = { message: "Vote added successfully" };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToQuestion as jest.Mock).mockResolvedValue(mockUpdatedQuestion);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedQuestion);
      expect(addVoteToQuestion).toHaveBeenCalledWith(
        "mockQuestionId",
        "testUserId",
        "up"
      );
    });

    it("should return 500 if userId is missing", async () => {
      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
        });

      expect(response.status).toBe(500);
      expect(response.body).toBe(
        "Invalid user ID: must be a non-empty string."
      );
    });

    it("should return 500 if userId is empty", async () => {
      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
          userId: "   ", // Empty userId
        });

      expect(response.status).toBe(500);
      expect(response.body).toBe(
        "Invalid user ID: must be a non-empty string."
      );
    });

    it("should return 500 if userId is not a string", async () => {
      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
          userId: 12345, // Invalid type
        });

      expect(response.status).toBe(500);
      expect(response.body).toBe(
        "Invalid user ID: must be a non-empty string."
      );
    });

    it("should successfully add a downvote to an answer", async () => {
      const mockUpdatedAnswer = { message: "Vote added successfully" };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToAnswer as jest.Mock).mockResolvedValue(mockUpdatedAnswer);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "down",
          parent_id: "mockAnswerId",
          parent_type: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedAnswer);
      expect(addVoteToAnswer).toHaveBeenCalledWith(
        "mockAnswerId",
        "testUserId",
        "down"
      );
    });

    it("should return 403 if the user has already voted on a question", async () => {
      const mockResponse = { error: "You have already voted on this question" };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToQuestion as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe(mockResponse.error);
    });

    it("should return 403 if the user has already voted on an answer", async () => {
      const mockResponse = { error: "You have already voted on this answer" };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToAnswer as jest.Mock).mockResolvedValue(mockResponse);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "down",
          parent_id: "mockAnswerId",
          parent_type: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toBe(mockResponse.error);
    });

    it("should return 500 if addVoteToQuestion fails", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToQuestion as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "up",
          parent_id: "mockQuestionId",
          parent_type: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error while updating question with vote.");
    });

    it("should return 500 if addVoteToAnswer fails", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToAnswer as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "down",
          parent_id: "mockAnswerId",
          parent_type: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error while updating answer with vote.");
    });

    it("should return 500 if an unexpected error occurs", async () => {
      const mockError = new Error("Unexpected error");

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (addVoteToAnswer as jest.Mock).mockRejectedValue(mockError);

      const response = await request(app)
        .post("/votes")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          vote_type: "down",
          parent_id: "mockAnswerId",
          parent_type: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Unexpected error");
    });
  });

  it("should return 500 if vote_type is missing", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        parent_id: "mockQuestionId",
        parent_type: "question",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid vote type provided.");
  });

  it("should return 500 if vote_type is not a string", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        vote_type: 123,
        parent_id: "mockQuestionId",
        parent_type: "question",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid vote type provided.");
  });

  it("should return 500 if parent_id is missing", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        vote_type: "up",
        parent_type: "question",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid parent ID provided.");
  });

  it("should return 500 if parent_id is empty", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        vote_type: "up",
        parent_id: "   ",
        parent_type: "question",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid parent ID provided.");
  });

  it("should return 500 if parent_type is missing", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        vote_type: "up",
        parent_id: "mockQuestionId",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid parent type provided.");
  });

  it("should return 500 if parent_type is not allowed", async () => {
    const response = await request(app)
      .post("/votes")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        vote_type: "up",
        parent_id: "mockQuestionId",
        parent_type: "invalidType",
        userId: "testUserId",
      });

    expect(response.status).toBe(500);
    expect(response.text).toBe("Invalid parent type provided.");
  });
});
