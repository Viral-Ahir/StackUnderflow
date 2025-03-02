import "./tagView.css";
import { ClickTagFunctionType } from "../../../../types/functionTypes";

/**
 * Props type for the Tag component
 * t  - a tag object with name and question count
 * clickTag - a function to handle the click event on the tag
 */
interface TagProps {
  t: {
    name: string;
    qcnt: number;
  };
  clickTag: ClickTagFunctionType;
}

/**
 * The component to render a tag and its questions count
 * @param props of the Tag component
 * @returns a JSX element representing a tag
 */
const Tag = ({ t, clickTag }: TagProps) => {
  return (
    <div
      className="shadow-light100_darknone background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]"
      onClick={() => {
        clickTag(t.name);
      }}
    >
      <div className="font-bold background-light800_dark400 w-fit rounded-sm px-5 py-1.5">
        <p className="text-dark300_light900"></p>
        {t.name}
      </div>
      <p className="small-medium text-dark400_light500 mt-3.5">
        <span className="body-semibold primary-text-gradient mr-2">
          {t.qcnt}+
        </span>{" "}
        Questions
      </p>
    </div>
  );
};

export default Tag;
