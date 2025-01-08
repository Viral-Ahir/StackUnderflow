import "./questionPageView.css";
import QuestionHeader from "./header/headerView";
import Question from "./question/questionView";
import { useQuestionPage } from "../../../hooks/useQuestionPage";
import {
  ClickTagFunctionType,
  VoidFunctionType,
  IdFunctionType,
  OrderFunctionType,
} from "../../../types/functionTypes";

/**
 * Props type for the QuestionPage component
 * title_text - string, The title of the page
 * order - string, The order of the questions
 * search - string, The search query
 * setQuestionOrder - OrderFunctionType, Function to set the order of the questions
 * clickTag - ClickTagFunctionType, Function to handle tag click
 * handleAnswer - IdFunctionType, Function to handle answer click
 * handleNewQuestion - VoidFunctionType, Function to handle new question click
 */
export interface QuestionPageProps {
  title_text?: string;
  order: string;
  search: string;
  setQuestionOrder: OrderFunctionType;
  clickTag: ClickTagFunctionType;
  handleAnswer: IdFunctionType;
  handleNewQuestion: VoidFunctionType;
}

/**
 * Component to render the page that displays all questions
 * @param props - title_text, order, search, setQuestionOrder, clickTag, handleAnswer, handleNewQuestion
 * @returns - QuestionPage component
 */
const QuestionPage = ({
  title_text = "All Questions",
  order,
  search,
  setQuestionOrder,
  clickTag,
  handleAnswer,
  handleNewQuestion,
}: QuestionPageProps) => {
  /**
   * Get the list of questions from the useQuestionPage hook
   */
  const { qlist } = useQuestionPage({ order, search });

  return (
    <>
      <QuestionHeader
        title_text={title_text}
        qcnt={qlist.length}
        setQuestionOrder={setQuestionOrder}
        handleNewQuestion={handleNewQuestion}
      />
      <div id="question_list" className="question_list">
        {qlist.map((q, idx) => (
          <Question
            q={q}
            key={idx}
            clickTag={clickTag}
            handleAnswer={handleAnswer}
          />
        ))}
      </div>
      {title_text === "Search Results" && !qlist.length && (
        <div className="bold_title right_padding">No Questions Found</div>
      )}
    </>
  );
};

export default QuestionPage;
