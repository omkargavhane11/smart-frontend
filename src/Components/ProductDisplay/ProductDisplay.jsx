import axios from "axios";
import Navbar from "../Navbar/Navbar";
import "./ProductDisplay.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { addProduct } from "../../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {API} from "../../api";
import Product from "../Product/Product";

const ProductDisplay = () => {
  const params = useParams();
  const navigate = useNavigate();
  // main display product
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  // related products
  const [similar_products,setSimilar_products] = useState([]);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const getProductData = async () => {
    const { data } = await axios.get(
      `${API}/products/${params.productId}`
    );
    setProduct(data);
    console.log(data);
    getSimilarProducts(data.category,data.subcategory);
  };

  const getSimilarProducts = async(category, subcategory) =>{
    const { data } = await axios.get(
      `${API}/products/subcategory/${subcategory}`
    );

    let unique = data.productList;
    let newData = unique.filter((r) => r._id !== params.productId)

    setSimilar_products(newData);
  }

  useEffect(() => {
    getProductData();
  }, [params.productId]);

  const handleAddToCart = async (item) => {
    if (quantity) {
      dispatch(addProduct({ ...item, order_quantity: quantity }));
    } else {
      alert("Add quantity");
    }
  };

  const handleBuy = async (product) => {
    if (quantity) {
      dispatch(addProduct({ ...product, order_quantity: quantity }));
      navigate("/cart");
    } else {
      alert("Add quantity");
    }
  };

  const handleCount = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity(quantity - 1);
    }
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
            <img src={product.image} alt="" className="displayImage" />
          </div>

          <div className="productInfoCont">
            <div className="productInfoWrapper">
              <div className="productInfo">{product.description}</div>

              <div className="productPrice_container">
                <span className="">₹ {product.price}</span>
                <span className="product_price_discount">
                  ₹ {Math.round(product.price * 1.2)}
                </span>
                <span className="discountValue">(20% off)</span>
              </div>
              <div className="select_quantity">
                <label htmlFor="">Quantity</label>

                <span className="count">
                  <button onClick={() => handleCount("minus")}>-</button>
                  <span className="quantity_input">{quantity}</span>
                  <button onClick={() => handleCount("plus")}>+</button>
                </span>
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
                    className="addToCart_btn"
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
        {/*  */}
      </div>
      {/* <hr className="section_divider"></hr> */}
      <div className="single_related_products">
        <div className="single_related_products_wrapper">
        <div className="single_related_heading">Products related to this item</div>
        <div className="single_related_mapper">
          {similar_products.map((p,index) => (
            <Product product={p} key={index}/>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
