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
    <div id="sideBarNav" className="sideBarNav">
      <div
        id="menu_question"
        className={`menu_button ${selected === "q" ? "menu_selected" : ""}`}
        onClick={() => {
          handleQuestions();
        }}
      >
        Questions
      </div>
      <div
        id="menu_tag"
        className={`menu_button ${selected === "t" ? "menu_selected" : ""}`}
        onClick={() => {
          handleTags();
        }}
      >
        Tags
      </div>
      <div
        id="menu_saves"
        className={`menu_button ${selected === "s" ? "menu_selected" : ""}`}
        onClick={() => {
          handleSaves();
        }}
      >
        Saves
      </div>
    </div>
  );
};

export default SideBarNav;
