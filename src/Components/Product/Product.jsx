import axios from "axios";
import { useState } from "react";
import "./product.css";
import { addProduct } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {API} from "../../api";

const Product = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    axios.delete(`${API}/products/${id}`);
  };

  return (
    <div className="product">
      <img
        src={product.image}
        alt="product image"
        className="productImage"
        onClick={() => navigate(`/product/${product._id}`)}
        // onClick={() => setModal(true)}
      />
      <div className="productBottom">
        <p className="product_description">{product.description}</p>
        <div className="priceContainer">
          <span className="product_price">₹ {product.price} </span>
          <span className="product_price_discount">
            ₹ {Math.round(product.price * 1.2)}
          </span>
          <br />
          <span className="discountValue">(20% off)</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
