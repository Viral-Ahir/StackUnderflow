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
      className="tagNode"
      onClick={() => {
        clickTag(t.name);
      }}
    >
      <div className="tagName">{t.name}</div>
      <div>{t.qcnt} questions</div>
    </div>
  );
};

export default Tag;
