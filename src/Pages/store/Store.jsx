import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./store.css";
import { useSelector } from "react-redux";
import {API} from '../../api';

const Store = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [details, setDetails] = useState({});
  const { sales, orders } = details;

  async function getData() {
    try {
      const { data } = await axios.get(
        `${API}/dashboard/${currentUser._id}`
      );
      setDetails(data);
      console.log(data)
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!currentUser || currentUser.userType !== "Merchant") navigate("/login-merchant");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar />
      <div className="d-container">
        <div className="d-wrapper">
          <div
            className="d-item inventory"
            onClick={() => navigate("/store/inventory")}
          >
            Manage Inventory
          </div>
          <div className="d-item">
            <div className="key">Sales</div>
            <div className="value">₹ {sales?.length ? sales[0].sum : 0}</div>
          </div>
          <div className="d-item" onClick={() => navigate("/manage-orders")}>
            <div className="key">Orders</div>
            <div className="value">{orders}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
