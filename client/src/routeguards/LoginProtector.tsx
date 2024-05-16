import React, { useEffect } from "react";

interface AuthProtectorProps {
  children: React.ReactNode;
}

const AuthProtector: React.FC<AuthProtectorProps> = ({ children }) => {
  useEffect(() => {
    if (!localStorage.getItem("userType")) {
      window.location.href = "/";
    }
  }, []); // No dependencies needed for useEffect

  return <>{children}</>;
};

export default AuthProtector;
