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
      // className="question right_padding"
      className="card-wrapper rounded-[10px] p-9 sm:px-11 "
      onClick={() => {
        handleAnswer(q._id);
      }}
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            asked {getMetaData(new Date(q.ask_date_time))}
          </span>
          <>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {q.title}
            </h3>
          </>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-2">
        <QuestionTags tags={q.tags} clickTag={clickTag} />
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <div className="body-medium text-dark400_light700 flex items-center gap-1">
          {q.asked_by}
          <span className="small-regular line-clamp-1 max-sm:hidden">
            asked on {getMetaData(new Date(q.ask_date_time))}
          </span>
        </div>
        <div className="flex items-center gap-4 max-sm:flex-wrap max-sm:justify-start">
          <div className="flex items-center gap-1">
            <img
              src="/Assets/icons/message.svg"
              alt="answer count"
              className="w-4 h-4"
            />
            <p className="small-medium text-dark400_light800 flex items-center gap-1">
              {q.answers.length || 0}
              <span className="small-regular line-clamp-1 ">Answers</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <img src="/Assets/icons/eye.svg" alt="views" className="w-4 h-4" />
            <p className="small-medium text-dark400_light800 flex items-center gap-1">
              {q.views}
              <span className="small-regular line-clamp-1 ">Views</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
