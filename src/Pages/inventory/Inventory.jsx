import "./inventory.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import List from "../../Components/list/List";

const StoreInventory = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  const productData = async () => {
    const res = await axios.get("https://s-mart-77.herokuapp.com/products");
    setData(res.data.productList);
  };

  useEffect(() => {
    productData();
  }, []);

  useEffect(() => {
    if (!currentUser) navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="store_inventory">
      <div className="searchProduct">
        <p className="navbar_brand" onClick={() => navigate("/")}>
          smartbuy
        </p>
        <button className="return-dashboard" onClick={() => navigate("/store")}>
          Dashboard
        </button>
        {/* <input
          type="text"
          className="searchInput"
          placeholder="Search Product..."
        />
        <button className="search_label">Search</button> */}
        <button onClick={() => navigate("/add")} className="in-new">
          New product
        </button>
      </div>
      <div className="inventory_display">
        {data?.map((item) => (
          <List key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default StoreInventory;
