// Run this script to test your schema
// Start the MongoDB service as a background process before running the script
// Pass the URL of your MongoDB instance as the first argument (e.g., mongodb://127.0.0.1:27017/stackUnderflow)

import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Answer from "./models/answers";
import Question from "./models/questions";
import Tag from "./models/tags";
import User from "./models/user"; // Import the User model
import Profile from "./models/profile"; // Import the Profile model
import Comment from "./models/comments"; // Import the Comment model
import {
  ITag,
  IAnswer,
  IQuestion,
  IUser,
  IProfile,
  IComment,
} from "./models/types/types";
import {
  Q1_DESC,
  Q1_TXT,
  Q2_DESC,
  Q2_TXT,
  Q3_DESC,
  Q3_TXT,
  Q4_DESC,
  Q4_TXT,
  A1_TXT,
  A2_TXT,
  A3_TXT,
  A4_TXT,
  A5_TXT,
  A6_TXT,
  A7_TXT,
  A8_TXT,
  Q1_CMT,
  A1_CMT,
} from "./data/posts_strings";

const userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith("mongodb")) {
  console.log(
    "ERROR: You need to specify a valid MongoDB URL as the first argument"
  );
  process.exit(1);
}

const mongoDB = userArgs[0];

mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Helper functions to create documents
function tagCreate(name: string): Promise<ITag> {
  const tag = new Tag({ name });
  return tag.save();
}

function answerCreate(
  text: string,
  ans_by: string,
  ans_date_time: Date,
  comments: IComment[] = [],
  vote_count: number,
  upvotes_by: IUser[],
  downvotes_by: IUser[]
): Promise<IAnswer> {
  const answerDetail: IAnswer = {
    text,
    ans_by,
    ans_date_time,
    comments,
    vote_count,
    upvotes_by,
    downvotes_by,
  };

  const answer = new Answer(answerDetail);
  return answer.save();
}

function commentCreate(
  text: string,
  commented_by: IUser,
  post_date_time: Date
): Promise<IComment> {
  const commentDetail: IComment = { text, commented_by, post_date_time };
  const comment = new Comment(commentDetail);
  return comment.save();
}

function questionCreate(
  title: string,
  text: string,
  tags: ITag[],
  answers: IAnswer[],
  asked_by: string,
  ask_date_time: Date,
  views: number,
  comments: IComment[],
  vote_count: number,
  upvotes_by: IUser[],
  downvotes_by: IUser[]
): Promise<IQuestion> {
  const qstnDetail: IQuestion = {
    title,
    text,
    tags,
    answers,
    asked_by,
    ask_date_time,
    views,
    comments,
    vote_count,
    upvotes_by,
    downvotes_by,
  };
  if (ask_date_time) qstnDetail.ask_date_time = ask_date_time;
  if (views) qstnDetail.views = views;

  const qstn = new Question(qstnDetail);
  return qstn.save();
}

// Function to create user data
async function userCreate(
  username: string,
  email: string,
  password: string
): Promise<IUser> {
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  const userDetail: IUser = { username, email, password: hashedPassword };

  const user = new User(userDetail);
  return user.save();
}

// Function to create profile data
function profileCreate(
  username: string,
  bio: string,
  savedQuestions: IQuestion[] = []
): Promise<IProfile> {
  const profile = new Profile({ username, bio, savedQuestions });
  return profile.save();
}

const populate = async () => {
  try {
    // Create users
    const existingUser = await userCreate(
      "existinguser",
      "existinguser@example.com",
      "password123"
    );

    // Create tags
    const t1 = await tagCreate("react");
    const t2 = await tagCreate("javascript");
    const t3 = await tagCreate("android-studio");
    const t4 = await tagCreate("shared-preferences");
    const t5 = await tagCreate("storage");
    const t6 = await tagCreate("website");

    const ans1 = await commentCreate(A1_CMT, existingUser, new Date());
    // Create answers
    const a1 = await answerCreate(
      A1_TXT,
      "hamkalo",
      new Date("2023-11-20T03:24:42"),
      [ans1],
      0,
      [],
      []
    );
    const a2 = await answerCreate(
      A2_TXT,
      "azad",
      new Date("2023-11-23T08:24:00"),
      [],
      0,
      [],
      []
    );
    const a3 = await answerCreate(
      A3_TXT,
      "abaya",
      new Date("2023-11-18T09:24:00"),
      [],
      0,
      [],
      []
    );
    const a4 = await answerCreate(
      A4_TXT,
      "alia",
      new Date("2023-11-12T03:30:00"),
      [],
      0,
      [],
      []
    );
    const a5 = await answerCreate(
      A5_TXT,
      "sana",
      new Date("2023-11-01T15:24:19"),
      [],
      0,
      [],
      []
    );
    const a6 = await answerCreate(
      A6_TXT,
      "abhi3241",
      new Date("2023-02-19T18:20:59"),
      [],
      0,
      [],
      []
    );
    const a7 = await answerCreate(
      A7_TXT,
      "mackson3332",
      new Date("2023-02-22T17:19:00"),
      [],
      0,
      [],
      []
    );
    const a8 = await answerCreate(
      A8_TXT,
      "ihba001",
      new Date("2023-03-22T21:17:53"),
      [],
      0,
      [],
      []
    );

    const c1 = await commentCreate(Q1_CMT, existingUser, new Date());
    // Create questions
    await questionCreate(
      Q1_DESC,
      Q1_TXT,
      [t1, t2],
      [a1, a2],
      "Joji John",
      new Date("2022-01-20T03:00:00"),
      10,
      [c1],
      5,
      [existingUser],
      []
    );
    await questionCreate(
      Q2_DESC,
      Q2_TXT,
      [t3, t4, t2],
      [a3, a4, a5],
      "saltyPeter",
      new Date("2023-01-10T11:24:30"),
      121,
      [],
      0,
      [],
      [existingUser]
    );
    await questionCreate(
      Q3_DESC,
      Q3_TXT,
      [t5, t6],
      [a6, a7],
      "monkeyABC",
      new Date("2023-02-18T01:02:15"),
      200,
      [],
      0,
      [],
      []
    );
    await questionCreate(
      Q4_DESC,
      Q4_TXT,
      [t3, t4, t5],
      [a8],
      "elephantCDE",
      new Date("2023-03-10T14:28:01"),
      103,
      [],
      0,
      [],
      []
    );

    // Create profiles
    await profileCreate(
      existingUser.username,
      "This is a sample bio for existinguser.",
      []
    );

    console.log("Database populated successfully");
  } catch (err) {
    console.error("ERROR:", err);
  } finally {
    db.close();
  }
};

populate();

console.log("Processing ...");
