import { useEffect, useState, useMemo } from "react";

import Page from "../components/Page";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("login");
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    if (submitCount) {
      if (page === "signup") {
        console.log("Doing signup");
      } else {
        console.log("Doing login");
      }
    }
  }, [submitCount, page, username, password]);

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
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitCount((prev) => prev + 1);
  }

  return (
    <Page title="Authenticate">
      <h2>{page === "signup" ? "Signup" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="akts"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Your secret password please"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="submit"
          value={page === "signup" ? "Create account" : "Login"}
          disabled={!isFormValid}
        />
      </form>

      <button className="small link" onClick={handlePageSwitch}>
        Go to {page === "signup" ? "Login" : "Signup"}
      </button>
    </Page>
  );
};

export default AuthPage;
