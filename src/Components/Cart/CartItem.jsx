import axios from "axios";
import { useState } from "react";
import "./cartItem.css";
import { addProduct, removeProduct } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartItem = ({ product }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    // dispatch(removeProduct(id));
    axios.delete(`http://localhost:8080/products/${id}`);
  };

  const handleBuy = () => {};

  const handleRemoveProduct = async (item) => {
    dispatch(removeProduct(item));
  };

  return (
    <div className="cart_product">
      <div className="cart_product_container">
        <div className="cart_product_img_container">
          <img
            src={product.url}
            alt="product image"
            className="cart_productImage"
          />
        </div>
        <div className="cart_productBottom">
          <div className="cart_product_description">{product.description}</div>
          <div className="cart_product_price">₹ {product.price}</div>
          <button
            className="cart btn"
            onClick={() => handleRemoveProduct(product)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
