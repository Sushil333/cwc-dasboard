import axios from 'axios';

const API = axios.create({ baseURL: 'https://cwc-api.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }

  return req;
});
export const signIn = (formData) => API.post('/api/auth/signin', formData);
export const signUp = (formData) => API.post('/api/auth/signup', formData);
