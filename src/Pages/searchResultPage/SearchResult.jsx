import "./searchResult.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Product from "../../Components/Product/Product";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseIcon from "@mui/icons-material/Close";

const SearchResult = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // console.log(params.searchItem);

  const [colorData, setColorData] = useState([]);
  const [brandData, setBrandData] = useState([]);

  const productData = async () => {
    const res = await axios.get(
      `https://s-mart-77.herokuapp.com/products/search/${params.searchItem}`
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
      updatedData = updatedData.filter((item) =>
        checkedBoxes.includes(item.color.toLowerCase())
      );
    }
    setFilteredData(updatedData);

    // price filter
    if (lowerPrice) {
      updatedData = updatedData.filter((item) => item.price > lowerPrice);
      setFilteredData(updatedData);
    }

    if (upperPrice) {
      updatedData = updatedData.filter((item) => item.price < upperPrice);
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
      updatedData = updatedData.filter((item) =>
        brande_checked_boxes.includes(item.brand.toLowerCase())
      );
    }
    setFilteredData(updatedData);

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

  return (
    <>
      <Navbar searchInput={params.searchItem} />
      <div className="search-container">
        <div className={filterOpen ? "sb-left active" : "sb-left"}>
          <div className="filter-wrapper">
            <div className="filter_top">
              <CloseIcon
                className="fm_close_icon"
                onClick={() => setFilterOpen(!filterOpen)}
              />
            </div>
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
              <div className="filter-body">
                <span className="lower-price">
                  Lower Price{" "}
                  <input
                    type="number"
                    className="price-input"
                    onChange={(e) => setLowerPrice(e.target.value)}
                    value={lowerPrice}
                  />
                </span>
                <span className="upper-price">
                  Upper Price{" "}
                  <input
                    type="number"
                    className="price-input"
                    onChange={(e) => setUpperPrice(e.target.value)}
                    value={upperPrice}
                  />
                </span>
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
            {/* <div className="filter-item">
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
                  </div> */}
            {/* <button className="save-filter">Save Filter</button> */}
          </div>
        </div>

        <div className="resultsPage">
          <div className="subcategory-product">
            <div className="sr-page-header">
              {data?.length ? data?.length : 0} results found for "
              {params.searchItem}"
            </div>
            {data?.length && (
              <FilterAltIcon
                className="filterIcon"
                onClick={() => setFilterOpen(!filterOpen)}
              />
            )}
          </div>

          <div className="products-container">
            {filteredData?.length > 0 ? (
              <div className="category-list-products">
                {filteredData?.map((item) => (
                  <Product product={item} key={item._id} />
                ))}
              </div>
            ) : (
              <>
                <div className="no-products-to-display">
                  No products to display. Please try with another spelling.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
