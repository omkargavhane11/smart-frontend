import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home/Home";
import NewProductForm from "./Components/NewProductForm/NewProductForm";
import Cart from "./Pages/Cart/Cart";
import PaymentSuccess from "./Components/PaymentSuccess/PaymentSuccess";
import ProductDisplay from "./Components/ProductDisplay/ProductDisplay";
import Order from "./Components/Order/Order";
import Checkout from "./Components/Checkout/Checkout";
// import { ChakraProvider } from '@chakra-ui/react';


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
      {/* <ChakraProvider> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<NewProductForm />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/pay" element={<PaymentGateway />} /> */}
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/product/:productId" element={<ProductDisplay />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/order/checkout" element={<Checkout />} />
      </Routes>
      {/* </ChakraProvider> */}
    </div>
  );
}

export default App;
