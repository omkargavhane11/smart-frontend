import "./subcategoryPage.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Product from "../../Components/Product/Product";
// import Subcategory from "../../Components/subcategory/Subcategory";
import Footer from "../../Components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";
import { openFilter, toggleFilter } from "../../redux/helper";
import ProductSkeleton from "../../Components/ProductSkeleton/ProductSkeleton";
import { API } from "../../api";

const SubcategoryPage = () => {
  const isFilterOpen = useSelector((state) => state.helper.filterModalOpen);
  const dispatch = useDispatch();

  const params = useParams();
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  const [colorData, setColorData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const productData = async () => {
    const res = await axios.get(
      `${API}/products/subcategory/${params.subcategory}`
    );
    setData(res.data.productList);
    setFilteredData(res.data.productList);
    setColorData(res.data.colorFilter);
    setBrandData(res.data.brandFilter);
  };

  useEffect(() => {
    productData();
    // eslint-disable-next-line
  }, []);

  // const genders = ["male", "female"];

  // filters
  const [lowerPrice, setLowerPrice] = useState(0);
  const [upperPrice, setUpperPrice] = useState(Infinity);
  // const [colors, setColors] = useState([]);
  // const [brandsFilter, setBrandsFilter] = useState([]);
  // const [gendersFilter, setGendersFilter] = useState([]);

  const updateFilters = () => {
    let updatedData = data;

    // color filter
    let colorboxes = document.getElementsByClassName("color-checkbox");
    let checkedBoxes = [];
    for (let i = 0; i < colorboxes.length; i++) {
      if (colorboxes[i].checked) {
        checkedBoxes.push(colorboxes[i].value.toLowerCase());
      }
    }

    if (checkedBoxes.length > 0) {
      updatedData = updatedData?.filter((item) =>
        checkedBoxes.includes(item.color.toLowerCase())
      );
    }
    setFilteredData(updatedData);
    console.log(updatedData);

    // price filter
    if (lowerPrice) {
      updatedData = updatedData?.filter((item) => item.price > lowerPrice);
      setFilteredData(updatedData);
    }

    if (upperPrice) {
      updatedData = updatedData?.filter((item) => item.price < upperPrice);
      setFilteredData(updatedData);
    }

    // brand filter
    let brandBoxes = document.getElementsByClassName("brand-checkbox");
    let brande_checked_boxes = [];
    for (let i = 0; i < brandBoxes.length; i++) {
      if (brandBoxes[i].checked) {
        brande_checked_boxes.push(brandBoxes[i].value.toLowerCase());
      }
    }

    if (brande_checked_boxes.length > 0) {
      updatedData = updatedData?.filter((item) =>
        brande_checked_boxes.includes(item.brand.toLowerCase())
      );
    }
    setFilteredData(updatedData);
    console.log(updatedData);

    // gender filter
    let gender_boxes = document.getElementsByClassName("gender-checkbox");
    let gender_checked_boxes = [];
    for (let i = 0; i < gender_boxes.length; i++) {
      if (gender_boxes[i].checked) {
        gender_checked_boxes.push(gender_boxes[i].value);
      }
    }
  };

  useEffect(() => {
    updateFilters();
    // eslint-disable-next-line
  }, [lowerPrice, upperPrice]);

  const [filterOpen, setFilterOpen] = useState(false);

  const product_skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div>
      <Navbar />
      <div className="sb-container">

        <div className={filterOpen ? "sb-left active" : "sb-left"}>
          <div className="filter-wrapper">

            <div className="filter_top">
              <CloseIcon
                className="fm_close_icon"
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </div>

            <div className="filter-section-heading">FILTERS</div>

            <div className="filter-item">
              <div className="filter-header">Color</div>
              <div className="filter-body">
                {colorData?.map((item, index) => (
                  <div className="checkbox_div" key={index}>
                    <input
                      type="checkbox"
                      name="color"
                      value={item}
                      className="color-checkbox"
                      onClick={updateFilters}
                    />
                    <span className="colorText">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-header">Price</div>
              <div className="filter-body price">
                <span className="lower-price">Lower Price </span>
                <input
                  type="number"
                  className="price-input"
                  onChange={(e) => setLowerPrice(e.target.value)}
                  value={lowerPrice}
                />
                <span className="upper-price">Upper Price </span>
                <input
                  type="number"
                  className="price-input"
                  onChange={(e) => setUpperPrice(e.target.value)}
                  value={upperPrice}
                />
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-header">Brand</div>
              <div className="filter-body">
                {brandData?.map((item, index) => (
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
          </div>
        </div>

        <div className="sb-right">
          {filteredData?.length && (
            <div className="subcategory-product">
              Showing results for <strong>{params.subcategory}</strong>
              <FilterAltIcon
                className="filterIcon"
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </div>
          )}
          <div className="products-container">
            <>
              {filteredData?.length > 0 && data !== null && (
                <div className="category-list-products">
                  {filteredData?.map((item) => (
                    <Product product={item} key={item._id} />
                  ))}
                </div>
              )}
              {filteredData?.length === 0 && data !== null && (
                <div className="no-products-to-display">
                  No products to display
                </div>
              )}
              {filteredData === null && data === null && (
                <div className="category-list-products">
                  {product_skeleton.map((item,index) => (
                    <ProductSkeleton key={index} />
                  ))}
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoryPage;
