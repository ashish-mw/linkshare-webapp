import { useContext } from "react";
import { Link } from "react-router-dom";

import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

const Nav = () => {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    return;
  }

  function handleThemeChange() {
    if (appState.theme === "dark") {
      appDispatch({ type: "setTheme", value: "light" });
    } else {
      appDispatch({ type: "setTheme", value: "dark" });
    }
  }

  return (
    <nav className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {appState.user ? (
          <>
            <li>
              <Link to="/my-links">@{appState.user.username}</Link>
            </li>
            <li>
              <button className="link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/auth">Login</Link>
          </li>
        )}
      </ul>

      <div class="text-right m-t-10">
        <button class="link" onClick={handleThemeChange}>
          {appState.theme === "dark" ? "☀️" : "🌚"}
        </button>
      </div>
    </nav>
  );
};

export default Nav;
