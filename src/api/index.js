import axios from 'axios';

const API = axios.create({ baseURL: 'https://5000-chocolate-grouse-2gn0ezq3.ws-us18.gitpod.io' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
