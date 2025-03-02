import "./orderButtonView.css";
import { MessageFunctionType } from "../../../../../types/functionTypes";

/**
 * Props type for the OrderButton component
 * message - string
 * setQuestionOrder - MessageFunctionType
 */
interface OrderButtonProps {
  message: string;
  setQuestionOrder: MessageFunctionType;
}

/**
 * Component to render the order buttons of newest, active, and unanswered
 * @param props - message, setQuestionOrder
 * @returns - OrderButton component
 */
const OrderButton = ({ message, setQuestionOrder }: OrderButtonProps) => {
  return (
    <button
      className="inline-flex items-center justify-center text-sm font-medium transition-colors h-10 bg-light-800 text-dark-500 hover:text-primary-500 hover:bg-primary-100 body-medium rounded-lg px-6 py-3 capitalize shadow-none"
      onClick={() => {
        setQuestionOrder(message);
      }}
    >
      {message}
    </button>
  );
};

export default OrderButton;
