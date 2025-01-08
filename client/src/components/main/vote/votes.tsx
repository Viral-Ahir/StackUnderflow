import React from "react";
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
}: VotesProps) {
  const { handleVote } = useVotes(parentId, parentType, setUpdateState);

  return (
    <div className="votesContainer">
      <button className="upvoteButton" onClick={() => handleVote("up")}>
        Upvote
      </button>
      <div className="votesCount">{voteCount} votes</div>
      <button className="downvoteButton" onClick={() => handleVote("down")}>
        Downvote
      </button>
    </div>
  );
}
