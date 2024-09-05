import "./styles/sign-in.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "./actions/userActions";
const LogIn = () => {
  const dispatch = useDispatch();
  const { data, token, error } = useSelector((state) => state.user);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(data, token);
    if (data && token) {
      setLoggedIn(true);
    }
  }, [data, token, error]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(fetchData(username, password));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div id="log-in-form">
        <span id="log-in-name">Gabegram</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            <input
              required
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <input
              required
              placeholder="Password"
              type="password"
              value={password}
              name="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </label>
          <button type="submit">Log In</button>
          <span>
            <Link to="/sign-up">Forgot Password</Link>
          </span>
        </form>
      </div>
      <div id="new-account">
        Don't have an account? <a href="/sign-up">Sign up</a>
      </div>
    </>
  );
};

export default LogIn;
