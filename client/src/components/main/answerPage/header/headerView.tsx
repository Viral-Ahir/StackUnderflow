import "./headerView.css";
import { VoidFunctionType } from "../../../../types/functionTypes";

/*
 * Header for the Answer page
 * Contains the number of answers, the title of the question and a button to ask a new question
 * @param ansCount The number of answers
 * @param title The title of the question
 * @param handleNewQuestion A function to handle a new question
 */
interface AnswerHeaderProps {
  ansCount: number;
  title: string;
  handleNewQuestion: VoidFunctionType;
}

/**
 * The header for the answer page
 * @param param  The number of answers, the title of the question and a function to handle a new question
 * @returns The header for the answer page
 */
const AnswerHeader = ({
  ansCount,
  title,
  handleNewQuestion,
}: AnswerHeaderProps) => {
  return (
    <div id="answersHeader" className="space_between right_padding">
      <div className="bold_title">{ansCount} answers</div>
      <div className="bold_title answer_question_title">{title}</div>
      <button
        className="bluebtn"
        onClick={() => {
          handleNewQuestion();
        }}
      >
        Ask a Question
      </button>
    </div>
  );
};

export default AnswerHeader;
