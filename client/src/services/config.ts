import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

/**
 * The URL of the API
 */
const REACT_APP_API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

/**
 * Function to handle the response from the server
 * @param res the response from the server
 * @returns the response from the server.
 */
const handleRes = (res: AxiosResponse): AxiosResponse => {
  return res;
};

/**
 * Function to handle the error from the server
 * @param err the error from the server
 * @returns the error from the server
 */
const handleErr = (err: AxiosError): Promise<never> => {
  console.error(err);
  return Promise.reject(err);
};

const api = axios.create({ withCredentials: true });

/**
 * Interceptor to handle the request
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
  (error: AxiosError): Promise<never> => handleErr(error)
);

/**
 * Interceptor to handle the response
 */
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => handleRes(response),
  (error: AxiosError): Promise<never> => handleErr(error)
);

export { REACT_APP_API_URL, api };
