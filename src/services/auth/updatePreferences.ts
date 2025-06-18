import api from "../api";

interface UpdatePreferencesData {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
}

export const updatePreferences = async (data: UpdatePreferencesData) => {
  const response = await api.put("/auth/preferences", data);
  return response.data;
};
