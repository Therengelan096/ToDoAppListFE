import { API_URL, getAuthHeaders, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const create = async (categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const update = async (id, categoryData) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoryData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};