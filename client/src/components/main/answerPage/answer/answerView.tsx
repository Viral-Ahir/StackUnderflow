import { CommentType, UserType } from "../../../../types/entityTypes";
import Comments from "../../comments/comments";
import "./answerView.css";
import Votes from "../../vote/votes";

/**
 * Interface for the Answer component
 * text: Answer text - the text of the answer
 * ansBy: Answered by - the author of the answer
 * meta: Meta data for the answer
 * aid: Answer ID - the ID of the answer
 * comments: Comments - the comments of the answer
 * voteCount: Vote count - the number of votes for the answer
 * upvotesBy: Upvotes by - the users who upvoted the answer
 * downvotesBy: Downvotes by - the users who downvoted the answer
 * setUpdateState: Set update state - the state to update the component
 * */
interface AnswerProps {
  text: string;
  ansBy: string;
  meta: string;
  aid: string;
  comments: CommentType[];
  voteCount: number;
  upvotesBy: UserType[];
  downvotesBy: UserType[];
  setUpdateState?: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * The view of Answer component
 * @param text Answer text
 * @param ansBy Answered by
 * @param meta Meta data for the answer
 * @param aid Answer ID
 * @param comments Comments
 * @param voteCount Vote count
 * @param setUpdateState Set update state
 * @returns Answer component
 */
const Answer = ({
  text,
  ansBy,
  meta,
  aid,
  comments,
  setUpdateState,
  voteCount,
}: AnswerProps) => {
  return (
    <div className="answerWrapper">
      <div className="answer right_padding">
        <Votes
          voteCount={voteCount}
          parentId={aid}
          parentType={"answer"}
          setUpdateState={setUpdateState}
        />
        <div id="answerText" className="answerText">
          {text}
        </div>
        <div className="answerAuthor">
          <div className="answer_author">{ansBy}</div>
          <div className="answer_question_meta">{meta}</div>
        </div>
      </div>
      <div id="questionComments" className="questionComments">
        <Comments
          commentList={comments}
          parentId={aid}
          parentType={"answer"}
          setUpdateState={setUpdateState}
        />
      </div>
    </div>
  );
};

export default Answer;
