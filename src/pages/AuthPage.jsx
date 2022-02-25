import { useEffect, useState, useMemo, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

import { apiCreateUser, apiCreateSession } from "../services/api";
import { getAxiosError } from "../services/utils";
import Page from "../components/Page";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

const AuthPage = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    const request = axios.CancelToken.source();

    async function signup() {
      try {
        const payload = {
          username,
          password,
        };
        await apiCreateUser(payload, request.token);
        appDispatch({
          type: "setMessage",
          value: {
            text: "Your account has been created. You may login now!",
            type: "success",
          },
        });
        setUsername("");
        setPassword("");
        setSubmitCount(0);
        setPage("login");
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    async function login() {
      try {
        const payload = {
          username,
          password,
        };
        const { data } = await apiCreateSession(payload, request.token);
        appDispatch({ type: "login", value: data.accessToken });
      } catch (e) {
        appDispatch({
          type: "setMessage",
          value: { text: getAxiosError(e), type: "error" },
        });
      }
    }

    if (submitCount && username && password) {
      if (page === "signup") {
        signup();
      } else {
        login();
      }
    }

    return () => request.cancel();
  }, [submitCount, page, username, password, appDispatch]);

  const isFormValid = useMemo(() => {
    if (username && password) {
      return true;
    }
    return false;
  }, [username, password]);

  function handlePageSwitch() {
    if (page === "login") {
      setPage("signup");
    } else {
      setPage("login");
    }
    setUsername("");
    setPassword("");
    setSubmitCount(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitCount((prev) => prev + 1);
  }

  return appState.isLoggedIn ? (
    <Navigate to="/my-links" />
  ) : (
    <Page title="Authenticate">
      <div className="form-container">
        <h2>{page === "signup" ? "Signup" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="akts"
            value={username}
            onChange={(e) => {
              setSubmitCount(0);
              setUsername(e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Your secret password please"
            value={password}
            onChange={(e) => {
              setSubmitCount(0);
              setPassword(e.target.value);
            }}
          />
          <div className="spacer-10"></div>
          <input
            type="submit"
            value={page === "signup" ? "Create account" : "Login"}
            disabled={!isFormValid}
          />
        </form>

        <button className="small link" onClick={handlePageSwitch}>
          Go to {page === "signup" ? "Login" : "Signup"}
        </button>
      </div>
    </Page>
  );
};

export default AuthPage;
