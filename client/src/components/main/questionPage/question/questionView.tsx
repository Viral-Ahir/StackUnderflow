import "./questionView.css";
import { getMetaData } from "../../../../tool";
import {
  ClickTagFunctionType,
  IdFunctionType,
} from "../../../../types/functionTypes";
import { Tag, AnswerType } from "../../../../types/entityTypes";
import QuestionTags from "./questionTags";

/**
 * Props type for the Question component
 * q - object
 * clickTag - ClickTagFunctionType
 * handleAnswer - IdFunctionType
 */
interface QuestionProps {
  q: {
    _id: string;
    answers: AnswerType[];
    views: number;
    title: string;
    tags: Tag[];
    asked_by: string;
    ask_date_time: string;
  };
  clickTag: ClickTagFunctionType;
  handleAnswer: IdFunctionType;
}

/**
 * Component to render a question and its metadata
 * such as its views and tags and date time posted
 * @param props - q, clickTag, handleAnswer
 * @returns - Question component
 */
const Question = ({ q, clickTag, handleAnswer }: QuestionProps) => {
  return (
    <div
      className="question right_padding"
      onClick={() => {
        handleAnswer(q._id);
      }}
    >
      <div className="postStats">
        <div>{q.answers.length || 0} answers</div>
        <div>{q.views} views</div>
      </div>
      <div className="question_mid">
        <div className="postTitle">{q.title}</div>
        <QuestionTags tags={q.tags} clickTag={clickTag} />
      </div>
      <div className="lastActivity">
        <div className="question_author">{q.asked_by}</div>
        <div>&nbsp;</div>
        <div className="question_meta">
          asked {getMetaData(new Date(q.ask_date_time))}
        </div>
      </div>
    </div>
  );
};

export default Question;
