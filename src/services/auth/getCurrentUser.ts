import api from "../api";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "staff" | "user";
}

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/auth/me");
  return response.data;
};
