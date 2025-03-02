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
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-12 flex flex-wrap gap-4">
        {tlist.map((t, idx) => (
          <Tag key={idx} t={t} clickTag={clickTag} />
        ))}
      </div>
    </>
  );
};

export default TagPage;
