import React from "react";
import "../styles/navbarWordleStyles.css";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <input className="checkbox" type="checkbox" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <div className="menu-items">
          <div className="menu-backplate-shadow">
            <li>
              <Link to="/home" className="home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="login">
                Login
              </Link>
            </li>
            <li>
              <Link to="/Register" className="register">
                Register
              </Link>
            </li>
            <li>
              {/* sign out usually a button but it wasn't formatting correctly as list item */}
              <a href="/" onClick={signOut} className="signout">
                Sign Out
              </a>
            </li>
          </div>
        </div>
        <div className="navbar-title">
          <h1 className="title">Wordle</h1>
          <h3 className="for-pau">For Pau</h3>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
