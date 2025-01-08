const mockingoose = require("mockingoose");
import request from "supertest";
const app = require("../server");
import User from "../models/user";
import bcrypt from "bcrypt";
import { Server } from "http";
import mongoose from "mongoose";

// Define mock user data
let mockUser: object;
let server: Server;

beforeAll(async () => {
  // Hash the password before running tests
  mockUser = {
    _id: "507f191e810c19729de860ea",
    username: "existinguser",
    email: "existinguser@example.com",
    password: await bcrypt.hash("password123", 10), // Hash the password
  };
});

describe("User Registration and Login", () => {
  beforeEach(() => {
    server = require("../server");
    mockingoose.resetAll();
  });

  afterEach(async () => {
    server.close();
    await mongoose.disconnect();
  });

  // Test for invalid 'username' and 'password' (not strings)
  test("should return 400 if 'username' or 'password' is not a string", async () => {
    const response = await request(app).post("/auth/login").send({
      username: 12345, // Invalid username (not a string)
      password: true, // Invalid password (not a string)
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid input: 'username' and 'password' must be strings."
    );
  });

  // Test for invalid username format (non-alphanumeric)
  test("should return 400 if 'username' contains invalid characters", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "invalid@user!", // Invalid username
      email: "validemail@example.com",
      password: "ValidPass123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid username: Must be 3-30 characters long and contain only alphanumeric characters or underscores."
    );
  });

  // Test for username length less than 3 characters
  test("should return 400 if 'username' is too short", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "ab", // Too short
      email: "validemail@example.com",
      password: "ValidPass123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid username: Must be 3-30 characters long and contain only alphanumeric characters or underscores."
    );
  });

  // Test for username length greater than 30 characters
  test("should return 400 if 'username' is too long", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "a".repeat(31), // Too long
        email: "validemail@example.com",
        password: "ValidPass123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid username: Must be 3-30 characters long and contain only alphanumeric characters or underscores."
    );
  });

  // Test for invalid password format (contains spaces)
  test("should return 400 if 'password' contains spaces", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "validUsername",
      email: "validemail@example.com",
      password: "invalid password", // Contains spaces
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid password: Must be 8-50 characters long and cannot contain spaces."
    );
  });

  // Test for password length less than 8 characters
  test("should return 400 if 'password' is too short", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "validUsername",
      email: "validemail@example.com",
      password: "short", // Too short
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid password: Must be 8-50 characters long and cannot contain spaces."
    );
  });

  // Test for password length greater than 50 characters
  test("should return 400 if 'password' is too long", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({
        username: "validUsername",
        email: "validemail@example.com",
        password: "a".repeat(51), // Too long
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid password: Must be 8-50 characters long and cannot contain spaces."
    );
  });

  // Test for successful user registration
  test("should register a new user successfully", async () => {
    // Mock the User model to return null for findOne (no existing user)
    mockingoose(User).toReturn(null, "findOne");
    // Mock the User model to simulate saving a new user
    mockingoose(User).toReturn({ username: "newuser123" }, "save");

    const response = await request(app).post("/auth/register").send({
      username: "newuser123",
      email: "newuser123@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Registration successful");
  });

  // Test for duplicate user registration
  test("should fail to register with an existing email or username", async () => {
    // Mock the User model to simulate an existing user
    mockingoose(User).toReturn(mockUser, "findOne");

    const response = await request(app).post("/auth/register").send({
      username: "existinguser",
      email: "existinguser@example.com",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email or Username already exists");
  });

  // Test for successful login
  test("should log in successfully with valid credentials", async () => {
    // Mock the User model to simulate an existing user with a hashed password
    mockingoose(User).toReturn(mockUser, "findOne");

    const response = await request(app).post("/auth/login").send({
      username: "existinguser",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  // Test for login with incorrect password
  test("should fail to log in with an incorrect password", async () => {
    // Mock the User model to simulate an existing user with a hashed password
    mockingoose(User).toReturn(mockUser, "findOne");

    const response = await request(app).post("/auth/login").send({
      username: "existinguser",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Incorrect password");
  });

  // Test for login with non-existent account
  test("should fail to log in with a non-existent account", async () => {
    // Mock the User model to return null for findOne (user does not exist)
    mockingoose(User).toReturn(null, "findOne");

    const response = await request(app).post("/auth/login").send({
      username: "nonexistentuser",
      password: "password123",
    });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Account does not exist");
  });

  // Test for missing fields during registration
  test("should return error if required fields are missing during registration", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "newuser123",
      email: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  // Test for login catch block
  test("should handle error during login", async () => {
    // Mock the User model to throw an error
    mockingoose(User).toReturn(new Error("Database error"), "findOne");

    const response = await request(app).post("/auth/login").send({
      username: "existinguser",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("An error occurred during login");
    expect(response.body.error).toBe("Database error");
  });

  // Test for registration catch block
  test("should handle error during registration", async () => {
    // Mock the User model to throw an error
    mockingoose(User).toReturn(new Error("Database error"), "save");

    const response = await request(app).post("/auth/register").send({
      username: "newuser123",
      email: "newuser123@example.com",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Registration failed");
    expect(response.body.error).toBe("Database error");
  });

  // Test for missing email during registration when requireEmail is true
  test("should return 400 if email is missing during registration", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "validUsername",
      password: "ValidPass123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("All fields are required");
  });

  // Test for invalid email (not a string) during registration
  test("should return 400 if 'email' is not a string during registration", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "validUsername",
      email: 12345, // Invalid email (not a string)
      password: "ValidPass123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid input: 'email' must be a string."
    );
  });

  // Test for invalid email format during registration
  test("should return 400 if 'email' has an invalid format", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "validUsername",
      email: "invalidEmail@", // Invalid email format
      password: "ValidPass123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid email: Must be a valid email address."
    );
  });

  // Test for valid email during registration when requireEmail is true
  test("should register a new user successfully with a valid email", async () => {
    // Mock the User model to return null for findOne (no existing user)
    mockingoose(User).toReturn(null, "findOne");
    // Mock the User model to simulate saving a new user
    mockingoose(User).toReturn({ username: "newuser123" }, "save");

    const response = await request(app).post("/auth/register").send({
      username: "newuser123",
      email: "newuser123@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Registration successful");
  });
});
