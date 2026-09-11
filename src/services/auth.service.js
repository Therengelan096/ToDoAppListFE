import { API_URL, handleResponse } from "./api";
const API_URL_LOGIN = `${API_URL}/users/login`;  
export const login = async (email, password) => {
  try {
    const response = await fetch(API_URL_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};
