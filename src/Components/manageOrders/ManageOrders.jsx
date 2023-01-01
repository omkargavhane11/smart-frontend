import "./manageOrders.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {API} from "../../api";
import { closeNavModal } from "../../redux/helper";


const filterTypes = [
  { type: "All", selected: true },
  { type: "Generated", selected: false },
  { type: "Ready for dispatched", selected: false },
  { type: "Dispatched", selected: false },
  { type: "Out for delivery", selected: false },
  { type: "Delivered", selected: false },
];

const ManageOrders = () => {
  // 
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [filterData, setFilteredData] = useState([]);

  const [type, setType] = useState("All");

  const [search, setSearch] = useState("");

  const getData = async () => {
    const data = await axios.get(`${API}/api/order`);

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
    
  const [selectedType, setSelectedType] = useState("All")

  const data = selectedType === "All" ? filterData : filterData.filter(product => product.status === selectedType)
  
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);  
  };


  useEffect(() => {
    if (!currentUser?.userType === "Merchant"  || !currentUser?.userType === "Admin") {
      navigate("/login-merchant");
    }
    // eslint-disable-next-line
  }, []);

  document.addEventListener("click", (e) => {
    console.log({id: e.target.id})
    if(e.target.id !== "navbar_avatar"){
        dispatch(closeNavModal())
    }
    e.stopPropagation()
  })


  return (
    <div className="mo">
      <div className="mo-topbar">
        <button className="mo-back-to-store" onClick={() => navigate("/store")}>
          Back
        </button>
        {/* <div className="mo-heading">Orders</div> */}
        <div className="mo-search-box">
          <SearchIcon />
          <input
            className="mo-search"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      </div>
      <div className="mo-body">
        <div className="mo-filter-types">
          {filterTypes.map((item, index) => (
            <div
              className={
                item.type === selectedType
                  ? "mo-filter-item-selected"
                  : "mo-filter-item"
              }
              key={index}
              onClick={() => handleTypeSelect(item.type)}
            >
              {item.type}{" "}
              <span className="order-status-count">
                (
                {item.type !== "All"
                  ? orders.filter((or) => or.status === item.type).length
                  : orders.length}
                )
              </span>
            </div>
          ))}
        </div>
        <div className="mo-order-display">
          {data.length !== 0 ? (
            <div className="moProduct">
              {data?.map((product, index) => (
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
                        Order Size - {product.productDetail.order_quantity}{" "}
                        {product.productDetail.unit}
                      </div>
                      <div className="mo_value">
                        Order price - ₹ {product.productDetail.order_quantity *
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
                      <div className="order_logs_container">
                        {product?.orderLog?.map((log,index) => (
                          <div key={index} className="order_log">{log.status} at {moment(log.dataAndTime).format("lll")}</div>
                          // <div>Order log</div>
                        ))}
                      </div>
                    </div>

                    {  product.status !== "Dispatched" && (product.status === "Delivered" || "cancelled" || "Generated") ? 
                    (
                    <div className="mo_wale_buttons">
                      {product.status !== "Delivered" || "cancelled"? 
                      (
                        <div className="mo_wale_buttons">
                          {product.status !== "Delivered" && product.status !== "cancelled" ? (
                            <div
                              className="mo_button_options"
                              onClick={() =>
                                handleStatusUpdate(product._id, product.status)
                              }
                            >
                              {product.status === "Generated" &&
                                "Ready for dispatch"}
                              {product.status === "Ready for dispatch" &&
                                "Dispatch"}
                              {product.status === "Dispatched" &&
                                "Out for delivery"}
                              {product.status === "Out for delivery" &&
                                "Delivered"}
                            </div>
                            ) : (
                            product.status !== "cancelled" ? <div className="or-deliver">Delivered</div> : <div className="or-cancelled">Cancelled</div> 
                          )
                          }
                        </div>
                      ) : (
                        product.status === "Delivered" ? <div className="or-deliver">Delivered</div> : <div className="or-cancelled">Cancelled</div> 
                      )
                      }
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
  );
};

export default ManageOrders;
