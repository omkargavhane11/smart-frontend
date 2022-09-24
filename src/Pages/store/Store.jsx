import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./store.css";
import { useSelector } from "react-redux";

const Store = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const { sales, orders, openOrder } = details;

  async function getData() {
    try {
      const { data } = await axios.get(
        "https://s-mart-77.herokuapp.com/dashboard"
      );
      setDetails(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-container">
        <div className="d-wrapper">
          <div className="d-item">
            <div className="key">Sales</div>
            <div className="value">₹ {sales}</div>
          </div>
          <div className="d-item" onClick={() => navigate("/admin/orders")}>
            <div className="key">Orders</div>
            <div className="value">{orders}</div>
          </div>
          {/* <div className="d-item">
            <div className="key">Dispatched Orders</div>
            <div className="value">{orders}</div>
          </div>
          <div className="d-item">
            <div className="key">Delivered Orders</div>
            <div className="value">78</div>
          </div> */}
          <div
            className="d-item inventory"
            onClick={() => navigate("/store/inventory")}
          >
            Manage Inventory
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
