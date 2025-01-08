import "./newAnswerView.css";
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
    <Form>
      <Input
        title={"Username"}
        id={"answerUsernameInput"}
        val={usrn}
        setState={setUsrn}
        err={usrnErr}
      />
      <Textarea
        title={"Answer Text"}
        id={"answerTextInput"}
        val={text}
        setState={setText}
        err={textErr}
      />
      <div className="btn_indicator_container">
        <button className="form_postBtn" onClick={postAnswer}>
          Post Answer
        </button>
        <div className="mandatory_indicator">* indicates mandatory fields</div>
      </div>
    </Form>
  );
};

export default NewAnswer;
