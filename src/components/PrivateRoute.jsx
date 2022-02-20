import { useContext } from "react";
import { Navigate } from "react-router-dom";

import StateContext from "../contexts/StateContext";

const PrivateRoute = (props) => {
  const appState = useContext(StateContext);

  return appState.isLoggedIn ? (
    props.outlet
  ) : (
    <Navigate
      to={{
        pathname: "/auth",
      }}
    />
  );
};

export default PrivateRoute;
