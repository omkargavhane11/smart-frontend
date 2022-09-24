import "./manageOrders.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const ManageOrders = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [orders, setOrders] = useState([]);
  const [filterData, setFilteredData] = useState([]);

  const [type, setType] = useState("all");

  const getData = async () => {
    const data = await axios.get(
      `https://s-mart-77.herokuapp.com/api/order/${currentUser?._id}`
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

  function filterDataFunction() {
    let og_data = orders;
    if (type !== "All") {
      let updatedFilter = og_data.filter((item) => item.status === type);
      setFilteredData(updatedFilter);
    } else {
      setFilteredData(orders);
    }
  }

  useEffect(() => {
    filterDataFunction();
  }, [type]);

  const handleStatusUpdate = async (id, status) => {
    let data;
    if (status === "Generated") {
      data = "Dispatched";
    } else if (status === "Dispatched") {
      data = "Out for delivery";
    } else if (status === "Out for delivery") {
      data = "Delivered";
    }

    try {
      const updateStatus = await axios.put(
        `https://s-mart-77.herokuapp.com/api/order/${id}`,
        {
          status: data,
        }
      );
      console.log(updateStatus.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const [filterTypes, setFilterTypes] = useState([
    { type: "All", selected: true },
    { type: "Generated", selected: false },
    { type: "Dispatched", selected: false },
    { type: "Out for delivery", selected: false },
    { type: "Delivered", selected: false },
  ]);

  const handleTypeSelect = (type) => {
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
  };

  return (
    <div className="mo">
      <div className="mo-topbar">
        <button className="mo-back-to-store" onClick={() => navigate("/store")}>
          Back
        </button>
        <div className="mo-heading">Orders</div>
      </div>
      <div className="mo-body">
        <div className="mo-filter-types">
          {filterTypes.map((item, index) => (
            <div
              className={
                item.selected === true
                  ? "mo-filter-item-selected"
                  : "mo-filter-item"
              }
              key={index}
              onClick={() => handleTypeSelect(item.type)}
            >
              {item.type}{" "}
              <span className="order-status-count">
                ({orders.filter((or) => or.status === item.type).length})
              </span>
            </div>
          ))}
        </div>
        <div className="mo-order-display">
          {filterData.length !== 0 ? (
            <div className="orderProduct">
              {filterData?.map((product, index) => (
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

                      <div className="order_wale_buttons">
                        {product.status !== "Delivered" ? (
                          <button
                            className="cancel_order"
                            onClick={() =>
                              handleStatusUpdate(product._id, product.status)
                            }
                          >
                            {product.status === "Generated" &&
                              "Update as 'Dispatched'"}
                            {product.status === "Dispatched" &&
                              "Update as 'Out for delivery'"}
                            {product.status === "Out for delivery" &&
                              "Update as 'Delivered'"}
                          </button>
                        ) : (
                          <div className="or-deliver">Delivered</div>
                        )}
                      </div>
                    </div>
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
