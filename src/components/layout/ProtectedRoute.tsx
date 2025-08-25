import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!user || !token) {
    return <Navigate to="signin" replace state={{ from: location }} />;
  }

  return (
    <div className="min-h-screen flex">
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
