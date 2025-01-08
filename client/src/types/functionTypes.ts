/**
 * Type definitions for functions
 */

/**
 * Type definition for a function that does not return anything
 */
type VoidFunctionType = () => void;

/**
 * Type definition for a function that sets the page
 * @property search - the search string
 */
type PageSetterFunctionType = (search?: string, title?: string) => void;

/**
 * Type definition for a function that sets the page
 * @property query - the search string
 * @property title - the title of the page
 */
type QuestionsPageQueryFuntionType = (query: string, title: string) => void;

/**
 * Type definition for a function that sets the page
 * @property tagName - the tag name
 */
type ClickTagFunctionType = (tagName: string) => void;

/**
 * Type definition for a function that sets the id
 * @property id - the id
 */
type IdFunctionType = (id: string) => void;

/**
 * Type definition for a function that sets the order
 * @property order - the order
 */
type OrderFunctionType = (order: string) => void;

/**
 * Type definition for a function that sets the message
 * @property message - the message
 */
type MessageFunctionType = (message: string) => void;

/**
 * Type definition for a function that sets the question id
 * @property qid - the question id
 */
type QuestionIdFunctionType = (qid: string) => void;

/**
 * Type definition for a function that sets the string
 * @property value - the string value
 */
type StringFunctionType = (value: string) => void;

export type {
  VoidFunctionType,
  PageSetterFunctionType,
  ClickTagFunctionType,
  IdFunctionType,
  OrderFunctionType,
  MessageFunctionType,
  QuestionIdFunctionType,
  StringFunctionType,
  QuestionsPageQueryFuntionType,
};
