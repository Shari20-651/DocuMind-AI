import axios from "axios";

const api = axios.create({
  baseURL: "https://documind-ai-production-a6d5.up.railway.app"
});

export default api;