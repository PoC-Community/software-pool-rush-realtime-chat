import axios from "axios";
import { get } from "env-var";

export const API_URL = get("REACT_APP_API_URL").required(true).asString();
