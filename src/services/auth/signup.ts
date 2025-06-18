import api from "../api";

interface SignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signup = async (data: SignupData) => {
  const response = await api.post("/auth/signup", data);
  return response.data;
};
