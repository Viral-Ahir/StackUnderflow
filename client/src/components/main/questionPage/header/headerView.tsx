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
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <div className="h1-bold text-dark100_light900">{title_text}</div>
        <div className="flex justify-end">
          <button
            className="primary-gradient min-h-[40px] rounded-lg px-4 py-3 !text-light-900"
            onClick={() => {
              handleNewQuestion();
            }}
          >
            Ask a Question
          </button>
        </div>
      </div>
      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        {["Newest", "Active", "Unanswered"].map((m, idx) => (
          <OrderButton
            key={idx}
            message={m}
            setQuestionOrder={setQuestionOrder}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionHeader;
