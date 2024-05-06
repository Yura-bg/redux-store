import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
const Navbar: React.FC = () => {
  return (
    <nav className="navs">
      <li className="list">
        <ul>
          <Link to={"/register"}>Registration</Link>
        </ul>
        <ul>
          <Link to={"/user"}>User</Link>
        </ul>
        {/* <ul>
          <Link to={"/tasks"}>Tasks</Link>
        </ul> */}
      </li>
    </nav>
  );
};

export default Navbar;
