import Nav from "./Nav";

const Container = (props) => {
  return (
    <>
      <Nav />
      {props.children}
    </>
  );
};

export default Container;
