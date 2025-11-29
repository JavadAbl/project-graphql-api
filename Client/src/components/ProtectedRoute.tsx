import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireManager?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireManager = false,
}) => {
  const { user, isManager } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireManager && !isManager) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
