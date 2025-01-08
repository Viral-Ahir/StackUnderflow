import { useState } from "react";
import Header from "./header";
import Main from "./main/mainView";
import HomePageClass from "./main/routing/home";
import TagPageClass from "./main/routing/tag";
import AnswerPageClass from "./main/routing/answer";
import NewQuestionPageClass from "./main/routing/newQuestion";
import NewAnswerPageClass from "./main/routing/newAnswer";
import ProfilePageClass from "./main/routing/profile";
import EditProfilePageClass from "./main/routing/editProfile";
import { PageInstanceType } from "./types/pageInstanceType";

/**
 * The main component for the Fake StackOverflow app
 * defines the search state and the main title state
 * @returns FakeStackOverflow component
 */
const FakeStackOverflow = () => {
  /**
   * State variables for search and title
   */
  const [search, setSearch] = useState<string>("");
  const [title, setMainTitle] = useState<string>("All Questions");

  /**
   * Function to set the question page
   */
  const setQuestionPage = (search = "", title = "All Questions"): void => {
    setSearch(search);
    setMainTitle(title);
    setPageInstance(new HomePageClass(commonProps));
  };

  /**
   * State variables for question order and question id
   */
  const [questionOrder, setQuestionOrder] = useState("newest");

  /**
   * State variable for question id
   */
  const [qid, setQid] = useState("");

  /**
   * Functions to handle different page navigations
   */
  const handleQuestions = () => {
    setQuestionPage();
    setPageInstance(new HomePageClass(commonProps));
  };

  /**
   * Function to handle tags
   */
  const handleTags = () => {
    setPageInstance(new TagPageClass(commonProps));
  };

  /**
   * Function to handle answers
   * @param qid - question id
   */
  const handleAnswer = (qid: string) => {
    setQid(qid);
    setPageInstance(new AnswerPageClass(commonProps));
  };

  /**
   * Function to handle tag clicks
   * @param tname - tag name
   */
  const clickTag = (tname: string) => {
    setQuestionPage("[" + tname + "]", tname);
    setPageInstance(new HomePageClass(commonProps));
  };

  /**
   * Functions to handle different page navigations
   */
  const handleNewQuestion = () => {
    setPageInstance(new NewQuestionPageClass(commonProps));
  };

  /**
   * Function to handle new answers
   */
  const handleNewAnswer = () => {
    setPageInstance(new NewAnswerPageClass(commonProps));
  };

  /**
   * Function to handle profile navigation
   */
  const handleProfile = () => {
    setPageInstance(new ProfilePageClass(commonProps));
  };

  /**
   * Function to handle edit profile navigation
   */
  const handleEditProfile = () => {
    setPageInstance(new EditProfilePageClass(commonProps));
  };

  /**
   * Function to handle saves navigation
   */
  const handleSaves = () => {
    setPageInstance(new ProfilePageClass(commonProps));
  };

  /**
   * Common props for all the
   * page instances
   */
  const commonProps = {
    search,
    title,
    setQuestionPage,
    questionOrder,
    setQuestionOrder,
    qid,
    handleQuestions,
    handleTags,
    handleAnswer,
    clickTag,
    handleNewQuestion,
    handleNewAnswer,
    handleProfile,
    handleEditProfile,
    handleSaves,
  };

  /**
   * State variable for the page instance
   */
  const [pageInstance, setPageInstance] = useState<PageInstanceType>(
    new HomePageClass(commonProps)
  );

  pageInstance.search = search;
  pageInstance.questionOrder = questionOrder;
  pageInstance.qid = qid;

  return (
    <>
      <Header
        search={search}
        setQuestionPage={setQuestionPage}
        setPageInstance={setPageInstance}
        commonProps={commonProps}
      />
      <Main pageInstance={pageInstance} commonProps={commonProps} />
    </>
  );
};

export default FakeStackOverflow;
