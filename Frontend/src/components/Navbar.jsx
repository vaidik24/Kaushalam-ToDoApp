import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

const Navbar = () => {
  const [accessToken, setAccessToken] = useState(null);
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
    await logout();
    setAccessToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        To-Do App
      </Link>
      <div className="nav-links">
        {accessToken ? (
          <div className="user-menu">
            <span className="user-icon">👤</span>
            <div className="dropdown">
              <Link to="/tasks">View All Tasks</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
