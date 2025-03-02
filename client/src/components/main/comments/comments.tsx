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
        <div
          key={index}
          className="text-s transition-colors w-full min-w-full comment border-b"
        >
          <div>{comment.text}</div>
          <div> {comment.commented_by.username}</div>
        </div>
      ))}
      <div className="commentInput">
        <input
          type="text"
          className="h-6 rounded-md border-input  px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 mr-2 no-focus light-border-2 text-light700 min-h-[30px] border"
          placeholder="Add a comment"
          value={commentDescription}
          onChange={(e) => setCommentDescription(e.target.value)}
        />
        <button
          className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-8 btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 shadow-none"
          onClick={handlePostCommentClick}
        >
          Post
        </button>
      </div>
    </div>
  );
}
