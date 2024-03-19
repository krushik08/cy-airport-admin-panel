import { Navigate, useRoutes } from 'react-router-dom';

import Layout from './components/Layout/Layout';

import MinimalLayout from './components/Layout/MinimalLayout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Bookings from './pages/Bookings';
import BookingConformation from './pages/Flight/BookingConformation';
import Flight from './pages/Flight/Flight';
import FlightBooking from './pages/Flight/FlightBooking';
import HomePage from './pages/HomePage/HomePage';

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/home', element: <HomePage /> },
        { path: 'flight', element: <Flight /> },
        { path: 'flight/:id', element: <Flight /> },
        { path: 'flight-booking', element: <FlightBooking /> },
        { path: 'flight-booking/:id', element: <FlightBooking /> },
        { path: 'booking-confirmation', element: <BookingConformation /> },
        { path: 'bookings', element: <Bookings /> },
        { path: '', element: <Navigate to="/login" replace /> },
      ],
    },
    {
      path: '/',
      element: <MinimalLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    // {
    //   path: "/",
    //   children: [
    //     { path: "login", element: <Login /> },
    //     { path: "signup", element: <SignUp /> },
    //   ],
    // },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
