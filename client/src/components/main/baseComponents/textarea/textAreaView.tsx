import "../input/inputView.css";
import { StringFunctionType } from "../../../../types/functionTypes";

/**
 * Interface for the props of the Textarea component
 * @param title the title of the textarea
 * @param mandatory whether the textarea is mandatory
 * @param hint the hint for the textarea
 * @param id the id of the textarea
 * @param val the value of the textarea
 * @param setState the function to set the value of the textarea
 * @param err the error message for the textarea
 */
interface TextareaProps {
  title: string;
  mandatory?: boolean;
  hint?: string;
  id: string;
  val: string;
  setState: StringFunctionType;
  err?: string;
}

/**
 * Component to render a textarea field
 * @param props the props of the Textarea component
 * @returns a textarea field
 */
const Textarea = ({
  title,
  mandatory = true,
  hint,
  id,
  val,
  setState,
  err,
}: TextareaProps) => {
  return (
    <>
      <div className="input_title">
        {title}
        {mandatory ? "*" : ""}
      </div>
      {hint && <div className="input_hint">{hint}</div>}
      <textarea
        id={id}
        className="input_input"
        value={val}
        onChange={(e) => {
          setState(e.currentTarget.value);
        }}
      />
      {err && <div className="input_error">{err}</div>}
    </>
  );
};

export default Textarea;
