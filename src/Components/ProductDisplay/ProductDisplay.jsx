import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./ProductDisplay.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDisplay = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState("");

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const getProductData = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/products/${params.productId}`
    );
    setProduct(data);
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleAddToCart = async (item) => {
    dispatch(addProduct(item));
  };

  const handleBuy = async (product) => {
    dispatch(addProduct(product));
    navigate("/order/checkout");
  };

  return (
    <div className="single_product_display">
      <Navbar />
      <div className="productDisplayContainer">
        <div className="productDisplayWrapper">
          <div className="imageDisplayCont">
            <span className="backIcon" onClick={() => navigate("/")}>
              <ArrowBackIcon />
            </span>
            <img src={product.url} alt="" className="displayImage" />
          </div>

          <div className="productInfoCont">
            <div className="productInfoWrapper">
              <div className="productInfo">{product.description}</div>

              <div className="productPrice_container">
                <span className="product_price">₹ {product.price}</span>
                <span className="product_price_discount">
                  ₹ {Math.round(product.price * 0.8)}
                </span>
                <span className="discountValue">(20% off)</span>
              </div>

              <div className="product_buttons">
                <div className="buy_add">
                  <button
                    className="buy btn"
                    onClick={() => handleBuy(product)}
                  >
                    Buy
                  </button>
                  <button
                    className="cart btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                  {/* {isAdmin && <button className="delete btn">Delete</button>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
