import React from "react";
import PageClass, { PageClassProps } from ".";
import ProfileView from "../profile/profileView";

/**
 * A special type for the ProfilePageClass
 * It extends the PageClassProps
 */
interface ProfilePageClassProps extends PageClassProps {
  handleEditProfile: () => void;
}

/**
 * A class to render the ProfileView component
 * It extends the PageClass class
 */
export default class ProfilePageClass extends PageClass {
  handleEditProfile: () => void;

  /**
   * Constructor for the ProfilePageClass
   * @param props - The properties of the ProfilePageClass
   */
  constructor(props: ProfilePageClassProps) {
    super(props);
    this.handleEditProfile = props.handleEditProfile;
    this.handleTags = props.handleTags;
    this.handleAnswer = props.handleAnswer;
  }

  /**
   * Method to get the content of the page
   * @returns - The content of the ProfileView component
   */
  getContent(): React.ReactNode {
    return (
      <ProfileView
        handleEditProfile={this.handleEditProfile}
        clickTag={this.handleTags}
        handleAnswer={this.handleAnswer}
      />
    );
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "s";
  }
}
