import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Layout from "../components/Layout";
import Home from "src/pages/Home";
import { PrivateRoutes, PublicRoutes } from "src/components/RoutesGuards";

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <RouterRoutes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/home" />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route element={<Welcome />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Route>
      </Route>
    </RouterRoutes>
  </BrowserRouter>
);

export default Routes;
