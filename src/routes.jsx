import App from "./App";
import LogIn from "./LogIn";
import Home from "./Home";
import Profile from "./Profile";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
];

export default routes;
