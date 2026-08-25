export const API_URL = "http://127.0.0.1:8000/api";

export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: "Bearer 3|iLG5Q2Ed367WW3oyU3aYJMBEBZ5xKlSoGMzoJpOJ382cec70",
};

export const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return await response.json();
};
