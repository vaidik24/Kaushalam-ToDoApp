import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import "../styles/navbar.css";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        setAccessToken(accessToken);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");
    await logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        To-Do App
      </Link>
      <div className="nav-links">
        {accessToken.length > 0 ? (
          <Link to="/logout" className="nav-link" onClick={handleLogout}>
            Logout
          </Link>
        ) : (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
