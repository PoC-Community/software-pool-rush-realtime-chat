import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "src/context/auth";

const PrivateRoutes = (): JSX.Element => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthed ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoutes = (): JSX.Element => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthed ? <Navigate to="/rooms" /> : <Outlet />;
};

export { PrivateRoutes, PublicRoutes };
