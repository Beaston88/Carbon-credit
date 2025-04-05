import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./AppContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAppContext();
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
