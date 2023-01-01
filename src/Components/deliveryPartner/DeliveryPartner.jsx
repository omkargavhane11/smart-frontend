import "./deliveryPartner.css";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useState } from "react";
import {API} from "../../api";
import { useDispatch } from "react-redux";
import moment from "moment";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { closeNavModal } from "../../redux/helper";


const DeliveryPartner = () => {
  // 
  const dispatch = useDispatch();
  const toast = useToast();

  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const [type, setType] = useState(null);
    
  const [orders, setOrders] = useState([]);
  const [filterData, setFilteredData] = useState([]);

    useEffect(()=> {
        if(!user || user.userType.toLowerCase() !== "delivery partner"){
            navigate("/login-merchant")
        }
    }, []);

    const getData = async () => {
      const {data} = await axios.get(`${API}/api/order/deliverypartner/first`);
  
      setOrders(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setFilteredData(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      console.log(data);
    }; 

    function filterDataFunction() {
      let og_data = orders;
      let updatedFilter;
      if (type !== "All") {
        updatedFilter = og_data.filter((item) => item.status === type);
      } else {
        updatedFilter = og_data;
      }
  
      setFilteredData(updatedFilter);
      console.log("filter data function ...")
    }
    
    const [filterTypes, setFilterTypes] = useState([
      { type: "Ready for dispatch", selected: true, keyword:"Open" },
      { type: "Dispatched", selected: false, keyword:"Picked" },
      { type: "Out for delivery", selected: false, keyword:"Out for delivery" },
      { type: "Delivered", selected: false, keyword:"Delivered" },
    ]);
  
    const handleTypeChange = (type) => {
      var temp = filterTypes;
      temp.forEach((item) => {
        if (item.type === type) {
          item.selected = true;
          setType(item.type);
        } else {
          item.selected = false;
        }
      });
      setFilterTypes(temp);
      filterDataFunction();
    };
  
    useEffect(() => {
      getData();
    }, []);

    

    const handleStatusUpdate = async (id, status) => {
      let payload_status;
      if (status === "Generated") {
        payload_status = "Ready for dispatch";
      }else if (status === "Ready for dispatch") {
        payload_status = "Dispatched";
      } else if (status === "Dispatched") {
        payload_status = "Out for delivery";
      } else if (status === "Out for delivery") {
        payload_status = "Delivered";
      }

      const payload = {
        status: payload_status,
        orderLog:{
          status: payload_status,
          dateAndTime : Date.now()
        }
      }
  
      try {
        const updateStatus = await axios.put(
          `${API}/api/order/${id}`, payload);
          
        console.log(updateStatus.data.msg);
  
        if (updateStatus.data.msg === "success") {
          toast({
            description: "Order status updated !",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "bottom",
        });
      
        let temp = filterData;
        let item = temp.find(i => i._id === id);
        item.status = payload_status;
        let index_of_item = temp.indexOf(item);
        temp[index_of_item] = item;
        setFilteredData([...temp])
          
        } else {
          toast({
            description: "Failed to update status !",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "bottom",
          });
        }

        
        // console.log(payload)

      } catch (error) {
        console.log(error);
      }
    };

    document.addEventListener("click", (e) => {
      console.log({id: e.target.id})
      if(e.target.id !== "navbar_avatar"){
        dispatch(closeNavModal())
      }
      e.stopPropagation()
    })




  return (
    <div className='dp'>

      <Navbar/>

      <div className="dp_wrapper">
        {filterTypes.map((item, index) =>(
        <div key={index} className="dp_item" onClick={()=> handleTypeChange(item.type)}>{item.keyword}</div>
        ))}
      </div>

      <div className="dp_orders">
        <div className="mo-order-display">
            {filterData.length !== 0 ? (
              <div className="moProduct">
                {filterData?.map((product, index) => (
                  <div className="mo_product" key={index}>
                    <div className="mo_product_container">

                      <div className="mo_product_img_container">
                        <img
                          src={product.productDetail.image}
                          alt="product_image"
                          className="mo_product_image"
                        />
                      </div>

                      <div className="mo_productBottom">
                        <div className="mo_product_description">
                          {product.productDetail.description}
                        </div>
                        <div className="quantity">
                          Order Size - {product.productDetail.mo_quantity}{" "}
                          {product.productDetail.unit}
                        </div>
                        <div className="mo_value">
                          Order price - ₹{" "}
                          {product.productDetail.mo_quantity *
                            product.productDetail.price}
                        </div>
                        <div className="mo_date">
                          Order Date :{" "}
                          {moment(product.productDetail.createdAt).format("lll")}
                        </div>
                        {product.status !== "Delivered" && (
                          <div className="delivery_date">
                            Expected Delivery Before :{" "}
                            {moment(product.productDetail.createdAt)
                              .add(4, "days")
                              .calendar()}
                          </div>
                        )}
                        <div className="mo-address">
                          Delivery Address : {product.deliveryAddress}
                        </div>
                        {product.status !== "Delivered" && (
                          <div className="orderStatus">
                            Order Status : {product.status}
                          </div>
                        )}
                      </div>

                      { product.status === "Dispatched" || "Delivered" || "cancelled" ||  "Out for delivery"  ? 
                      (
                      <div className="mo_wale_buttons">
                        {product.status !== "Delivered" ? (
                          <div
                            className="mo_button_options"
                            onClick={() =>
                              handleStatusUpdate(product._id, product.status)
                            }
                          >
                            {product.status === "Generated" &&
                              "Ready for dispatch"}
                            {product.status === "Ready for dispatch" &&
                              "Pick order"}
                            {product.status === "Dispatched" &&
                              "Out for delivery"}
                            {product.status === "Out for delivery" &&
                              "Delivered"}
                          </div>
                        ) : (
                            product.status === "Delivered" ? <div className="or-deliver">Delivered</div> : <div className="or-cancelled">Cancelled</div> 
                        )}
                      </div>
                      ):(
                      <div className="mo_wale_buttons"></div>
                      )
                      }
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="orderProduct nothing-to-display">
                No orders to display
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default DeliveryPartner