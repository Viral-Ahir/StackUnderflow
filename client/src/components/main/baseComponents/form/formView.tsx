import React, { ReactNode } from "react";
import "./formView.css";

/**
 * Interface for the Form
 * children: The children of the form
 */
interface FormProps {
  children: ReactNode;
}

/**
 * Component to render a form
 * @param children The children of the form
 * @returns The form component
 */
const Form: React.FC<FormProps> = ({ children }) => {
  return <div className="form">{children}</div>;
};

export default Form;
