import "./sideBarNavView.css";
import { VoidFunctionType } from "../../../types/functionTypes";

/**
 * Props type for the SideBarNav component
 * selected - the selected menu item
 * handleQuestions - a function to handle the click event on the questions menu item
 * handleTags - a function to handle the click event on the tags menu item
 * handleSaves - a function to handle the click event on the saves menu item
 */
interface SideBarNavProps {
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
const SideBarNav = ({
  selected = "",
  handleQuestions,
  handleTags,
  handleSaves,
}: SideBarNavProps) => {
  return (
    <div
      id="sideBarNav"
      className="background-light900 light-border pt-32 custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-10 shadow-light-300 max-sm:hidden lg:w-[264px]"
    >
      <div className="flex flex-1 flex-col gap-6">
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
            src="/assets/icons/home.svg"
            alt="Questions"
            width={20}
            height={20}
            className={`${selected === "q" ? "" : "invert-colors"}`}
          />
          <p
            className={`${
              selected === "q" ? "base-bold" : "base-medium"
            }  max-lg:hidden`}
          >
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
            src="/assets/icons/tag.svg"
            alt="Tags"
            width={20}
            height={20}
            className={`${selected === "t" ? "" : "invert-colors"}`}
          />
          <p
            className={`${
              selected === "t" ? "base-bold" : "base-medium"
            }  max-lg:hidden`}
          >
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
            src="/assets/icons/star.svg"
            alt="Tags"
            width={20}
            height={20}
            className={`${selected === "s" ? "" : "invert-colors"}`}
          />
          <p
            className={`${
              selected === "s" ? "base-bold" : "base-medium"
            }  max-lg:hidden`}
          >
            Collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
