export const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const handleResponse = async (response, onUnauthorized) => {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    if (onUnauthorized) onUnauthorized();
    throw new Error("Sesión expirada o no autorizada");
  }
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Error HTTP: ${response.status}`);
  }
  return await response.json();
};