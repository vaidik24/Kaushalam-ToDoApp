import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import "../styles/signup.css";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(credentials);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError("Error registering");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="signup-input"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn-signup">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
