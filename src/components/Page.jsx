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
      <div className="bg-curved-radius">
        <div className="content-container">{props.children}</div>
      </div>
    </Container>
  );
};

export default Page;
