import { REACT_APP_API_URL } from "./config";
import axios from "axios";
const VOTE_API_URL = `${REACT_APP_API_URL}/vote`;

/**
 * Posts a vote to the server.
 * @function postVote
 * @param {Object} vote - The vote data to be posted.
 * @param {string} vote.vote_type - The type of vote ("up" or "down").
 * @param {string} vote.parent_id - The ID of the parent entity (e.g., question or answer).
 * @param {string} vote.parent_type - The type of the parent entity ("question" or "answer").
 * @returns {Promise<Object|void>} The server response data if the request is successful, or `undefined` if an error occurs.
 */
const postVote = async (vote: {
  vote_type: string;
  parent_id: string;
  parent_type: string;
}) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to vote.");
      return;
    }

    const response = await axios.post(VOTE_API_URL, vote, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.error) {
      alert(response.data.error);
      return;
    }

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export { postVote };
