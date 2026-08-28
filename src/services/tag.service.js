import { API_URL, DEFAULT_HEADERS, handleResponse } from "./api";

export const getAll = async () => {
  try {
    const response = await fetch(`${API_URL}/tags`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/tags/${id}`, {
      method: "GET",
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
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
      headers: DEFAULT_HEADERS,
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};