import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const DashboardApp = lazy(() => import('./pages/DashboardApp'));
const Products = lazy(() => import('./pages/Products'));
const BasicTable = lazy(() => import('./pages/admin-only/StoreRequests'));
const User = lazy(() => import('./pages/User'));
const NotFound = lazy(() => import('./pages/Page404'));
// const Blog = lazy(() => import('./pages/Blog'));
// const Managexr = lazy(() => import('./pages/Manager'));

// ----------------------------------------------------------------------

const routes = (isLoggedIn) => [
  {
    path: '/dashboard',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { element: <Navigate to="/dashboard/app" replace /> },
      { path: 'app', element: <DashboardApp /> },
      { path: 'user', element: <User /> },
      { path: 'store/managers', element: <User /> },
      { path: 'products', element: <Products /> },
      // { path: 'blog', element: <Blog /> },
      { path: 'store/requests', element: <BasicTable /> }
    ]
  },
  {
    path: '/',
    element: <LogoOnlyLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      {
        path: '/',
        element: isLoggedIn ? <Navigate to="/dashboard/app" /> : <Navigate to="/login" />
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  { path: '*', element: <Navigate to="/404" replace /> }
];

export default routes;
