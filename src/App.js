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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/list" element={<ListBook />} />
        <Route path="/view/:id" element={<ViewBook />} />
        <Route path="/viewProfile/" element={<UserProfile />} />
        <Route path="/editProfile/" element={<EditProfile />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/update/:id" element={<UpdateBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
        <Route path="/seller/home" element={<SellerHome />} />
        <Route path="/buyer/home" element={<BuyerHome />} />
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
