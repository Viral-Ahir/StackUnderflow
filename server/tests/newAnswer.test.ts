import supertest from "supertest";
import mongoose from "mongoose";
import { saveAnswer, addAnswerToQuestion } from "../models/application";
import { Server } from "http";

jest.mock("../models/application", () => ({
  saveAnswer: jest.fn(),
  addAnswerToQuestion: jest.fn(),
}));

let server: Server;
describe("POST /addAnswer", () => {
  beforeEach(() => {
    server = require("../server");
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  it("should add a new answer to the question", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer",
      ans_by: "dummyUserId",
      ans_date_time: "2024-06-03",
    };

    // Mock the create method of the Answer model
    (saveAnswer as jest.Mock).mockResolvedValueOnce(mockAnswer);
    (addAnswerToQuestion as jest.Mock).mockResolvedValueOnce({
      _id: "dummyQuestionId",
      answers: ["dummyAnswerId"],
    });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAnswer);
  });

  it("should return bad request error if answer text property is missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid answer");
  });

  it("should return bad request error if request body has qid property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      ans: {
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if answer object has ans_by property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_date_time: "2024-06-03",
      },
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if answer object has ans_date_time property missing", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
      },
    };

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return bad request error if request body is missing", async () => {
    // Making the request
    const response = await supertest(server).post("/answer/addAnswer");

    // Asserting the response
    expect(response.status).toBe(400);
  });

  it("should return database error in response if saveAnswer method throws an error", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    (saveAnswer as jest.Mock).mockResolvedValueOnce({
      error: "Database error",
    });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it("should return database error in response if update question method throws an error", async () => {
    // Mocking the request body
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    const mockAnswer = {
      _id: "dummyAnswerId",
      text: "This is a test answer",
      ans_by: "dummyUserId",
      ans_date_time: "2024-06-03",
    };

    (saveAnswer as jest.Mock).mockResolvedValueOnce(mockAnswer);
    (addAnswerToQuestion as jest.Mock).mockResolvedValueOnce({
      error: "Database error",
    });

    // Making the request
    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    // Asserting the response
    expect(response.status).toBe(500);
  });

  it("should return bad request error if answer object is missing", async () => {
    const mockReqBody = {
      qid: "dummyQuestionId",
    };

    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid answer");
  });

  it("should return internal server error if a catch block is triggered", async () => {
    const mockReqBody = {
      qid: "dummyQuestionId",
      ans: {
        text: "This is a test answer",
        ans_by: "dummyUserId",
        ans_date_time: "2024-06-03",
      },
    };

    (saveAnswer as jest.Mock).mockRejectedValueOnce(
      new Error("Unexpected error")
    );

    const response = await supertest(server)
      .post("/answer/addAnswer")
      .send(mockReqBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe("Internal Server Error while adding answer");
  });
});
