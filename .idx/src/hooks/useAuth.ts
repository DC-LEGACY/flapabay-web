import { useAtom } from "jotai";
import { userAtom } from "@/store/atom";

export function useAuth() {
  const [user, setUser] = useAtom(userAtom);

  const isAuthenticated = !!user;

  const login = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
} 