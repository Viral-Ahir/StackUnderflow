import React from "react";
import PageClass from ".";
import QuestionPage from "../questionPage/questionPageView";

/**
 * A class to render the QuestionPage component
 * that renders all questions based on order and search if any
 * It extends the PageClass component
 */
export default class HomePageClass extends PageClass {
  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    return (
      <QuestionPage
        title_text={this.title}
        order={this.questionOrder.toLowerCase()}
        search={this.search}
        setQuestionOrder={this.setQuestionOrder}
        clickTag={this.clickTag}
        handleAnswer={this.handleAnswer}
        handleNewQuestion={this.handleNewQuestion}
      />
    );
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "q";
  }
}
