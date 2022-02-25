import { useContext } from "react";
import { Link } from "react-router-dom";
import './styles/Nav.css';

import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";
import CustomToggle from "./CustomToggle";

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
    <div className="header-wrap">
      <div className="header-top-blk">
        <div className="header-container">
          <ul>
            <li>
              <Link to="/" className="logo">Link Share</Link>
            </li>
            {appState.user ? (
              <>
                <li>
                  <Link to="/my-links" className="login">@{appState.user.username}</Link>
                </li>
                <li>
                  <button className="link login" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/auth" className="login">Login</Link>
              </li>
            )}
          </ul>

          <div className="text-right m-t-10">
            <CustomToggle onChange={handleThemeChange} checked={appState.theme === "dark"}/>
          </div>
        </div>
      </div>
      <div className="bg-pattern"></div>
    </div>
  );
};

export default Nav;
