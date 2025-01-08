import React from "react";
import PageClass from ".";
import NewQuestion from "../newQuestion/newQuestionView";

/**
 * A class to render the NewQuestion component
 * It extends the PageClass class
 */
export default class NewQuestionPageClass extends PageClass {
  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    console.log(this);
    return <NewQuestion handleQuestions={this.handleQuestions} />;
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   * */
  getSelected(): string {
    return "";
  }
}
