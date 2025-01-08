import express from "express";
import { ErrorWrapped, getTagCountMap } from "../models/application";

const router: express.Router = express.Router();

/**
 * Get all tags with the number of questions associated with them.
 * @param req - Request object
 * @param res - Response object
 * @returns - All tags with the number of questions associated with them
 */
const getTagsWithQuestionNumberHandler = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tagCountMap: ErrorWrapped<Map<string, number>> | null =
      await getTagCountMap();

    if (!tagCountMap) {
      return res.status(500).send("Internal Server Error");
    }

    if ("error" in tagCountMap) {
      throw new Error(tagCountMap.error);
    }
    const response = Array.from(tagCountMap.entries()).map(([name, qcnt]) => ({
      name,
      qcnt,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching tag count map:", error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Route to get all tags with the number of questions associated with them.
 */
router.get("/getTagsWithQuestionNumber", getTagsWithQuestionNumberHandler);

export default router;
