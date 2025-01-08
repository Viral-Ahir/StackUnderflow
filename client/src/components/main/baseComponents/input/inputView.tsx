import "./inputView.css";
import { StringFunctionType } from "../../../../types/functionTypes";

/**
 * Interface for the input component
 * @param title the title of the input field
 * @param hint the hint for the input field
 * @param id the id of the input field
 * @param mandatory whether the input field is mandatory
 * @param val the value of the input field
 * @param setState the function to set the value of the input field
 * @param err the error message for the input field
 */
interface InputProps {
  title: string;
  hint?: string;
  id: string;
  mandatory?: boolean;
  val: string;
  setState: StringFunctionType;
  err?: string;
}

/**
 * Component to render an input field
 * @param props the input properties
 * @returns the input field
 */
const Input = ({
  title,
  hint,
  id,
  mandatory = true,
  val,
  setState,
  err,
}: InputProps) => {
  return (
    <>
      <div className="input_title">
        {title}
        {mandatory ? "*" : ""}
      </div>
      {hint && <div className="input_hint">{hint}</div>}
      <input
        id={id}
        className="input_input"
        type="text"
        value={val}
        onInput={(e) => {
          setState(e.currentTarget.value);
        }}
      />
      {err && <div className="input_error">{err}</div>}
    </>
  );
};

export default Input;
