import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home";
import NewProductForm from "./Components/NewProductForm/NewProductForm";
import Cart from "./Pages/Cart/Cart";
import PaymentSuccess from "./Components/PaymentSuccess/PaymentSuccess";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import Order from "./Components/Order/Order";
import Checkout from "./Components/Checkout/Checkout";
import Login from "./Components/loginPage/Login";
import Signup from "./Components/signup/Signup";
import CategoryPage from "./Pages/categoryPage/CategoryPage";
import SubcategoryPage from "./Pages/subcategoryPage/SubcategoryPage";
import SearchResult from "./Pages/searchResultPage/SearchResult";
import Store from "./Pages/store/Store";
import StoreInventory from "./Pages/inventory/Inventory";
import ManageOrders from "./Components/manageOrders/ManageOrders";


function App() {

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload = () => {
  //       resolve(true);
  //     };
  //     script.onerror = () => {
  //       resolve(false);
  //     };
  //     document.body.appendChild(script);
  //   });
  // };

  // useEffect(() => {
  //   loadScript("https://checkout.razorpay.com/v1/checkout.js");
  // });


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/pay" element={<PaymentGateway />} /> */}
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/product/:productId" element={<ProductDisplay />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order/checkout" element={<Checkout />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/category/sub/:subcategory" element={<SubcategoryPage />} />
        <Route path="/products/search/:searchItem" element={<SearchResult />} />

        {/* Routes with Admin access only */}
        <Route path="/add" element={<NewProductForm />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/inventory" element={<StoreInventory />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
      </Routes>
    </div>
  );
}

export default App;
