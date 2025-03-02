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
      <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70  text-dark400_light800">
        {title}
        {mandatory ? <span className="text-primary-500"> *</span> : ""}
      </div>

      <textarea
        id={id}
        className="flex h-10 w-full rounded-md border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-3.5 no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark400_light700 min-h-[56px] border"
        value={val}
        onChange={(e) => {
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

export default Textarea;
