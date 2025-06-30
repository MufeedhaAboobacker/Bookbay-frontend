// components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('bookbay_token');
  const user = JSON.parse(localStorage.getItem('bookbay_user'));

  if (token) {
    if (user?.role === 'seller') {
      return <Navigate to="/seller/home" replace />;
    } else {
      return <Navigate to="/buyer/home" replace />;
    }
  }

  return children;
};

export default PublicRoute;
