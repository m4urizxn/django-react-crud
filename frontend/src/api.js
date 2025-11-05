import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://django-react-crud-1.onrender.com/api/" // ✅ backend en Render
      : "http://127.0.0.1:8000/api/", // 🧩 para desarrollo local
});

export default api;
  