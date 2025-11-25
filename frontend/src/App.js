import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import MyOrders from './Pages/MyOrders';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/hogar' element={<ShopCategory banner={men_banner} category="hogar" />} />
          <Route path='/accesorios' element={<ShopCategory banner={women_banner} category="accesorios" />} />
          <Route path='/ropa' element={<ShopCategory banner={kid_banner} category="ropa" />} />
          {/*<Route path='/ropa' element={<ShopCategory banner={kid_banner} category="ropa" />} />*/}
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/MyOrders' element={<MyOrders/>} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
