import React from "react";
import PageClass from ".";
import TagPage from "../tagPage/tagPageView";

/**
 * A class to render the TagPage component
 * It extends the PageClass class
 */
export default class TagPageClass extends PageClass {
  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    return (
      <TagPage
        clickTag={this.clickTag}
        handleNewQuestion={this.handleNewQuestion}
      />
    );
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "t";
  }
}
