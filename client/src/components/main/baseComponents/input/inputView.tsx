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
      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-dark400_light800">
        {title}
        {mandatory ? <span className="text-primary-500"> *</span> : ""}
      </div>

      <input
        id={id}
        className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-3.5 no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark400_light700 min-h-[56px] border"
        type="text"
        value={val}
        onInput={(e) => {
          setState(e.currentTarget.value);
        }}
      />
      {hint && (
        <div className="text-sm body-regular mt-2.5 text-light-500">{hint}</div>
      )}
      {err && <div className="text-sm font-medium text-red-500">{err}</div>}
    </>
  );
};

export default Input;
