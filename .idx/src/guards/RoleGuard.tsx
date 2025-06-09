import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type RoleGuardProps = {
  children: React.ReactNode;
  role: string;
};

export function RoleGuard({ children, role }: RoleGuardProps) {
  const { user } = useAuth();

  if (user?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
} 