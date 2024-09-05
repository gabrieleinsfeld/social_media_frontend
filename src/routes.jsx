import App from "./App";
import LogIn from "./LogIn";
import Home from "./Home";
import Profile from "./Profile";
import SignUp from "./SignUp";
import AnotherProfile from "./AnotherProfile";

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
      {
        path: "/another-profile",
        element: <AnotherProfile />,
      },
    ],
  },
  {
    path: "/log-in",
    element: <LogIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
];

export default routes;
