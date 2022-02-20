import { useEffect } from "react";
import Container from "./Container";

const Page = (props) => {
  useEffect(() => {
    if (props.title) {
      document.title = `${props.title} | ${process.env.REACT_APP_NAME}`;
    }
    window.scrollTo(0, 0);
  }, [props.title]);

  return (
    <Container>
      <div className="container m-t-20">{props.children}</div>
    </Container>
  );
};

export default Page;
