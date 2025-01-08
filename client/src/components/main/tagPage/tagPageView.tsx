import "./tagPageView.css";
import Tag from "./tag/tagView";
import { useTagPage } from "../../../hooks/useTagPage";
import {
  VoidFunctionType,
  ClickTagFunctionType,
} from "../../../types/functionTypes";

/**
 * Props type for the TagPage component
 * @param clickTag a function to handle the click event on a tag
 * @param handleNewQuestion a function to handle the click event on the new question button
 */
interface TagPageProps {
  clickTag: ClickTagFunctionType;
  handleNewQuestion: VoidFunctionType;
}

/**
 * Component to render all tags and their questions count
 * @param props of the TagPage
 * @returns a JSX element with all tags and their questions count
 */
const TagPage = ({ clickTag, handleNewQuestion }: TagPageProps) => {
  /**
   * Custom hook that returns the tag list
   */
  const { tlist } = useTagPage();

  return (
    <>
      <div className="space_between right_padding">
        <div className="bold_title">{tlist.length} Tags</div>
        <div className="bold_title">All Tags</div>
        <button className="bluebtn" onClick={handleNewQuestion}>
          Ask a Question
        </button>
      </div>
      <div className="tag_list right_padding">
        {tlist.map((t, idx) => (
          <Tag key={idx} t={t} clickTag={clickTag} />
        ))}
      </div>
    </>
  );
};

export default TagPage;
