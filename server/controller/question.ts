import express from "express";
import {
  getQuestionsByOrder,
  filterQuestionsBySearch,
  fetchAndIncrementQuestionViewsById,
  getTagIds,
  saveQuestion,
  SortOrder,
} from "../models/application";
import {
  IQuestion,
  GetQuestionByIdRequest,
  AddQuestionRequest,
  ITag,
} from "../models/types/types";
import {
  GetQuestionsRequestWithSanitizedQuery,
  sanitizeGetQuestionsInput,
} from "../sanitizers/searchInputSanitizer";

const router = express.Router();

/**
 * GET /getQuestion
 * Retrieves a list of questions based on a sort order and search filter.
 *
 * @name GetQuestions
 * @function
 * @memberof Router
 * @param {GetQuestionsRequestWithSanitizedQuery} req - The request object containing sanitized query parameters.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} Responds with a list of filtered and sorted questions.
 * @throws {Error} Sends an error message for server issues.
 */
const getQuestionsHandler = async (
  req: GetQuestionsRequestWithSanitizedQuery,
  res: express.Response
) => {
  try {
    const sortOrder: SortOrder = req.sanitizedOrder as SortOrder;
    const search: string = req.sanitizedSearch || "";
    let questions: IQuestion[] = await getQuestionsByOrder(sortOrder);
    questions = filterQuestionsBySearch(questions, search as string);

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /getQuestionById/:qid
 * Fetches a specific question by its ID and increments its view count.
 *
 * @name GetQuestionById
 * @function
 * @memberof Router
 * @param {GetQuestionByIdRequest} req - The request object containing the question ID as a parameter.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} Responds with the question details.
 * @throws {Error} Sends an error message for invalid question ID or server issues.
 */
const getQuestionByIdHandler = async (
  req: GetQuestionByIdRequest,
  res: express.Response
) => {
  const { qid } = req.params;

  try {
    const result = await fetchAndIncrementQuestionViewsById(qid);

    if (result && "error" in result) {
      return res.status(500).json({ error: result.error });
    }

    if (!result) {
      return res.status(500).json({ error: "Failed to fetch question" });
    }
    const question: IQuestion | null = result;
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching and updating question views:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /addQuestion
 * Adds a new question to the database.
 *
 * @name AddQuestion
 * @function
 * @memberof Router
 * @param {AddQuestionRequest} req - The request object containing question details.
 * @param {express.Response} res - The response object.
 * @returns {Promise<void>} Responds with the saved question or an error message.
 * @throws {Error} Sends an error message for validation errors or server issues.
 */
const addQuestionHandler = async (
  req: AddQuestionRequest,
  res: express.Response
) => {
  const { title, text, tags, asked_by, ask_date_time } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).send("Invalid question body");
  }
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res.status(400).send("Invalid question body");
  }
  if (!Array.isArray(tags) || tags.length === 0) {
    return res.status(400).send("Invalid question body");
  }
  if (!asked_by || typeof asked_by !== "string" || asked_by.trim() === "") {
    return res.status(400).send("Invalid question body");
  }
  if (!ask_date_time) {
    return res.status(400).send("Invalid question body");
  }

  try {
    const tagNames = tags.map((tag) => tag.name);
    const tagIds = await getTagIds(tagNames);

    const tagObjects: ITag[] = tagIds.map((id, index) => ({
      _id: id,
      name: tags[index].name,
    }));

    const questionToSave: IQuestion = {
      title,
      text,
      tags: tagObjects,
      asked_by,
      ask_date_time,
      answers: [],
      views: 0,
      comments: [],
      vote_count: 0,
      upvotes_by: [],
      downvotes_by: [],
    };

    const savedQuestion = await saveQuestion(questionToSave);

    if ("error" in savedQuestion) {
      return res.status(500).send("Error while saving question to database");
    }

    res.status(200).json({
      ...savedQuestion,
      _id: savedQuestion._id,
    });
  } catch (error) {
    console.error("Error while saving question:", error);
    res.status(500).send("Error while saving question to database");
  }
};

/**
 * Handler to get questions by filter
 * @route GET /getQuestion
 * @middleware sanitizeGetQuestionsInput
 */
router.get("/getQuestion", sanitizeGetQuestionsInput, getQuestionsHandler);

/**
 * Handler to get a question by ID
 * @route GET /getQuestionById/:qid
 */
router.get("/getQuestionById/:qid", getQuestionByIdHandler);

/**
 * Handler to add a question
 * @route POST /addQuestion
 */
router.post("/addQuestion", addQuestionHandler);

export default router;
