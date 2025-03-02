import Form from "../baseComponents/form/formView";
import Input from "../baseComponents/input/inputView";
import Textarea from "../baseComponents/textarea/textAreaView";
import { useNewQuestion } from "../../../hooks/useNewQuestion";
import { VoidFunctionType } from "../../../types/functionTypes";

/**
 * Interface for the props of NewQuestion component
 * handleQuestions - a function to render the questions including the new one
 */
interface NewQuestionProps {
  handleQuestions: VoidFunctionType;
}

/**
 * Component to render the form for a new question
 * @param props - handleQuestions function
 * @returns a form to add a new question
 */
const NewQuestion = ({ handleQuestions }: NewQuestionProps) => {
  /**
   * State and functions for posting a new question
   */
  const {
    title,
    setTitle,
    text,
    setText,
    tag,
    setTag,
    usrn,
    setUsrn,
    titleErr,
    textErr,
    tagErr,
    usrnErr,
    postQuestion,
  } = useNewQuestion(handleQuestions);

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Form>
          <div className="space-y-2 flex w-full flex-col">
            <Input
              title={"Question Title"}
              hint={
                "Be specific and imagine you're asking a question to another person"
              }
              id={"formTitleInput"}
              val={title}
              setState={setTitle}
              err={titleErr}
            />
          </div>
          <div className="space-y-2 flex w-full flex-col">
            <Textarea
              title={"Question Text"}
              hint={
                "Introduce the problem and expand on what you put in the title."
              }
              id={"formTextInput"}
              val={text}
              setState={setText}
              err={textErr}
            />
          </div>
          <div className="space-y-2 flex w-full flex-col">
            <Input
              title={"Tags"}
              hint={"Add keywords separated by whitespace"}
              id={"formTagInput"}
              val={tag}
              setState={setTag}
              err={tagErr}
            />
          </div>
          <div className="space-y-2 flex w-full flex-col">
            <Input
              title={"Username"}
              id={"formUsernameInput"}
              val={usrn}
              setState={setUsrn}
              err={usrnErr}
            />
          </div>
          <div>
            <button
              className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 primary-gradient mb-5 w-fit !text-light-900"
              onClick={postQuestion}
            >
              Post Question
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewQuestion;
