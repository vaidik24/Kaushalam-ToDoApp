import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import "../styles/login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(await loginUser(credentials));
      navigate("/tasks");
    } catch (error) {
      console.log(error);
      setError("Invalid login credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="login-input"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-try-now">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
