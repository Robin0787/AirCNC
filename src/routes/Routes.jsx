import { createBrowserRouter } from 'react-router-dom'
import AddForm from '../Pages/Dashboard/AddRoom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import RoomDetails from '../Pages/RoomDetails/RoomDetails'
import SignUp from '../Pages/SignUp/SignUp'
import DashboardLayout from '../layouts/DashboardLayout'
import Main from '../layouts/Main'

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
        element: <RoomDetails />
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
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard/add-room',
        element: <AddForm />
      }
    ]
  }
])
