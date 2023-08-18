import { API_URLS, LOCALSTORAGE_TOKEN_KEY } from "../utils";
import moment from "moment";
// Custom Fetch function to dynamically add parameters and HTTP Request type
const customFetch = async (url, { body, ...customConfig }) => {
  // Retreives the JSON token
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
  // Headers to add the Bearer token to Authorization key in Header
  const headers = {
    "content-type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  // Configuration
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    // Stringifying JSON object before sending it with the request
    config.body = JSON.stringify(body);
  }
  try {
    // Fetch
    const response = await fetch(url, config);

    // Handling Fetch response

    // Internal Server Error
    if (response.status === 500) throw new Error("Internal Server Error");

    const responseJSON = await response.json();
    // Request and response cycle is successful
    if (response.status === 200) {
      return {
        success: true,
        data: responseJSON.data,
      };
    } else {
      return {
        success: false,
        message: responseJSON.message,
      };
    }
  } catch (e) {
    console.log("Error", e.message);
    return {
      success: false,
      message: e.message,
    };
  }
};

// Sign up
export const signup = (formData) => {
  return customFetch(API_URLS.signup(), {
    body: { ...formData },
    method: "POST",
  });
};
// Login
export const login = (formData) => {
  return customFetch(API_URLS.login(), {
    body: { ...formData },
    method: "POST",
  });
};

// Add Vital
export const addVital = (formData) => {
  return customFetch(API_URLS.addVital(), {
    body: { ...formData },
    method: "POST",
  });
};
// Get Latest Vital
export const getLatestVital = (vitalType) => {
  return customFetch(API_URLS.getLatestVital(vitalType), {
    method: "GET",
  });
};

// Add medicine
export const addMedicine = (formData) => {
  return customFetch(API_URLS.addMedicine(), {
    body: { ...formData },
    method: "POST",
  });
};

// Get medicine
export const getMedicines = () => {
  return customFetch(API_URLS.getMedicines(), {
    method: "GET",
  });
};

// Delete medicine
export const deleteMedicine = (id) => {
  return customFetch(API_URLS.deleteMedicine(id), {
    method: "GET",
  });
};
// Get medicine for current date
export const getMedicineForToday = () => {
  const curentUTCString = moment()
    .startOf("day")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return customFetch(API_URLS.getMedicineForDate(curentUTCString), {
    method: "GET",
  });
};
// Toggle medicine intake status
export const toggleIntakeStatus = (id, timingIndex) => {
  const curentUTCString = moment()
    .startOf("day")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return customFetch(API_URLS.toggleIntakeStatus(), {
    body: { id, dateOfIntake: curentUTCString, timingIndex },
    method: "POST",
  });
};
