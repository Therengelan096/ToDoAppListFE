import { API_URL, DEFAULT_HEADERS, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(taskData),
    });

    const data = await handleResponse(response);
    return data;
  } catch (error) {
    throw error;
  }
};

export const update = async (id, taskData) => {};

export const remove = async (id) => {};
