import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './RootLayout.jsx';
import Login from "./components/user-connect/Login.jsx";
import Register from "./components/user-connect/Register.jsx";
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Profile from "./components/profile/Profile.jsx";
import AddQuiz from "./components/addQuiz/AddQuiz.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/add-quiz",
        element: <AddQuiz />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
