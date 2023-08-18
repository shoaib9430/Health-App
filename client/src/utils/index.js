const API_ROOT = "https://self-help-api.onrender.com/api/v1";

export const API_URLS = {
  login: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/user/register`,
  addVital: () => `${API_ROOT}/vital/add`,
  getLatestVital: (vitalType) => `${API_ROOT}/vital/latest/${vitalType}`,
  addMedicine: () => `${API_ROOT}/medicine/add`,
  getMedicines: () => `${API_ROOT}/medicine/getMedicines`,
  deleteMedicine: (id) => `${API_ROOT}/medicine/delete/${id}`,
  getMedicineForDate: (date) =>
    `${API_ROOT}/medicine/getMedicineForDate/${date}`,
  toggleIntakeStatus: () => `${API_ROOT}/medicine/toggleIntakeStatus`,
};

// Helper functions to read and write on local storage
export const setItemLocalStorage = (key, value) => {
  if (!key || !value) return console.error("Cannot store in local strage");
  const valueToStore =
    typeof value !== "string" ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

export const getItemFromLocalStorage = (key) => {
  if (!key) return console.error("Cannot get value for undefined key");
  return localStorage.getItem(key);
};

export const removeItemFromLocalStorage = (key) => {
  if (!key) return console.error("Cannot remove value for undefined key");
  return localStorage.removeItem(key);
};

export const LOCALSTORAGE_TOKEN_KEY = "__wellness_token__";
