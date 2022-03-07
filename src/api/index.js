import axios from 'axios';

const API = axios.create({ baseURL: 'https://cwc-api.herokuapp.com' });
// const API = axios.create({
//   baseURL: 'https://2681-34-127-94-150.ngrok.io/'
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
export const signIn = (formData) => API.post('/api/user/signin', formData);
export const signUp = (formData) => API.post('/api/user/signup', formData);
export const getUserProfile = () => API.get('/api/user/get-user-profile');
export const getAllManagers = () => API.get('/api/user/get-all-managers');
export const deactivateUser = (formData) => API.post('/api/user/deactivate-user', formData);

/**
 * Stoe Routes
 */
export const storeRequests = () => API.get('/api/store/requests');
export const sendApprovedMail = (emailID) => API.get(`/api/store/send-approved-mail/${emailID}`);
export const sendRejectionMail = (formData) => API.get('/api/store/send-rejection-mail', formData);

/**
 * Dish Routes
 */
export const createDish = (formData) => API.post('/api/store/dishes/create', formData);
// export const getDishImg = (fileKey) => API.get(`/api/store/dish/image/${fileKey}`);
export const deleteStoreDishes = (dishId) => API.post('/api/store/dishes/delete', dishId);
export const getStoreDishes = () => API.get('/api/store/dishes/get-store-dishes');
