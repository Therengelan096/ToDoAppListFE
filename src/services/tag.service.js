import { API_URL, getAuthHeaders, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const create = async (tagData) => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(tagData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const update = async (id, tagData) => {
  try {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(tagData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};