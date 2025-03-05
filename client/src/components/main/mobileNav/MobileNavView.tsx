import "./MobileNavView.css";
import { VoidFunctionType } from "../../../types/functionTypes";

/**
 * Props type for the SideBarNav component
 * selected - the selected menu item
 * handleQuestions - a function to handle the click event on the questions menu item
 * handleTags - a function to handle the click event on the tags menu item
 * handleSaves - a function to handle the click event on the saves menu item
 */
interface MobileNavProps {
  selected?: string;
  handleQuestions: VoidFunctionType;
  handleTags: VoidFunctionType;
  handleSaves: VoidFunctionType; // New prop for handling "Saves" menu item
}

/**
 * A component to render the side bar navigation menu
 * with links to display questions, tags, and saves
 * @param props of the SideBarNav component
 * @returns a JSX element representing the side bar navigation menu
 */
const MobileNav = ({
  selected = "",
  handleQuestions,
  handleTags,
  handleSaves,
}: MobileNavProps) => {
  return (
    <div id="MobileNav" className="flex h-full flex-col gap-6 pt-16">
      <div
        id="menu_question"
        className={`${
          selected === "q"
            ? "primary-gradient rounded-lg text-light-900"
            : "text-light900"
        } flex items-center justify-start bg-transparent p-4 gap-4`}
        onClick={() => {
          handleQuestions();
        }}
      >
        <img
          src="/Assets/icons/home.svg"
          alt="Questions"
          width={20}
          height={20}
          className={`${selected === "q" ? "" : "invert-colors"}`}
        />
        <p className={`${selected === "q" ? "base-bold" : "base-medium"}  `}>
          Questions
        </p>
      </div>
      <div
        id="menu_tag"
        className={`${
          selected === "t"
            ? "primary-gradient rounded-lg text-light-900"
            : "text-light900"
        } flex items-center justify-start bg-transparent p-4 gap-4`}
        onClick={() => {
          handleTags();
        }}
      >
        <img
          src="/Assets/icons/tag.svg"
          alt="Tags"
          width={20}
          height={20}
          className={`${selected === "t" ? "" : "invert-colors"}`}
        />
        <p className={`${selected === "t" ? "base-bold" : "base-medium"}  `}>
          Tags
        </p>
      </div>
      <div
        id="menu_tag"
        className={`${
          selected === "s"
            ? "primary-gradient rounded-lg text-light-900"
            : "text-light900"
        } flex items-center justify-start bg-transparent p-4 gap-4`}
        onClick={() => {
          handleSaves();
        }}
      >
        <img
          src="/Assets/icons/star.svg"
          alt="Tags"
          width={20}
          height={20}
          className={`${selected === "s" ? "" : "invert-colors"}`}
        />
        <p className={`${selected === "s" ? "base-bold" : "base-medium"}  `}>
          Collection
        </p>
      </div>
    </div>
  );
};

export default MobileNav;
