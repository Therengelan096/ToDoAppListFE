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

export const create = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(categoryData),
    });

    return await handleResponse(response);
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
 export const update = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(categoryData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};