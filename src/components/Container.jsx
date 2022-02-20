import { useContext, useEffect } from "react";
import Nav from "./Nav";

import StateContext from "../contexts/StateContext";

const Container = (props) => {
  const appState = useContext(StateContext);

  useEffect(() => {
    const body = document.querySelector("body");
    if (appState.theme === "dark") {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [appState.theme]);

  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Container;
