import "./Order.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer/Footer";

const Order = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  // const cart = useSelector((state) => state.cart);
  const [orders, setOrders] = useState([]);
  const [cancelled, setCancelled] = useState(false);
  const getData = async () => {
    const data = await axios.get(
      `https://s-mart-77.herokuapp.com/api/order/${currentUser._id}`
    );

    setOrders(
      data.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
    //
    // setOrders(data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="order">
      <Navbar />
      <h1 className="page_heading">
        {!currentUser ? "Login to see your orders" : "Your Orders"}
      </h1>
      <div className="orderProduct">
        {orders.map((product, index) => (
          <div className="order_product" key={index}>
            <div className="order_product_container">
              <div className="order_product_img_container">
                <img
                  src={product.productDetail.image}
                  alt="product image"
                  className="order_productImage"
                />
              </div>
              <div className="order_productBottom">
                <div className="order_product_description">
                  {product.productDetail.description}
                </div>
                {/* <div className="order_product_price">
                  ₹ {product.productDetail.price}
                </div> */}
                <div className="quantity">
                  Order Size - {product.productDetail.order_quantity}{" "}
                  {product.productDetail.unit}
                </div>
                <div className="order_value">
                  Order price - ₹{" "}
                  {product.productDetail.order_quantity *
                    product.productDetail.price}
                </div>
                <div className="order_date">
                  Order Date :{" "}
                  {moment(product.productDetail.createdAt).format("lll")}
                </div>
                <div className="delivery_date">
                  Expected Delivery Before :{" "}
                  {/* {moment(product.productDetail.createdAt).format("lll")} */}
                  {moment(product.productDetail.createdAt)
                    .add(4, "days")
                    .calendar()}
                </div>
                <div className="order_wale_buttons">
                  {/* <button
                    className="cancel_order"
                    onClick={() => setCancelled(true)}
                  >
                    {cancelled ? "Cancelled" : "Cancel Order"}
                  </button> */}
                  <button
                    className="cancel_order"
                    onClick={() =>
                      navigate(`/product/${product.productDetail._id}`)
                    }
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
