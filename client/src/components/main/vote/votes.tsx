import React, { useEffect, useState } from "react";
import "./votes.css";
import useVotes from "../../../hooks/useVotes";

/**
 * Props for the Votes component.
 *
 * @typedef {Object} VotesProps
 * @property {number} voteCount - The number of votes.
 * @property {string} parentId - The ID of the parent object.
 * @property {string} parentType - The type of the parent object.
 * @property {React.Dispatch<React.SetStateAction<number>>} [setUpdateState] - Optional state update function.
 */
interface VotesProps {
  voteCount: number;
  parentId: string;
  parentType: string;
  handleSaveQuestion?: () => void;
  handleUnsaveQuestion?: () => void;
  isSaved?: boolean;
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Votes Component
 *
 * @component
 * @param {VotesProps} props - Props passed to the Votes component.
 * @returns {JSX.Element} The rendered Votes component.
 *
 * @description
 * This component displays the number of votes for a parent object and provides options to upvote or downvote.
 */
export default function Votes({
  voteCount,
  parentId,
  parentType,
  setUpdateState,
  isSaved,
  handleSaveQuestion,
  handleUnsaveQuestion,
}: VotesProps) {
  const { handleVote } = useVotes(parentId, parentType, setUpdateState);
  const [saved, setSaved] = useState<boolean>(isSaved ?? false);

  useEffect(() => {
    setSaved(isSaved ?? false);
  }, [isSaved]);

  const toggleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save or unsave questions.");
      return;
    }
    if (saved) {
      handleUnsaveQuestion && handleUnsaveQuestion();
    } else {
      handleSaveQuestion && handleSaveQuestion();
    }
    setSaved(!saved);
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="flex-center gap-2.5">
          <button
            className="inline-flex gap-2 items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 subtle-medium background-light800_dark300 rounded-md border-none px-3 py-2"
            onClick={() => handleVote("up")}
          >
            <div>Upvote</div>
            <img
              src="/assets/icons/upvote.svg"
              alt="upvote"
              className="cursor-pointer"
            />
          </button>
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">{voteCount}</p>
          </div>
          <button
            className="inline-flex gap-2 items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 subtle-medium background-light800_dark300 rounded-md border-none px-3 py-2"
            onClick={() => handleVote("down")}
          >
            <img
              src="/assets/icons/downvote.svg"
              alt="upvote"
              className="cursor-pointer"
            />
            <div>Downvote</div>
          </button>
        </div>
        {parentType === "question" && (
          <img
            src={
              saved
                ? "/assets/icons/star-filled.svg"
                : "/assets/icons/star-red.svg"
            }
            width={18}
            height={18}
            alt="star"
            className="cursor-pointer"
            onClick={toggleSave}
          />
        )}
      </div>
    </>
  );
}
