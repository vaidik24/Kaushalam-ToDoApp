import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="go-home-link">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
