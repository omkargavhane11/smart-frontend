import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./Order.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@mui/material";

const Order = () => {
  const { currentUser } = useSelector((state) => state.user);
  // const cart = useSelector((state) => state.cart);
  const [orders, setOrders] = useState([]);

  const getData = async () => {
    const data = await axios.get("http://localhost:8080/api/order");
    console.log(data.data);
    setOrders(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="order">
      <Navbar />
      <div className="orderProduct">
        {orders.map((item) => (
          <div className="orderProductItem" key={item.id}>
            <img src={item.productDetail.url} className="order_product_image" />
            <div className="orderInfo">
              <div className="order_product_desc">
                {item.productDetail.description}
              </div>
              <div className="order_product_price">
                ₹ {item.productDetail.price}
              </div>
              <div className={item.status}>{item.status}</div>
              <div className="">Order date : {item.createdAt}</div>
              {/* <button className="cancel_order">Cancel Order</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
