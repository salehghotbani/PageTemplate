import axios from 'axios';

export const fetchWithAxios = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL_PATH || `${import.meta.env.BASE_URL}data/`,
  withCredentials: true,
  timeout: 10_000,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});
