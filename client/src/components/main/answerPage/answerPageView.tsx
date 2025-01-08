import { getMetaData } from "../../../tool";
import Answer from "./answer/answerView";
import AnswerHeader from "./header/headerView";
import "./answerPageView.css";
import QuestionBody from "./questionBody/questionBodyView";
import { VoidFunctionType } from "../../../types/functionTypes";
import { useAnswerPageView } from "../../../hooks/useAnswerPageView";

/**
 * Interface for the Answer Page
 * qid: The id of the question
 * handleNewQuestion: A function to handle a new question
 * handleNewAnswer: A function to handle a new answer
 */
interface AnswerPageProps {
  qid: string;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;
}

/**
 * The Answer Page component
 * @param params The id of the question, a function to handle a new question, and a function to handle a new answer
 * @returns The Answer Page
 */
const AnswerPage = ({
  qid,
  handleNewQuestion,
  handleNewAnswer,
}: AnswerPageProps) => {
  /**
   * Get the question, set the update state, check if the question is saved, and handle saving and unsaving the question using the useAnswerPageView hook
   */
  const {
    question,
    setUpdateState,
    isSaved,
    handleSaveQuestion,
    handleUnsaveQuestion,
  } = useAnswerPageView(qid);

  if (!question) {
    return null;
  }

  return (
    <>
      <AnswerHeader
        ansCount={question.answers.length}
        title={question.title}
        handleNewQuestion={handleNewQuestion}
      />
      <QuestionBody
        views={question.views}
        text={question.text}
        askby={question.asked_by}
        meta={getMetaData(new Date(question.ask_date_time))}
        handleSaveQuestion={handleSaveQuestion}
        handleUnsaveQuestion={handleUnsaveQuestion}
        isSaved={isSaved}
        comments={question.comments}
        voteCount={question.vote_count}
        upvotesBy={question.upvotes_by}
        downvotesBy={question.downvotes_by}
        id={qid}
        setUpdateState={setUpdateState}
      />
      {question.answers.map((a, idx) => (
        <Answer
          key={idx}
          text={a.text}
          ansBy={a.ans_by}
          aid={a._id}
          meta={getMetaData(new Date(a.ans_date_time))}
          comments={a.comments}
          setUpdateState={setUpdateState}
          voteCount={a.vote_count}
          upvotesBy={a.upvotes_by}
          downvotesBy={a.downvotes_by}
        />
      ))}
      <button
        className="bluebtn ansButton"
        onClick={() => {
          handleNewAnswer();
        }}
      >
        Answer Question
      </button>
    </>
  );
};

export default AnswerPage;
