import axios from "axios";
import { convertHtmlToJson } from "./convertHtmlToJson";

export const getUrlAsJson = async (url: string) => {
  const { data } = await axios.get(url);
  return await convertHtmlToJson(data);
};
