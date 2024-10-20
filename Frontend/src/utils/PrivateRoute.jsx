import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? true : false;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

//prop validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
