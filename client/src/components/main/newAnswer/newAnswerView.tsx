import Form from "../baseComponents/form/formView";
import Input from "../baseComponents/input/inputView";
import Textarea from "../baseComponents/textarea/textAreaView";
import { useNewAnswer } from "../../../hooks/useNewAnswer";
import { QuestionIdFunctionType } from "../../../types/functionTypes";

/**
 * Interface for the props of the NewAnswer component
 * @prop qid - question id
 * @prop handleAnswer - function to handle the new answer
 */
interface NewAnswerProps {
  qid: string;
  handleAnswer: QuestionIdFunctionType;
}

/**
 * Component to render the form for a new answer
 * @param props - the props of the component
 * @returns a form to post a new answer
 */
const NewAnswer = ({ qid, handleAnswer }: NewAnswerProps) => {
  /**
   * State and functions for posting a new answer
   */
  const { usrn, setUsrn, text, setText, usrnErr, textErr, postAnswer } =
    useNewAnswer(qid, handleAnswer);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Add new Answer</h1>
      <div className="mt-9">
        <Form>
          <div className="space-y-2 flex w-full flex-col">
            <Input
              title={"Username"}
              id={"answerUsernameInput"}
              val={usrn}
              setState={setUsrn}
              err={usrnErr}
            />
          </div>
          <div className="space-y-2 flex w-full flex-col">
            <Textarea
              title={"Answer Text"}
              id={"answerTextInput"}
              val={text}
              setState={setText}
              err={textErr}
            />
          </div>
          <div>
            <button
              className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 primary-gradient mb-5 w-fit !text-light-900"
              onClick={postAnswer}
            >
              Post Answer
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewAnswer;
