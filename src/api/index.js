import axios from 'axios';

const API = axios.create({ baseURL: 'https://cwc-api.herokuapp.com/' });
// const API = axios.create({
//   baseURL: 'https://42e9-34-82-78-144.ngrok.io/'
// });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userInfo')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`;
  }

  return req;
});

/**
 * Authentication Routes
 */
export const signIn = (formData) => API.post('/api/managers/signin', formData);
export const getUserProfile = () => API.get('/api/managers/get-user-profile');
export const getAllManagers = () => API.get('/api/managers/get-all-managers');
export const deactivateUser = (formData) => API.post('/api/managers/deactivate-user', formData);

/**
 * Stoe Routes
 */
export const storeRequests = () => API.get('/api/store/requests');
export const sendApprovedMail = (id) => API.get(`/api/store/send-approved-mail/${id}`);
export const sendRejectionMail = (formData) => API.get('/api/store/send-rejection-mail', formData);

/**
 * Dish Routes
 */
export const createDish = (formData) => API.post('/api/store/dishes/create', formData);
// export const getDishImg = (fileKey) => API.get(`/api/store/dish/image/${fileKey}`);
export const deleteStoreDishes = (dishId) => API.post('/api/store/dishes/delete', dishId);
export const getStoreDishes = () => API.get('/api/store/dishes/get-store-dishes');
