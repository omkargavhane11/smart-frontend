import "./subcategoryPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Product from "../../Components/Product/Product";
import Subcategory from "../../Components/subcategory/Subcategory";
import Footer from "../../Components/footer/Footer";

const SubcategoryPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const productData = async () => {
    const res = await axios.get("https://s-mart-77.herokuapp.com/products");
    setData(res.data);
    setFilteredData(res.data);
  };

  useEffect(() => {
    productData();
  }, []);

  const colorData = [
    { color: "Red" },
    { color: "Green" },
    { color: "Yellow" },
    { color: "Blue" },
    { color: "Magenta" },
    { color: "Yellow" },
  ];

  const brands = ["Addidas", "Puma", "Amazon Basics", "Reeebok"];

  const genders = ["Male", "Female"];

  // filters
  const [lowerPrice, setLowerPrice] = useState(null);
  const [upperPrice, setUpperPrice] = useState(null);
  const [colors, setColors] = useState([]);
  const [brandsFilter, setBrandsFilter] = useState([]);
  const [gendersFilter, setGendersFilter] = useState([]);

  const updateFilters = () => {
    let updatedData = data;

    // color filter
    let colorboxes = document.getElementsByClassName("color-checkbox");
    let checkedBoxes = [];
    for (let i = 0; i < colorboxes.length; i++) {
      if (colorboxes[i].checked) {
        checkedBoxes.push(colorboxes[i].value);
      }
    }

    updatedData = updatedData.filter((item) =>
      checkedBoxes.includes(item.color)
    );

    setFilteredData(updatedData);
    console.log(updatedData);

    // price filter

    // brand filter
    let brandBoxes = document.getElementsByClassName("brand-checkbox");
    let brande_checked_boxes = [];
    for (let i = 0; i < brandBoxes.length; i++) {
      if (brandBoxes[i].checked) {
        brande_checked_boxes.push(brandBoxes[i].value);
      }
    }

    // gender filter
    let gender_boxes = document.getElementsByClassName("gender-checkbox");
    let gender_checked_boxes = [];
    for (let i = 0; i < gender_boxes.length; i++) {
      if (gender_boxes[i].checked) {
        gender_checked_boxes.push(gender_boxes[i].value);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="sb-container">
        <div className="sb-left">
          <div className="filter-item">
            <div className="filter-header">Color</div>
            <div className="filter-body">
              {colorData.map((item, index) => (
                <div className="checkbox_div" key={index}>
                  <input
                    type="checkbox"
                    name="color"
                    value={item.color}
                    className="color-checkbox"
                    onClick={updateFilters}
                  />
                  <span className="colorText">{item.color}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-header">Price</div>
            <div className="filter-body">
              <span className="lower-price">
                Lower Price{" "}
                <input
                  type="number"
                  className="price-input"
                  onChange={(e) => setLowerPrice(e.target.value)}
                />
              </span>
              <span className="upper-price">
                Upper Price{" "}
                <input
                  type="number"
                  className="price-input"
                  onChange={(e) => setUpperPrice(e.target.value)}
                />
              </span>
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-header">Brand</div>
            <div className="filter-body">
              {brands.map((item, index) => (
                <div className="checkbox_div" key={index}>
                  <input
                    type="checkbox"
                    name="brand"
                    value={item}
                    className="brand-checkbox"
                    onClick={updateFilters}
                  />
                  <span className="brandName">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-item">
            <div className="filter-header">Gender</div>
            <div className="filter-body">
              {genders.map((item, index) => (
                <div className="checkbox_div" key={index}>
                  <input
                    type="checkbox"
                    name="brand"
                    value={item}
                    className="gender-checkbox"
                    onClick={updateFilters}
                  />
                  <span className="brandName">{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* <button className="save-filter">Save Filter</button> */}
        </div>
        <div className="sb-right">
          <div className="subcategory-product">
            Showing results for "{params.subcategory}"
          </div>
          <div className="products-container">
            {filteredData.length > 0 ? (
              <div className="category-list-products">
                {filteredData?.map((item) => (
                  <Product product={item} key={item._id} />
                ))}
              </div>
            ) : (
              <div className="no-products-to-display">
                No products to display
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubcategoryPage;
