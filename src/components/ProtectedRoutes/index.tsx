import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getEmployees } from "../../services/employees";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem("Access-token");
  const [isTokenValidate, setIsTokenValidate] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getEmployees();
        setIsTokenValidate(true);
      } catch (error) {
        console.log("Error fetching evaluation:", error);
        setIsTokenValidate(false);
      }
    };

    fetchUsers();
  }, []);

  if (!token || !isTokenValidate) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
