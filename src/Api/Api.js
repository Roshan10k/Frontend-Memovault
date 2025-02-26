import axios from "axios";

// Set up base URL for API requests
const API = axios.create({
  baseURL: "http://localhost:8080", // Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to headers (if available) for authentication
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized: Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login";
          break;
        case 404:
          console.error("Resource not found.");
          break;
        case 500:
          console.error("Server error. Please try again later.");
          break;
        default:
          console.error("An error occurred:", error.message);
      }
    } else if (error.request) {
      console.error("Network error. Please check your connection.");
    } else {
      console.error("Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = (userData) => API.post("/users/login", userData);
export const forgotPassword = (userData) =>API.post("/users/forgot-password", userData);
export const register = (userData) => API.post("/users/create_user", userData);
export const getCurrentUser = () => API.get("/users/me");


// Memory APIs
export const createMemory = (memoryData) => 
  API.post("/memories/create_memory", memoryData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMemories = () => 
  API.get("/memories/show_memories");

export const getMemoryById = (id) => 
  API.get(`/memories/${id}`);

export const updateMemory = (id, updatedData) => 
  API.put(`/memories/update_memory/${id}`, updatedData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteMemory = (id) => 
  API.delete(`/memories/delete_memory/${id}`);

export const getRecentMemories = () => 
  API.get("/memories/recent_memories");

// Bucket List APIs
export const getBucketList = () => API.get("/bucketlist/items");
export const addBucketTask = (itemData) => API.post("/bucketlist/items", itemData);
export const completeBucketTask = (id) => API.put(`/bucketlist/items/${id}/done`);
// Letter to Self APIs
export const createLetter = (letterData) => API.post("/lettertoself/create", letterData);
export const getLetters = () => API.get("/lettertoself/me");
export const getLetterById = (id) => API.get(`/lettertoself/${id}`);
export const deleteLetter = (id) => API.delete(`/lettertoself/${id}`);
export const updateLetter = (id, updatedData) => API.put(`/lettertoself/${id}`, updatedData);
export const getRecentLetters = () => API.get("/lettertoself/recent");


// Yearly Goal APIs
export const getYearlyGoals = () => API.get("/yearlygoals/goals");
export const addYearlyGoal = (goalData) => API.post("/yearlygoals/goals", goalData);
export const updateYearlyGoal = (id, updatedData) => API.put(`/yearlygoals/goals/${id}`, updatedData);
export const completeYearlyGoal = (id) => API.put(`/yearlygoals/goals/${id}/complete`);
export const addRemarksToGoal = (id, remarks) => API.put(`/yearlygoals/goals/${id}/remarks`, { remarks });

// Achievements APIs
export const createAchievement = (achievementData) => 
  API.post("/achievements/create", achievementData);

export const getAchievements = () => 
  API.get("/achievements");

export const getAchievementById = (id) => 
  API.get(`/achievements/${id}`);

export const updateAchievement = (id, updatedData) => 
  API.put(`/achievements/${id}`, updatedData);

export const deleteAchievement = (id) => 
  API.delete(`/achievements/${id}`);


export default API;


