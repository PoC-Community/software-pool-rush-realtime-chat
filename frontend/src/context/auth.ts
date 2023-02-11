import { createContext } from "react";

import Auth from "../types/Auth";

const AuthContext = createContext({
  auth: {} as Auth,
  setAuth: (_: Partial<Auth>) => {},
});

export default AuthContext;
