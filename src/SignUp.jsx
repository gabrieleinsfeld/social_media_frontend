import "./styles/sign-in.css";
import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { fetchData } from "./actions/userActions";
import { URL } from "../url";
const SignUp = () => {
  const [signnedIn, setSignnedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [completeName, setCompleteName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, completeName, email }),
      });
      const data = await response.json();
      if (data.user) {
        setSignnedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (signnedIn) {
    alert("Sign-in Successfull");
    return <Navigate to="/log-in" />;
  }
  return (
    <>
      <div id="log-in-form">
        <span id="log-in-name">Gabegram</span>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              required
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </label>
          <label htmlFor="completeName">
            <input
              required
              type="text"
              placeholder="completeName"
              name="completeName"
              value={completeName}
              onChange={(event) => {
                setCompleteName(event.target.value);
              }}
            />
          </label>
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

          <button type="submit">Sign In</button>
        </form>
      </div>
      <div
        id="new-account"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Have an account? <a href="/log-in">Log in</a>
      </div>
    </>
  );
};

export default SignUp;
