import React, { useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import Orders from '../pages/Order.jsx';
import Order from '../pages/Order.jsx';
import Product from './Product';
import Categories from './Categories';
import Customer from './Customer';
import Settings from './Settings';
import { useSelector } from 'react-redux';
import FrontPage from './FrontPage';
import { DetailOrder } from './DetailOrder';

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  return (
    <>
      {/* {/* <Router> */}
      <section className="min-h-screen min-w-screen ">
        <Header />
        <div className="flex items-start justify-between">
          <Sidebar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<FrontPage />} />
              <Route path="/:id" element={<DetailOrder />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Product />} />
              <Route path="categories" element={<Categories />} />
              <Route path="customers" element={<Customer />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </section>
      {/* </Router> */}
    </>
  );
};

export default Dashboard;
