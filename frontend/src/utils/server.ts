import axios from "axios";
import { API_URL } from "src/Config";

export const server = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});
