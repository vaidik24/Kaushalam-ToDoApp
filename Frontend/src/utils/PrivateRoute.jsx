import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

const useAuth = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
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
