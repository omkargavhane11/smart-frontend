import "./Order.css";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer/Footer";
import { useToast } from "@chakra-ui/react";
import {API} from "../../api";

const Order = () => {
  // 
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [ filteredData, setFilteredData]  = useState([])
  const [cancelled, setCancelled] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const getData = async () => {
    const data = await axios.get(
      `${API}/api/order/${currentUser?._id}`
    );

    setOrders(
      data.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );

    setFilteredData(
      data.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );

  };

  useEffect(() => {
    getData();
  }, []);

  const handle_cancel_order = async(orderId) =>{
    const payload = {
      isCancelled :true,
      status:"cancelled"
    }
    try {
      const {data} = await axios.put(`${API}/api/order/${orderId}`,payload);
      if(data.msg === "success"){
        toast({
          description: "Order cancelled !",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        let temp = orders;
        let currentOrder = temp.find(o => o._id === orderId);
        let indexOfOrder = temp[currentOrder];
        currentOrder.status = "cancelled";
        currentOrder.isCancelled = true;
        temp[indexOfOrder] = currentOrder;
        setOrders([...temp]);

      }else{
        toast({
          description: "Failed to cancel order !",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  function getMyOrders(){
    let data;
    if(startDate){
        data = orders.filter((o) => o.createdAt < startDate);
    }else if(endDate){
      data = orders.filter((o) => o.createdAt > endDate);
    }else if(startDate && endDate){
      data = orders.filter((o) => o.createdAt < startDate && o.createdAt > endDate);
    }

    setFilteredData(data)
  }

  return (
    <div className="order">
      <Navbar />
      <h1 className="page_heading">
        {!currentUser ? "Login to see your orders" : orders.length ? "Your Orders" : "No orders to display !"}
      </h1>
      <div className="orderProduct">
        {orders.length > 0 &&<div className="dateInputContainer">
          <div className="dateInput">
          <label htmlFor="date">From : </label>
          <input onChange={(e)=> {
            setStartDate(e.target.value)
            getMyOrders()}} 
          type="date" name="" id="date" />
          </div>
          <div className="dateInput">
          <label htmlFor="date">To : </label>
          <input onChange={(e)=> {
            setEndDate(e.target.value)
            getMyOrders()}} type="date" name="" id="date" />
          </div>
        </div>}
        {filteredData?.map((product, index) => (
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
                  {moment(product.createdAt).format("lll")}
                </div>
                
                <div className="order_wale_buttons">
                {product.status !== "Delivered" && product.status !== "cancelled"  ? (
                  <>
                    <div className="delivery_date">
                      Expected Delivery Before :{" "}
                      {moment(product.createdAt)
                        .add(4, "days")
                        // .calendar()
                        .format("ll")}
                    </div>
                    <div className="orderStatus">
                      Order Status : {product.status}
                    </div>
                  </>
                ) : (
                  product.status === "cancelled"? <div className="or-cancelled">Cancelled</div>:<div className="or-deliver">Delivered</div>
                  )}
                  <button
                    className="cancel_order"
                    onClick={() =>
                      navigate(`/product/${product.productDetail._id}`)
                    }
                    >
                    View Product
                  </button>
                  {product.status !== "Delivered" && product.status !== "cancelled" && <button
                    className="cancel_order1"
                    onClick={()=> handle_cancel_order(product._id)}
                    >
                    Cancel Order
                  </button>}
                    </div>
              </div>
            </div>
          </div>
        ))}
        {filteredData?.length === 0 && orders.length > 0 && (
          <div className="nothing">No orders in selected date range</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
