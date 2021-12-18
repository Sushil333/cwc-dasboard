import axios from 'axios';

const API = axios.create({ baseURL: 'https://cwc-api.herokuapp.com' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }

  return req;
});

/**
 * Authentication Routes
 */
export const signIn = (formData) => API.post('/api/user/signin', formData);
export const signUp = (formData) => API.post('/api/user/signup', formData);
export const getUserProfile = () => API.get('/api/user/get-user-profile');

/**
 * Dish Routes
 */
export const createDish = (formData) => API.post('/api/store/dishes/create', formData);
export const deleteStoreDishes = (dishId) => API.post('/api/store/dishes/delete', dishId);
export const getStoreDishes = () => API.get('/api/store/dishes/get-all');
