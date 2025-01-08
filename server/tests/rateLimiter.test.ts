import request from "supertest";
import express from "express";
import { appRateLimiter } from "../sanitizers/rateLimiter";

const app = express();
app.use(express.json());
app.use(appRateLimiter);

// Example route for testing
app.get("/profile", (req, res) => {
  res.status(200).json({ message: "Profile endpoint hit successfully." });
});

describe("Rate Limiter Middleware", () => {
  beforeAll(() => {
    process.env.NODE_ENV = "test_2";
  });

  afterAll(() => {
    delete process.env.NODE_ENV;
  });

  it("should allow up to 200 requests within 2 minutes", async () => {
    for (let i = 0; i < 200; i++) {
      const response = await request(app).get("/profile");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Profile endpoint hit successfully.");
    }
  });

  it("should block requests after exceeding the limit", async () => {
    // The 201st request should fail
    const response = await request(app).get("/profile");
    expect(response.status).toBe(429);
    expect(response.body.message).toBe(
      "Too many requests to the profile endpoint, please try again later."
    );
  });

  it("should skip rate limiting in test environment", async () => {
    process.env.NODE_ENV = "test"; // Simulate test environment
    for (let i = 0; i < 205; i++) {
      const response = await request(app).get("/profile");
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Profile endpoint hit successfully.");
    }
  });
});
