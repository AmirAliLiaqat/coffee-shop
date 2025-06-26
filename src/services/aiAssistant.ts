import api from "./api";

export const askAIAssistant = async (message: string): Promise<string> => {
  try {
    const response = await api.post("/ai-assistant", { message });
    return response.data.response;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Failed to get a response from the AI assistant.");
  }
};
