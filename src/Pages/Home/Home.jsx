import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../../Components/Product/Product";
import Slider from "@mui/material/Slider";
import { categoryData, items } from "../../data";
import Category from "../../Components/category/Category";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Footer from "../../Components/footer/Footer";

const Home = () => {
  const [data, setData] = useState([]);
  // const [filteredData, setFilteredData] = useState(data);

  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(0);

  const productData = async () => {
    const res = await axios.get("http://localhost:8080/products");
    setData(res.data);
    // setFilteredData(res.data);
  };

  useEffect(() => {
    productData();
  }, []);

  // const [upperPrice, setUpperPrice] = useState(null);
  // const [lowerPrice, setLowerPrice] = useState(null);

  // filter function
  // const handleChange = () => {
  //   var updatedData = data;
  //   if (upperPrice) {
  //     updatedData = updatedData.filter(
  //       (product) => product.price <= upperPrice
  //     );
  //     setFilteredData(updatedData);
  //   }
  //   if (lowerPrice) {
  //     updatedData = updatedData.filter(
  //       (product) => product.price >= lowerPrice
  //     );
  //     setFilteredData(updatedData);
  //   }
  // };

  // useEffect filter on value change of filters
  // useEffect(() => {
  //   handleChange();
  // }, [upperPrice, lowerPrice]);

  return (
    <div className="home">
      {modal && (
        <div className="product_modal_component">
          <ProductModal modal={modal} setModal={setModal} />
        </div>
      )}
      <div className="home_top">
        <Navbar />
      </div>
      <div className="bottom">
        <div className="home_bottom">
          <div className="section_heading">
            Categories <ArrowRightAltIcon className="right_icon" />
          </div>
          <div className="cat_display">
            {categoryData.map((item, index) => (
              <Category key={index} item={item} />
            ))}
          </div>
          <div className="section_heading_div">
            <div className="section_heading">Products</div>
            <div className="filter_category">
              <div className="filter_category_label">Filter by category: </div>
              <select name="" id="">
                {categoryData.map((cat) => (
                  <option value={cat.heading}>{cat.heading}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="home_right">
            <div className="product_display_container">
              {data?.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  counter={counter}
                  setCounter={setCounter}
                  setModal={setModal}
                  modal={modal}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

const ProductModal = ({ modal, setModal }) => {
  return (
    <div className="product_modal">
      <div className="product_modal_wrapper">
        <div className="pm_top">
          <img src="" alt="" className="pm_top_img" />
          <div className="pm_top_desc">
            <div className="product_name"></div>
            <div className="product_price"></div>
          </div>
        </div>
        <div className="pm_bottom">
          <div className="order_form">
            <label htmlFor="select">Select Quantity</label>
            <select className="cat_key" id="select">
              <option value="Value">Value</option>
              <option value="Value">Value</option>
              <option value="Value">Value</option>
              <option value="Value">Value</option>
              <option value="Value"></option>
            </select>
          </div>
        </div>
      </div>
      <button className="close_modal_btn" onClick={() => setModal(false)}>
        Close
      </button>
    </div>
  );
};
