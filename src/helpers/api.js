import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.status === 401) {
      return (window.location.href = "/login");
    }
  },
);

export default api;
