import React from "react";
import "./comments.css";
import useComment from "../../../hooks/useComment";
import { CommentType } from "../../../types/entityTypes";

/**
 * Props for the Comments component.
 * @property {CommentType[]} commentList - List of comments to display.
 * @property {string} parentId - The ID of the parent entity (e.g., question or answer) to which the comments belong.
 * @property {string} parentType - The type of the parent entity ("question" or "answer").
 * @property {React.Dispatch<React.SetStateAction<number>>} [setUpdateState] - Optional state setter to trigger re-rendering or updates.
 */
interface CommentsProps {
  commentList: CommentType[];
  parentId: string;
  parentType: string;
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Comments component to display and add comments to a parent entity.
 * @param {CommentsProps} props - Props passed to the Comments component.
 * @returns {JSX.Element} The rendered Comments component.
 * @description
 * This component renders a list of comments and allows the user to add new comments.
 * It updates the parent component via the optional `setUpdateState` function when a new comment is added successfully.
 */
export default function Comments({
  commentList,
  parentId,
  parentType,
  setUpdateState,
}: CommentsProps): JSX.Element {
  const { commentDescription, setCommentDescription, handlePostCommentClick } =
    useComment(parentId, parentType, setUpdateState);

  return (
    <div className="commentWrapper">
      {commentList.map((comment, index) => (
        <div key={index} className="comment">
          <div className="commentText">{comment.text}</div>
          <div className="commentUser">{comment.commented_by.username}</div>
        </div>
      ))}
      <div className="commentInput">
        <input
          type="text"
          className="commentInputBox"
          placeholder="Add a comment"
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <button className="commentButton" onClick={handlePostCommentClick}>
          Post Comment
        </button>
      </div>
    </div>
  );
}
