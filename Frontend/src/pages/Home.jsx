import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  // Handler for "Try it Now" button
  const handleTryNowClick = () => {
    navigate("/tasks"); // Redirect to the tasks page
  };

  return (
    <div className="home-container">
      {/* Main content section */}
      <div className="home-content">
        <h1>Welcome to the To-Do App</h1>
        <p>
          Stay organized and manage your tasks efficiently. Add, update, and
          track your tasks easily with our simple yet powerful to-do list app.
        </p>
        <button className="btn-try-now" onClick={handleTryNowClick}>
          Try it Now
        </button>
      </div>
    </div>
  );
};

export default Home;
