import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../Components/Product/Product";
import "./inventory.css";

const StoreInventory = () => {
  const [data, setData] = useState([]);

  const productData = async () => {
    const res = await axios.get("https://s-mart-77.herokuapp.com/products");
    setData(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    productData();
  }, []);

  return (
    <div className="store_inventory">
      <div className="searchProduct">
        <input
          type="text"
          className="searchInput"
          placeholder="Search Product..."
        />
        <button className="search_label">Search</button>
      </div>
      <div className="inventory_display">
        {data.map((item) => (
          <Product key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default StoreInventory;
