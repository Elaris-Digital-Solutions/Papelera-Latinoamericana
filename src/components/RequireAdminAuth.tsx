import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RequireAdminAuthProps {
  children: ReactNode;
}

const RequireAdminAuth = ({ children }: RequireAdminAuthProps) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  const redirectTo = `${location.pathname}${location.search}${location.hash}`;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Verificando credenciales...</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin" replace state={{ from: redirectTo }} />;
  }

  return <>{children}</>;
};

export default RequireAdminAuth;
