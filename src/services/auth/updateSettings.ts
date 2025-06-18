import api from "../api";

interface UpdateSettingsData {
  fullName: string;
  email: string;
  currentPassword?: string;
  newPassword?: string;
}

export const updateSettings = async (data: UpdateSettingsData) => {
  const response = await api.put("/auth/settings", data);
  return response.data;
};
