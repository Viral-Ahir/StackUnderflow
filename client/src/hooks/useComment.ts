import { useState } from "react";
import { postComment } from "../services/commentService";

/**
 * Custom hook to manage comment logic.
 *
 * @param parentId The ID of the parent entity (e.g., question or answer) to which the comments belong.
 * @param parentType The type of the parent entity ("question" or "answer").
 * @param setUpdateState Optional state setter to trigger re-rendering or updates.
 *
 * @returns An object containing the comment description, a function to update it, and a function to post a new comment.
 */
const useComment = (
  parentId: string,
  parentType: string,
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>
) => {
  /**
   * State to store the description of the new comment.
   */
  const [commentDescription, setCommentDescription] = useState<string>("");

  /**
   * Handles the posting of a new comment.
   * Sends the comment data to the backend and updates the state upon success.
   */
  const handlePostCommentClick = async () => {
    const commentData = {
      description: commentDescription,
      parentId: parentId,
      parentType: parentType,
    };

    const response = await postComment(commentData);
    if (response) {
      alert("Comment posted successfully");
      setCommentDescription("");
      setUpdateState && setUpdateState((curr: number) => curr + 1);
    }
  };

  return {
    commentDescription,
    setCommentDescription,
    handlePostCommentClick,
  };
};

export default useComment;
