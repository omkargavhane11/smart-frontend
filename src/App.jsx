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
import LoginMerchant from "./Components/loginMerchant/LoginMerchant";
import SignupMerchant from "./Components/signupMerchant/SignupMerchant";
import CustomerAuth from "./Components/customerAuth/CustomerAuth";
import AdminAuth from "./Components/customerAuth/AdminAuth";
import { useSelector } from "react-redux";
import DeliveryPartner from "./Components/deliveryPartner/DeliveryPartner";

function App() {
  
  const user = useSelector((state) => state.user.currentUser);

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
        
        {/* routes for CUSTOMER only */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
{/* 
        {user.userType === "Customer" || !user && (
            <> */}
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              {/* <Route path="/pay" element={<PaymentGateway />} /> */}
              <Route path="/paymentsuccess" element={<PaymentSuccess />} />
              <Route path="/product/:productId" element={<ProductDisplay />} />
              <Route path="/orders" element={<Order />} />
              <Route path="/order/checkout" element={<Checkout />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/sub/:subcategory" element={<SubcategoryPage />} />
              <Route path="/products/search/:searchItem" element={<SearchResult />} />
            {/* </>
        )} */}
        

        {/* Routes for MERCHANTS only */}
        {/* {user.userType === "Merchant" || !user && (
          <> */}
            <Route path="/login-merchant" element={<LoginMerchant />} />
            <Route path="/register-merchant" element={<SignupMerchant />} />
            <Route path="/add" element={<NewProductForm />} />
            <Route path="/store" element={<Store />} />
            <Route path="/store/inventory" element={<StoreInventory />} />
            <Route path="/manage-orders" element={<ManageOrders/>}/>
          {/* </>
        )} */}

        
        {/* route for ADMIN only */}


        <Route path="/deliverypartner" element={<DeliveryPartner/>}/>

        
        
      </Routes>
    </div>
  );
}

export default App;
