import { useEffect, useReducer } from "react";

import AuthContext from "src/context/auth";
import AuthType from "src/types/Auth";
import { server } from "src/utils/server";

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [auth, setAuth] = useReducer(
    (p: AuthType, n: Partial<AuthType>) => {
      if (n?.accessToken?.length) {
        localStorage.setItem("accessToken", n.accessToken);
      }
      return { ...p, ...n };
    },
    { accessToken: "", user: null, isAuthed: false, isLoading: true }
  );

  const fetchAuth = async (token: string) => {
    try {
      const res = await server.get<Partial<AuthType>>("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAuth({
        ...res.data,
        accessToken: token,
        isAuthed: true,
        isLoading: false,
      });
    } catch (e) {
      setAuth({
        accessToken: "",
        user: null,
        isAuthed: false,
        isLoading: false,
      });
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("accessToken") ?? "";

    if (token.length > 0) fetchAuth(token);
    else setAuth({ isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Auth;
