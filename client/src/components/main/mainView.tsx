import { ReactNode } from "react";
import "./mainView.css";
import SideBarNav from "./sideBarNav/sideBarNavView";

/**
 * Interface for the Main component
 * pageInstance: the page instance
 * commonProps: the common props to be passed to the page instances
 */
interface MainProps {
  pageInstance: { getContent: () => ReactNode; getSelected: () => string };
  commonProps: {
    search: string;
    title: string;
    handleQuestions: () => void;
    handleTags: () => void;
    handleSaves: () => void;
  };
}

/**
 * The component that renders a page of the Fake StackOverflow app
 * It uses several handler functions to set the page instance
 * The page instance is used to render the content of the page
 * @param search the search string
 * @param title the page title
 * @param setQuestionPage function to set the search string and page title
 * @returns Main component
 */
const Main = ({ pageInstance, commonProps }: MainProps) => {
  return (
    <div id="main" className="main">
      <SideBarNav
        selected={pageInstance.getSelected()}
        handleQuestions={commonProps.handleQuestions}
        handleTags={commonProps.handleTags}
        handleSaves={commonProps.handleSaves}
      />
      <div id="right_main" className="right_main">
        {pageInstance.getContent()}
      </div>
    </div>
  );
};

export default Main;