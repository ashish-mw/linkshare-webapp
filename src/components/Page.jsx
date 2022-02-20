import { useEffect } from "react";
import Container from "./Container";

const Page = (props) => {
  useEffect(() => {
    if (props.title) {
      document.title = `${props.title} | ${process.env.REACT_APP_NAME}`;
    }
    window.scrollTo(0, 0);
  }, [props.title]);

  return <Container>{props.children}</Container>;
};

export default Page;
