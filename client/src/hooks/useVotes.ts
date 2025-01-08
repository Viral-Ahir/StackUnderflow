import { postVote } from "../services/voteService";

/**
 * Custom hook to handle voting logic
 *
 * @param parentId The ID of the parent object
 * @param parentType The type of the parent object (e.g., "question" or "answer")
 * @param setUpdateState Optional state update function to trigger re-renders
 *
 * @returns An object containing the handleVote function to upvote or downvote
 */
const useVotes = (
  parentId: string,
  parentType: string,
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>
) => {
  /**
   * Handles the vote action (upvote or downvote) for the parent object.
   *
   * @param voteType The type of vote action (up or down)
   * @returns A Promise that resolves when the vote action is completed
   */
  const handleVote = async (voteType: string) => {
    const voteData = {
      vote_type: voteType,
      parent_id: parentId,
      parent_type: parentType,
    };

    const response = await postVote(voteData);

    if (response) {
      alert(`${voteType === "up" ? "Upvoted" : "Downvoted"} successfully`);
      setUpdateState && setUpdateState((curr: number) => curr + 1);
    }
  };

  return {
    handleVote,
  };
};

export default useVotes;
