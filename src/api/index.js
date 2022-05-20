import axios from 'axios';

const API = axios.create({ baseURL: 'https://cwc-api.herokuapp.com/' });
// const API = axios.create({
//   baseURL: 'https://507d-34-82-32-17.ngrok.io/'
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
export const getUserProfile = () => API.get('/api/managers/get-user-profile');
export const getAllManagers = () => API.get('/api/managers/get-all-managers');
export const signIn = (formData) => API.post('/api/managers/signin', formData);
export const deactivateUser = (formData) => API.post('/api/managers/deactivate-user', formData);
export const resetPassword = (formData) => API.post('/api/managers/reset-password', formData);

/**
 * Stoe Routes
 */
export const storeRequests = () => API.get('/api/store/requests');
export const getUserStore = () => API.get('/api/store/get-user-store');
export const getPlacedOrders = () => API.get('/api/store/store-orders-history');
export const sendApprovedMail = (id) => API.get(`/api/store/send-approved-mail/${id}`);
export const getDisplayData = (storeId) => API.get(`/api/store/get-store-order-details/${storeId}`);
export const sendRejectionMail = (formData) => API.get('/api/store/send-rejection-mail', formData);

/**
 * Dish Routes
 */
export const createDish = (formData) => API.post('/api/store/dishes/create', formData);
// export const getDishImg = (fileKey) => API.get(`/api/store/dish/image/${fileKey}`);
export const deleteStoreDishes = (dishId) => API.post('/api/store/dishes/delete', dishId);
export const getStoreDishes = () => API.get('/api/store/dishes/get-store-dishes');
export const disableDish = (formData) => API.post('/api/store/dish/disable-dish', formData);
