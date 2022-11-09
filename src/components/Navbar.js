import React from "react";
import "../styles/navbarWordleStyles.css";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Rank from "./Rank";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const [showRank, setShowRank] = React.useState(false);

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  const ranking = () => {
    setShowRank((prev) => !prev);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="menu">
          <input className="checkbox-menu" type="checkbox" />
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
                <button onClick={signOut} className="signout">
                  Sign Out
                </button>
              </li>
            </div>
          </div>
        </div>
        <div className="navbar-title">
          <h1 className="title">Wordle</h1>
          <h3 className="for-pau">For Pau</h3>
        </div>
        <div className="stats">
          <input className="checkbox-stats" type="checkbox" onClick={ranking} />
          <div className="stats-bar-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
        </div>
        {showRank && <Rank />}
      </div>
    </div>
  );
};

export default Navbar;
