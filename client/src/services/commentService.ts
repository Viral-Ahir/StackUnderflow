import { REACT_APP_API_URL } from "./config";
import axios from "axios";

const COMMENT_API_URL = `${REACT_APP_API_URL}/comment`;

/**
 * Posts a comment to the server.
 * @function postComment
 * @param {Object} comment - The comment data to be posted.
 * @param {string} comment.description - The content of the comment.
 * @param {string} comment.parentId - The ID of the parent entity (e.g., question or answer).
 * @param {string} comment.parentType - The type of the parent entity ("question" or "answer").
 * @returns {Promise<Object|void>} The server response data if the request is successful, or `undefined` if an error occurs.
 */
const postComment = async (comment: {
  description: string;
  parentId: string;
  parentType: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to post comments.");
      return;
    }

    if (!comment.description) {
      alert("Comment cannot be empty.");
      return;
    }

    const response = await axios.post(COMMENT_API_URL, comment, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

export { postComment };
