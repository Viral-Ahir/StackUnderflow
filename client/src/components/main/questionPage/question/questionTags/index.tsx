import React from "react";
import { Tag } from "../../../../../types/entityTypes";
import { ClickTagFunctionType } from "../../../../../types/functionTypes";

/**
 * Props type for the QuestionTags component
 * tags - Tag[], an array of tags
 * clickTag - ClickTagFunctionType, a function that takes a tag name string as an argument
 */
interface QuestionTagsProps {
  tags: Tag[];
  clickTag: ClickTagFunctionType;
}

/**
 * Component to render the tags of a question
 * @param props - tags, clickTag
 * @returns - QuestionTags component
 */
const QuestionTags: React.FC<QuestionTagsProps> = ({ tags, clickTag }) => {
  return (
    <div className="question_tags">
      {tags.map((tag, idx) => (
        <button
          key={idx}
          className="question_tag_button"
          onClick={(e) => {
            e.stopPropagation();
            clickTag(tag.name);
          }}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default QuestionTags;
