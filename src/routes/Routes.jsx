import { createBrowserRouter } from 'react-router-dom'
import { roomDetails } from '../APIs/rooms'
import AddRoom from '../Pages/Dashboard/AddRoom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import MyBookings from '../Pages/MyBookings/MyBookings'
import MyListings from '../Pages/MyListings/MyListings'
import RoomDetails from '../Pages/RoomDetails/RoomDetails'
import SignUp from '../Pages/SignUp/SignUp'
import DashboardLayout from '../layouts/DashboardLayout'
import Main from '../layouts/Main'
import PrivateRoute from './PrivateRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/room/:id',
        element: <RoomDetails />,
        loader: ({params}) => roomDetails(params.id)
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <PrivateRoute><MyListings /></PrivateRoute>
      },
      {
        path: '/dashboard/add-room',
        element: <AddRoom />
      },
      {
        path: '/dashboard/my-bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
      {
        path: '/dashboard/my-listings',
        element: <PrivateRoute><MyListings /></PrivateRoute>
      }
    ]
  }
])
