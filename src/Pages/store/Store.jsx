import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import "./store.css";

const Store = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="d-container">
        <div className="d-wrapper">
          <div className="d-item">
            <div className="key">Sales</div>
            <div className="value">₹ 65000</div>
          </div>
          <div className="d-item">
            <div className="key">Visits</div>
            <div className="value">5000</div>
          </div>
          <div className="d-item">
            <div className="key">Open Orders</div>
            <div className="value">78</div>
          </div>
          <div className="d-item">
            <div className="key">Dispatched Orders</div>
            <div className="value">44</div>
          </div>
          <div className="d-item">
            <div className="key">Delivered Orders</div>
            <div className="value">78</div>
          </div>
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
