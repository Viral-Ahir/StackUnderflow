import { getMetaData } from "../../../tool";
import "./answerPageView.css";
import { VoidFunctionType } from "../../../types/functionTypes";
import { useAnswerPageView } from "../../../hooks/useAnswerPageView";
import Votes from "../vote/votes";
import Comments from "../comments/comments";

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
      <div className="card-wrapper rounded-[10px] p-9 sm:px-11 ">
        <div className="flex-start w-full flex-col ">
          <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center justify-start gap-2">
              <p className="paragraph-semibold text-dark300_light700">
                Asked by {question.asked_by}
              </p>
            </div>
            <div className="flex justify-end">
              <Votes
                voteCount={question.vote_count}
                parentId={qid}
                parentType={"question"}
                handleSaveQuestion={handleSaveQuestion}
                handleUnsaveQuestion={handleUnsaveQuestion}
                isSaved={isSaved}
                setUpdateState={setUpdateState}
              />
            </div>
          </div>
          <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
            {question.title}
          </h2>
        </div>
        <div className="mb-8 mt-5 flex flex-wrap gap-4">
          <div className="flex-center flex-wrap  gap-1">
            <img
              src={"/assets/icons/clock.svg"}
              alt="clock icon"
              width={16}
              height={16}
              className="object-contain"
            />
            <p
              className={`small-medium text-dark400_light800 flex items-center gap-1`}
            >
              {`asked ${getMetaData(new Date(question.ask_date_time))}`}
            </p>
          </div>
          <div className="flex-center flex-wrap gap-1">
            <img
              src={"/assets/icons/message.svg"}
              alt="message"
              width={16}
              height={16}
              className="object-contain"
            />
            <p
              className={`small-medium text-dark400_light800 flex items-center gap-1`}
            >
              {`${question.answers.length} Answers`}
            </p>
          </div>
          <div className="flex-center flex-wrap gap-1">
            <img
              src={"/assets/icons/eye.svg"}
              alt="Views"
              width={16}
              height={16}
              className="object-contain"
            />
            <p
              className={`small-medium text-dark400_light800 flex items-center gap-1`}
            >
              {`${question.views} Views`}
            </p>
          </div>
        </div>
        <div className="markdown w-full min-w-full">{question.text}</div>
        <div className="mt-6 flex flex-wrap gap-2">
          {question.tags.map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>
      <div id="questionComments" className="mx-10  questionComments">
        <Comments
          commentList={question.comments}
          parentId={qid}
          parentType={"question"}
          setUpdateState={setUpdateState}
        />
      </div>
      <div className="mt-11">
        <div className="flex items-center justify-between">
          <h3 className="primary-text-gradient">
            {question.answers.length} Answers
          </h3>
        </div>
        <div>
          {question.answers.map((answer) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
                <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                  <div className="flex flex-1 items-start gap-1 sm:items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center">
                      <p className="body-semibold text-dark300_light700">
                        {answer.ans_by}{" "}
                      </p>
                      <p className="small-regular text-light400_light500 ml-2 mt-0.5 line-clamp-1">
                        answered {getMetaData(new Date(answer.ans_date_time))}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Votes
                      voteCount={answer.vote_count}
                      parentId={answer._id}
                      parentType={"answer"}
                      setUpdateState={setUpdateState}
                    />
                  </div>
                </div>
                <div className="markdown w-full min-w-full">{answer.text}</div>
              </div>

              <div id="answerComments" className="mx-10  questionComments">
                <Comments
                  commentList={answer.comments}
                  parentId={answer._id}
                  parentType={"answer"}
                  setUpdateState={setUpdateState}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
      <button
        className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 h-10 px-4 py-2 primary-gradient w-fit text-white"
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
