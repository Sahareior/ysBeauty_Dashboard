import React from "react";
import { Navigate } from "react-router-dom";
import { getTokens } from "../../utils/tokenStorage";

const PrivateRoute = ({ children }) => {
  const token = getTokens();

  if (token?.access) {
    return children; // Render the protected component
  } else {
    return <Navigate to="/" replace />; // Redirect to login if no token
  }
};

export default PrivateRoute;
