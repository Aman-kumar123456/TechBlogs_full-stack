import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isloggedIn = useSelector((state) => state.auth.isloggedIn);

  if (!isloggedIn) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;