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
    <div className="flex justify-between gap-3">
      {tags.map((tag, idx) => (
        <button
          key={idx}
          className="inline-flex items-center border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary hover:bg-primary/80 subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase"
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
