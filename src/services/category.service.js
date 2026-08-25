import { API_URL, DEFAULT_HEADERS, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
