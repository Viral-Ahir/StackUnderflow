import { useEffect, useState } from "react";
import { getQuestionsByFilter } from "../services/questionService";
import { QuestionResponseType } from "../types/entityTypes";

/**
 * Props for the useQuestionPage hook
 * order - order of the questions
 * search - search query
 */
interface UseQuestionPageProps {
  order: string;
  search: string;
}

/**
 * a hook to fetch questions by order button clicked and search string
 * @param order - order of the questions
 * @param search - search query
 */
export const useQuestionPage = ({ order, search }: UseQuestionPageProps) => {
  /**
   * State to hold the list of
   * questions fetched from the server
   * based on the order and search query
   * */
  const [qlist, setQlist] = useState<QuestionResponseType[]>([]);

  /**
   * Fetch the questions based on the order and search query
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getQuestionsByFilter(order, search);
        setQlist(res || []);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchData();
  }, [order, search]);

  return { qlist };
};
