import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "false";

  if (isAuthenticated) {
    // send to custom 404 page
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
