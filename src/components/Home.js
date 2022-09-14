import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <section className="home-container">
      <nav className="home-navbar-container">
        <ul className="home-navbar-list">
          <li>
            <Link to="/login" className="home-to-login">
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" className="home-to-register">
              Register
            </Link>
          </li>
          <li>
            <button onClick={signOut} className="signout-button">
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
      <h1>Home *in progress*</h1>
      <Link to="/" style={{ color: "black" }}>
        Wordle
      </Link>
    </section>
  );
};

export default Home;
