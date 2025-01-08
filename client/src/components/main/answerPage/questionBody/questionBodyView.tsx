import "./questionBodyView.css";
import { useState, useEffect } from "react";
import Comments from "../../comments/comments";
import Votes from "../../vote/votes";
import { CommentType } from "../../../../types/entityTypes";

/**
 * Props for QuestionBody component
 * @param views: number - number of views
 * @param text: string - question text
 * @param askby: string - username of the user who asked the question
 * @param meta: string - metadata about the question
 * @param handleSaveQuestion: () => void - function to save the question
 * @param handleUnsaveQuestion: () => void - function to unsave the question
 * @param isSaved: boolean - whether the question is saved by the user
 * @param comments: CommentType[] - list of comments on the question
 * @param voteCount: number - number of votes on the question
 * @param upvotesBy: string[] - list of usernames who upvoted the question
 * @param downvotesBy: string[] - list of usernames who downvoted the question
 * @param id: string - id of the question
 * @param setUpdateState?: React.Dispatch<React.SetStateAction<number>> - function to update the state
 */
interface QuestionBodyProps {
  views: number;
  text: string;
  askby: string;
  meta: string;
  handleSaveQuestion: () => void;
  handleUnsaveQuestion: () => void;
  isSaved: boolean;
  comments: CommentType[];
  voteCount: number;
  upvotesBy: string[];
  downvotesBy: string[];
  id: string;
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>;
}

const QuestionBody = ({
  views,
  text,
  askby,
  meta,
  handleSaveQuestion,
  handleUnsaveQuestion,
  isSaved,
  comments,
  voteCount,
  upvotesBy,
  downvotesBy,
  id,
  setUpdateState,
}: QuestionBodyProps) => {
  /**
   * State to keep track of whether the question is saved by the user
   */
  const [saved, setSaved] = useState<boolean>(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const toggleSave = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save or unsave questions.");
      return;
    }
    if (saved) {
      handleUnsaveQuestion();
    } else {
      handleSaveQuestion();
    }
    setSaved(!saved);
  };

  return (
    <div id="questionWrapper1" className="questionWrapper">
      <div id="questionBody" className="questionBody right_padding">
        <Votes
          voteCount={voteCount}
          parentId={id}
          parentType={"question"}
          setUpdateState={setUpdateState}
        />
        <div className="bold_title answer_question_view">{views} views</div>
        <div className="answer_question_text">{text}</div>
        <div className="answer_question_right">
          <div className="question_author">{askby}</div>
          <div className="answer_question_meta">asked {meta}</div>
        </div>
        <button className="save-button" onClick={toggleSave}>
          {saved ? "Unsave Question" : "Save Question"}
        </button>
      </div>
      <div id="questionComments" className="questionComments">
        <Comments
          commentList={comments}
          parentId={id}
          parentType={"question"}
          setUpdateState={setUpdateState}
        />
      </div>
    </div>
  );
};

export default QuestionBody;
