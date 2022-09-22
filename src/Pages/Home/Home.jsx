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
  const [filteredData, setFilteredData] = useState(data);
  const categoryOption = [
    { heading: "All", image: "", id: Math.random() },
    ...categoryData,
  ];
  const [modal, setModal] = useState(false);

  const [cat_filter, setCat_Filter] = useState(null);

  const productData = async () => {
    const res = await axios.get("https://s-mart-77.herokuapp.com/products");
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    productData();
  }, []);

  // filter function
  const handleChange = () => {
    const getOptions = document.getElementsByClassName("product_category");
    for (let i = 0; i < getOptions.length; i++) {
      if (getOptions[i].selected) {
        setCat_Filter(getOptions[i].value);
      }
    }
    filter_data();
  };

  // filter data
  function filter_data() {
    let updatedData = data;

    // category filter
    if (cat_filter === "All") {
      updatedData = data;
      setFilteredData(updatedData);
    } else {
      if (cat_filter) {
        updatedData = updatedData.filter(
          (item) => item.category === cat_filter
        );
        setFilteredData(updatedData);
      }
    }

    //   // search
    //   // if(search !== null || search !== "") {
    //   //   updatedData = updatedData.filter((item)=> {
    //   //     item.description.includes(search)
    //   //   }
    //   // setFilteredData(updatedData);
    //   // }
  }

  // useEffect filter on value change of filters
  // useEffect(() => {
  //   filter_data();
  // }, [cat_filter]);

  return (
    <div className="home">
      <div className="home_top">
        <Navbar />
      </div>
      <div className="bottom">
        <div className="home_bottom">
          <div className="section_heading">
            Categories <ArrowRightAltIcon className="right_icon" />
          </div>
          <div className="cat_display_container">
            <div className="cat_display">
              {categoryData.map((item, index) => (
                <Category key={index} item={item} />
              ))}
            </div>
          </div>

          {/* <div className="section_heading_div">
            <div className="section_heading">Products</div>
            <div className="filter_category">
              <div className="filter_category_label">Filter by category: </div>
              <select name="cat_option" id="cat_option" onChange={handleChange}>
                {categoryOption.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.heading}
                    className="product_category"
                  >
                    {cat.heading}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="home_right">
            <div className="product_display_container">
              {filteredData?.map((product, index) => (
                <Product key={index} product={product} />
              ))}

              {filteredData.length === 0 && (
                <div className="no_product_to_display">
                  {cat_filter} category products are currently not in stock.
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
