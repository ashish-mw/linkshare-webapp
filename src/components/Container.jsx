import Nav from "./Nav";

const Container = (props) => {
  return (
    <div class="main">
      <Nav />
      {props.children}
    </div>
  );
};

export default Container;
