import {
  PageSetterFunctionType,
  ClickTagFunctionType,
  IdFunctionType,
  VoidFunctionType,
  OrderFunctionType,
} from "../../../types/functionTypes";

/**
 * Constructor type for the PageClass
 * search - string, The search query
 * title - string, The title of the page
 * setQuestionPage - PageSetterFunctionType, Function to set the page
 * questionOrder - string, The order of the questions
 * setQuestionOrder - OrderFunctionType, Function to set the order of the questions
 * qid - string, The question id
 * handleQuestions - VoidFunctionType, Function to handle questions
 * handleTags - VoidFunctionType, Function to handle tags
 * handleAnswer - IdFunctionType, Function to handle answer
 * clickTag - ClickTagFunctionType, Function to handle tag click
 * handleNewQuestion - VoidFunctionType, Function to handle new question click
 * handleNewAnswer - VoidFunctionType, Function to handle new answer click
 */
export interface PageClassProps {
  search: string;
  title: string;
  setQuestionPage: PageSetterFunctionType;
  questionOrder: string;
  setQuestionOrder: OrderFunctionType;
  qid: string;
  handleQuestions: VoidFunctionType;
  handleTags: VoidFunctionType;
  handleAnswer: IdFunctionType;
  clickTag: ClickTagFunctionType;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;
}

/**
 * Base class for all pages
 * It has all the functions that are common to all pages
 */
class PageClass {
  search: string;
  title: string;
  setQuestionPage: PageSetterFunctionType;
  questionOrder: string;
  setQuestionOrder: OrderFunctionType;
  qid: string;
  handleQuestions: VoidFunctionType;
  handleTags: VoidFunctionType;
  handleAnswer: IdFunctionType;
  clickTag: ClickTagFunctionType;
  handleNewQuestion: VoidFunctionType;
  handleNewAnswer: VoidFunctionType;

  /**
   * Constructor for the PageClass
   * @param props - The properties of the PageClass
   * */
  constructor(props: PageClassProps) {
    this.search = props.search;
    this.title = props.title;
    this.setQuestionPage = props.setQuestionPage;
    this.questionOrder = props.questionOrder;
    this.setQuestionOrder = props.setQuestionOrder;
    this.qid = props.qid;
    this.handleQuestions = props.handleQuestions;
    this.handleTags = props.handleTags;
    this.handleAnswer = props.handleAnswer;
    this.clickTag = props.clickTag;
    this.handleNewQuestion = props.handleNewQuestion;
    this.handleNewAnswer = props.handleNewAnswer;
  }

  /**
   * Method to get the content of the page
   * @returns - The content of the page
   */
  getContent(): React.ReactNode {
    return null;
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "";
  }
}

export default PageClass;
