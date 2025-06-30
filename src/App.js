import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import ListBook from './pages/ListBook.js';
import AddBook from './pages/SellerAddBook.js';
import UpdateBook from './pages/SellerUpdateBook.js';
import DeleteBook from './pages/SellerDeleteBook.js';
import ViewBook from './pages/ViewBook.js';
import SellerHome from './pages/SellerHome.js';
import BuyerHome from './pages/BuyerHome.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import UserProfile from './pages/UserProfileView.js';
import EditProfile from './pages/UserUpdateProfile.js';
import PrivateRoute from './components/PrivateRoute.js';
import PublicRoute from './components/PublicRoute.js';

function RoleBasedRedirect() {
  const user = JSON.parse(localStorage.getItem('user'));
  const role = user?.role;

  if (role === 'seller') return <Navigate to="/seller/home" />;
  if (role === 'buyer') return <Navigate to="/buyer/home" />;
  return <Navigate to="/login" />;
}

function AppLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-wrapper">
      {!isHomePage && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<RoleBasedRedirect />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/list" element={<PrivateRoute><ListBook /></PrivateRoute>} />
        <Route path="/view/:id" element={<PrivateRoute><ViewBook /></PrivateRoute>} />
        <Route path="/viewProfile/" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
        <Route path="/editProfile/" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/update/:id" element={<PrivateRoute><UpdateBook /></PrivateRoute>} />
        <Route path="/delete/:id" element={<PrivateRoute><DeleteBook /></PrivateRoute>} />
        <Route path="/seller/home" element={<PrivateRoute><SellerHome /></PrivateRoute>} />
        <Route path="/buyer/home" element={<PrivateRoute><BuyerHome /></PrivateRoute>} />
      </Routes>

      {!isHomePage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
      
    </Router>
  );
}

export default App;
