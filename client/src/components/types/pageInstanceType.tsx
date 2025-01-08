import HomePageClass from "../main/routing/home";
import TagPageClass from "../main/routing/tag";
import AnswerPageClass from "../main/routing/answer";
import NewQuestionPageClass from "../main/routing/newQuestion";
import NewAnswerPageClass from "../main/routing/newAnswer";
import ProfilePageClass from "../main/routing/profile";
import EditProfilePageClass from "../main/routing/editProfile";

export type PageInstanceType =
  | HomePageClass
  | TagPageClass
  | AnswerPageClass
  | NewQuestionPageClass
  | NewAnswerPageClass
  | ProfilePageClass
  | EditProfilePageClass;
