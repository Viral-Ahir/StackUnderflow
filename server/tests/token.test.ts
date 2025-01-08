import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import { authenticateToken } from "../utils/tokenUtils";
import { Request, Response, NextFunction } from "express";

// Load secret key and tokens from environment variables
const secretKey = process.env.JWT_SECRET || "your_jwt_secret_key";
const invalidToken = process.env.INVALID_TOKEN || "defaultInvalidToken";
const validToken = process.env.VALID_TOKEN || "your_jwt_secret_key";

jest.mock("jsonwebtoken");

describe("authenticateToken Middleware", () => {
  const mockRequest = () => {
    const req = {} as Partial<Request>;
    req.headers = {};
    req.body = {};
    return req as Request;
  };

  const mockResponse = () => {
    const res = {} as Partial<Response>;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  const mockNext = jest.fn() as jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  it("should call next if token is valid", () => {
    const req = mockRequest();
    const res = mockResponse();
    req.headers["authorization"] = `Bearer ${validToken}`;

    (jwt.verify as jest.Mock).mockReturnValue({ id: "123" });

    authenticateToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(validToken, secretKey);
    expect(req.body.userId).toBe("123");
    expect(mockNext).toHaveBeenCalledTimes(1); // Ensure next() is called
  });

  it("should return 401 if token is missing", () => {
    const req = mockRequest();
    const res = mockResponse();

    authenticateToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Access token is missing",
    });
    expect(mockNext).not.toHaveBeenCalled(); // Ensure next() is not called
  });

  it("should return 403 if token is invalid", () => {
    const req = mockRequest();
    const res = mockResponse();
    req.headers["authorization"] = `Bearer ${invalidToken}`;

    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw new Error("Invalid token");
    });

    authenticateToken(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(invalidToken, secretKey);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid access token" });
    expect(mockNext).not.toHaveBeenCalled(); // Ensure next() is not called
  });
});
