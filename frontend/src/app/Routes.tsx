import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import { PrivateRoutes, PublicRoutes } from "src/components/RoutesGuards";
import About from "src/pages/About";
import Friends from "src/pages/Friends";
import Home from "src/pages/Home";
import Profile from "src/pages/Profile";
import Room from "src/pages/Room";
import Rooms from "src/pages/Rooms";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Welcome from "../pages/Welcome";

const Routes = (): JSX.Element => (
  <BrowserRouter>
    <RouterRoutes>
      <Route element={<Layout />}>
        <Route element={<PublicRoutes />}>
          <Route element={<Welcome />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Register />} path="/register" />
          <Route element={<Login />} path="/login" />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<Home />}>
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id/:name" element={<Room />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Route>
    </RouterRoutes>
  </BrowserRouter>
);

export default Routes;
