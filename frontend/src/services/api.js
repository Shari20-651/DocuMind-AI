import axios from "axios";

const api = axios.create({
  baseURL: "https://documind-ai-backend-gbry.onrender.com"
});

export default api;