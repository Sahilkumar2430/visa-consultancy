import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Admin session expired — bounce to admin login
    if (
      err.response?.status === 401 &&
      typeof window !== 'undefined' &&
      window.location.pathname.startsWith('/admin') &&
      !window.location.pathname.endsWith('/admin/login')
    ) {
      window.location.href = '/admin/login';
    }

    const message =
      err.response?.data?.message ||
      err.message ||
      'Something went wrong. Please try again.';

    return Promise.reject({ ...err, message });
  }
);

export default api;