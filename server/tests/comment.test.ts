import request from "supertest";
import express from "express";
import commentRouter from "../controller/comment";
import {
  saveComment,
  addCommentToQuestion,
  addCommentToAnswer,
} from "../models/application";
import { authenticateToken } from "../utils/tokenUtils";

const mockToken = process.env.MOCK_TOKEN || "defaultMockToken";

// Mock dependencies
jest.mock("../models/application");
jest.mock("../utils/tokenUtils");

const app = express();
app.use(express.json());
app.use("/comments", commentRouter);

describe("Comment Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /comments", () => {
    it("should successfully add a comment to a question", async () => {
      const mockComment = {
        text: "This is a test comment",
        commented_by: "testUserId",
        post_date_time: new Date(),
      };

      const mockSavedComment = {
        ...mockComment,
        _id: "mockCommentId",
        post_date_time: mockComment.post_date_time.toISOString(),
      };
      const mockUpdatedQuestion = {
        ...mockSavedComment,
        questionId: "mockQuestionId",
      };

      // Mocking functions
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (saveComment as jest.Mock).mockResolvedValue(mockSavedComment);
      (addCommentToQuestion as jest.Mock).mockResolvedValue(
        mockUpdatedQuestion
      );

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockQuestionId",
          parentType: "question",
          userId: "testUserId",
        });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSavedComment);
      expect(saveComment).toHaveBeenCalledWith(
        expect.objectContaining({
          text: "This is a test comment",
          commented_by: "testUserId",
        })
      );
      expect(addCommentToQuestion).toHaveBeenCalledWith(
        "mockQuestionId",
        mockSavedComment
      );
    });

    it("should successfully add a comment to an answer", async () => {
      const mockComment = {
        text: "This is a test comment",
        commented_by: "testUserId",
        post_date_time: new Date(),
      };

      const mockSavedComment = {
        ...mockComment,
        _id: "mockCommentId",
        post_date_time: mockComment.post_date_time.toISOString(),
      };
      const mockUpdatedAnswer = {
        ...mockSavedComment,
        answerId: "mockAnswerId",
      };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (saveComment as jest.Mock).mockResolvedValue(mockSavedComment);
      (addCommentToAnswer as jest.Mock).mockResolvedValue(mockUpdatedAnswer);

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockAnswerId",
          parentType: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSavedComment);
      expect(saveComment).toHaveBeenCalledWith(
        expect.objectContaining({
          text: "This is a test comment",
          commented_by: "testUserId",
        })
      );
    });

    it("should return 400 if description is missing", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          parentId: "mockQuestionId",
          parentType: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Description cannot be empty" });
    });

    it("should return 400 if description is not a string", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: 123,
          parentId: "mockQuestionId",
          parentType: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Description cannot be empty" });
    });

    it("should return 400 if parentId is missing", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentType: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid parentId" });
    });

    it("should return 400 if parentType is missing", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockQuestionId",
          userId: "testUserId",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: "Invalid parentType" });
    });

    it("should return 400 if parentType is not 'question' or 'answer'", async () => {
      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockId",
          parentType: "unknown",
          userId: "testUserId",
        });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Parent type must be 'question' or 'answer'",
      });
    });

    it("should return 500 if saveComment returns an error object", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );

      const mockErrorResponse = { error: "Database save failed" };
      (saveComment as jest.Mock).mockResolvedValue(mockErrorResponse);

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockQuestionId",
          parentType: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error while saving comment to database");
      expect(saveComment).toHaveBeenCalled();
    });

    it("should return 500 if addCommentToQuestion returns a falsy value", async () => {
      const mockComment = {
        text: "This is a test comment",
        commented_by: "testUserId",
        post_date_time: new Date(),
      };

      const mockSavedComment = {
        ...mockComment,
        _id: "mockCommentId",
        post_date_time: mockComment.post_date_time.toISOString(),
      };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (saveComment as jest.Mock).mockResolvedValue(mockSavedComment);

      const mockErrorResponse = { error: "Question not found" };
      (addCommentToQuestion as jest.Mock).mockResolvedValue(mockErrorResponse);

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockQuestionId",
          parentType: "question",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error while updating question with comment");
      expect(saveComment).toHaveBeenCalled();
      expect(addCommentToQuestion).toHaveBeenCalledWith(
        "mockQuestionId",
        mockSavedComment
      );
    });

    it("should return 500 if addCommentToAnswer returns an error object", async () => {
      const mockComment = {
        text: "This is a test comment",
        commented_by: "testUserId",
        post_date_time: new Date(),
      };

      const mockSavedComment = {
        ...mockComment,
        _id: "mockCommentId",
        post_date_time: mockComment.post_date_time.toISOString(),
      };

      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      (saveComment as jest.Mock).mockResolvedValue(mockSavedComment);

      const mockErrorResponse = { error: "Answer not found" };
      (addCommentToAnswer as jest.Mock).mockResolvedValue(mockErrorResponse);

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockAnswerId",
          parentType: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Error while updating answer with comment");
      expect(saveComment).toHaveBeenCalled();
      expect(addCommentToAnswer).toHaveBeenCalledWith(
        "mockAnswerId",
        mockSavedComment
      );
    });

    it("should return 500 if an unexpected error occurs", async () => {
      (authenticateToken as jest.Mock).mockImplementation((req, res, next) =>
        next()
      );
      const mockError = new Error("Unexpected error");
      (saveComment as jest.Mock).mockRejectedValue(mockError);

      const response = await request(app)
        .post("/comments")
        .set("Authorization", `Bearer ${mockToken}`)
        .send({
          description: "This is a test comment",
          parentId: "mockAnswerId",
          parentType: "answer",
          userId: "testUserId",
        });

      expect(response.status).toBe(500);
      expect(response.text).toBe("Internal Server Error while adding comment");
    });
  });
});
