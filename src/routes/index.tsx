import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "@/configs/routes";
import Home from "@/components/Home";
import PrivateRoute from "@/components/PrivateRoute";
import Explore from "@/components/Explore";
import Register from "@/components/Auth/Register";
import Login from "@/components/Auth/Login";
import Profile from "@/components/Profile";
import Feed from "@/components/Feed";
import CreatePost from "@/components/CreatePost";
import NotFound from "@/components/NotFound";
import Landing from "@/components/Landing";

const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: <Landing />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.EXPLORE,
        element: <PrivateRoute element={<Explore />} />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.UPDATE,
        element: <PrivateRoute element={<Register isUpdating={true} />} />,
      },
      {
        path: ROUTES.PROFILE,
        element: <PrivateRoute element={<Profile />} />,
      },
      {
        path: ROUTES.FEED,
        element: <PrivateRoute element={<Feed />} />,
      },
      {
        path: ROUTES.CREATE_POST,
        element: <PrivateRoute element={<CreatePost />} />,
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
