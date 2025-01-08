import React from "react";
import PageClass, { PageClassProps } from ".";
import AnswerPage from "../answerPage/answerPageView";
import { VoidFunctionType } from "../../../types/functionTypes";
/**
 * A special type for the AnswerPageClass class
 * It is a child of the PageClassProps type
 * It includes the qid, handleNewQuestion, and handleNewAnswer properties
 */
interface AnswerPageClassProps
  extends Omit<PageClassProps, "handleNewQuestion" | "handleNewAnswer"> {
  qid: string;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;
}

/**
 * A class to render the AnswerPage component
 * It extends the PageClass class
 */
export default class AnswerPageClass extends PageClass {
  qid: string;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;

  /**
   * Constructor for the AnswerPageClass
   * @param props - The properties of the AnswerPageClass
   * */
  constructor(props: AnswerPageClassProps) {
    super({
      search: props.search,
      title: props.title,
      setQuestionPage: props.setQuestionPage,
      questionOrder: props.questionOrder,
      setQuestionOrder: props.setQuestionOrder,
      qid: props.qid,
      handleQuestions: props.handleQuestions,
      handleTags: props.handleTags,
      handleAnswer: props.handleAnswer,
      clickTag: props.clickTag,
      handleNewQuestion: props.handleNewQuestion,
      handleNewAnswer: props.handleNewAnswer,
    });

    this.qid = props.qid;
    this.handleNewQuestion = props.handleNewQuestion;
    this.handleNewAnswer = props.handleNewAnswer;
  }

  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    return (
      <AnswerPage
        qid={this.qid}
        handleNewQuestion={this.handleNewQuestion}
        handleNewAnswer={this.handleNewAnswer}
      />
    );
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "";
  }
}
