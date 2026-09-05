import { API_URL, getAuthHeaders, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw error;
  }
};

export const create = async (taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, taskData) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const remove = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};