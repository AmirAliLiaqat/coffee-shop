import api from "../api";

interface SigninData {
  email: string;
  password: string;
}

export const signin = async (data: SigninData) => {
  const response = await api.post("/auth/signin", data);
  return response.data;
};
