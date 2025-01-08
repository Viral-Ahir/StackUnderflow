import React from "react";
import PageClass, { PageClassProps } from ".";
import NewAnswer from "../newAnswer/newAnswerView";
import { IdFunctionType } from "../../../types/functionTypes";

/**
 * A special type for the NewAnswerPageClass class
 * It is a child of the PageClassProps type
 * It includes the qid and handleAnswer properties
 */
interface NewAnswerPageClassProps
  extends Omit<PageClassProps, "qid" | "handleAnswer"> {
  qid: string;
  handleAnswer: IdFunctionType;
}

/**
 * A class to render the NewAnswer component
 * that allows the user to add a new answer to a question
 * It extends the PageClass component
 */
export default class NewAnswerPageClass extends PageClass {
  qid: string;
  handleAnswer: IdFunctionType;

  /**
   * Constructor for the NewAnswerPageClass
   * @param props - The properties of the NewAnswerPageClass
   */
  constructor(props: NewAnswerPageClassProps) {
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
    this.handleAnswer = props.handleAnswer;
  }

  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    return <NewAnswer qid={this.qid} handleAnswer={this.handleAnswer} />;
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "";
  }
}
