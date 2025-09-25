import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Scores from './pages/Scores.jsx';
import League from './pages/League.jsx';
import Rankings from './pages/Rankings.jsx';
import Profile from './pages/Profile.jsx';
import Settings from './pages/Settings.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import RequireAuth from './components/RequireAuth.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },           // public
      { path: 'login', element: <Login /> },           // public
      { path: 'signup', element: <Signup /> },         // public

      // protected
      { path: 'dashboard', element: <RequireAuth><Dashboard /></RequireAuth> },
      { path: 'scores', element: <RequireAuth><Scores /></RequireAuth> },
      { path: 'league', element: <RequireAuth><League /></RequireAuth> },
      { path: 'rankings', element: <RequireAuth><Rankings /></RequireAuth> },
      { path: 'profile', element: <RequireAuth><Profile /></RequireAuth> },
      { path: 'settings', element: <RequireAuth><Settings /></RequireAuth> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
