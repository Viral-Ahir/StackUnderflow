import React from "react";
import PageClass, { PageClassProps } from ".";
import EditProfileView from "../editProfile/editProfileView";

/**
 * A special type for the EditProfilePageClass
 * It extends the PageClassProps
 */
interface EditProfilePageClassProps extends PageClassProps {
  handleProfile: () => void;
}

/**
 * A class to render the EditProfileView component
 * It extends the PageClass class
 */
export default class EditProfilePageClass extends PageClass {
  handleProfile: () => void;

  /**
   * Constructor for the EditProfilePageClass
   * @param props - The properties of the EditProfilePageClass
   */
  constructor(props: EditProfilePageClassProps) {
    super(props);
    this.handleProfile = props.handleProfile;
  }

  /**
   * Method to get the content of the page
   * @returns - The content of the EditProfileView component
   */
  getContent(): React.ReactNode {
    return <EditProfileView handleProfile={this.handleProfile} />;
  }

  /**
   * Method to get the selected item
   * @returns - The selected item
   */
  getSelected(): string {
    return "editProfile";
  }
}
