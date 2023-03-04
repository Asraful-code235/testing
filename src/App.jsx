import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import { Dashboard, Login, Register } from './pages';
import Order from './pages/Order';
import FrontPage from './pages/FrontPage.jsx';
import Product from './pages/Product.jsx';
import Categories from './pages/Categories.jsx';
import Customer from './pages/Customer.jsx';
import Settings from './pages/Settings.jsx';

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="orders" element={<Order />} />
            <Route path="products" element={<Product />} />
            <Route path="categories" element={<Categories />} />
            <Route path="customers" element={<Customer />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
