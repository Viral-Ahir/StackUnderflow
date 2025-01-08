import "./headerView.css";
import OrderButton from "./orderButton/orderButtonView";
import {
  VoidFunctionType,
  MessageFunctionType,
} from "../../../../types/functionTypes";

/**
 * Props type for the QuestionHeader component
 * title_text - string
 * qcnt - number
 * setQuestionOrder - MessageFunctionType
 * handleNewQuestion - VoidFunctionType
 */
interface QuestionHeaderProps {
  title_text: string;
  qcnt: number;
  setQuestionOrder: MessageFunctionType;
  handleNewQuestion: VoidFunctionType;
}

/**
 * Returns the header portion of the page that displays all questions
 * @param props - title_text, qcnt, setQuestionOrder, handleNewQuestion
 * @returns - QuestionHeader component
 */
const QuestionHeader = ({
  title_text,
  qcnt,
  setQuestionOrder,
  handleNewQuestion,
}: QuestionHeaderProps) => {
  return (
    <div>
      <div className="space_between right_padding">
        <div className="bold_title">{title_text}</div>
        <button
          className="bluebtn"
          onClick={() => {
            handleNewQuestion();
          }}
        >
          Ask a Question
        </button>
      </div>
      <div className="space_between right_padding">
        <div id="question_count">{qcnt} questions</div>
        <div className="btns">
          {["Newest", "Active", "Unanswered"].map((m, idx) => (
            <OrderButton
              key={idx}
              message={m}
              setQuestionOrder={setQuestionOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionHeader;
