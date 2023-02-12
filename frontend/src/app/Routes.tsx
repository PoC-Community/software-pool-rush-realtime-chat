import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";
import Layout from "../components/Layout";
import Home from "src/pages/Home";
import { PrivateRoutes, PublicRoutes } from "src/components/RoutesGuards";
import About from "src/pages/About";
import Profile from "src/pages/Profile";
import Rooms from "src/pages/Rooms";
import Friends from "src/pages/Friends";
import Room from "src/pages/Room";

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <RouterRoutes>
      <Route element={<Layout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/">
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<Room />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<PublicRoutes />}>
          <Route element={<Welcome />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Route>
      </Route>
    </RouterRoutes>
  </BrowserRouter>
);

export default Routes;
