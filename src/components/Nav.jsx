import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="container">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-links">My Links</Link>
        </li>
        <li>
          <Link to="/auth">Login</Link>
        </li>
        <li>
          <button className="link">Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
