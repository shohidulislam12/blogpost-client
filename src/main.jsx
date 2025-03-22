import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './comonent/Home';
import AuthProvider from './comonent/auth/AuthProvider';
import Rejistar from './comonent/authentification/Rejistar';
import Login from './comonent/authentification/Login';
import Admin from './comonent/Admin';
import AddData from './comonent/AddData';
import EditData from './comonent/EditData';
import UserDasbord from './comonent/UserDasbord';
import BlogData from './comonent/BlogData';
const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>,
    children:[
      {
      path: "/",
      element:<Login></Login>
    },
      {
      path: "/login",
      element:<Login></Login>
    },
      {
      path: "/registar",
      element:<Rejistar></Rejistar>
    },
      {
      path: "/admindashbord",
      element:<Admin></Admin>
    },
      {
      path: "/userdashbord",
      element:<UserDasbord></UserDasbord>
    },
      {
      path: "/adddata",
      element:<AddData></AddData>
    },
      {
      path: "/edit/:id",
      element:<EditData></EditData>
    },
      {
      path: "/blog/:id",
      element:<BlogData></BlogData>
    },
    
  ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
<RouterProvider router={router} />
</AuthProvider>
  </StrictMode>,
)
