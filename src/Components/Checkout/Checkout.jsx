import Navbar from "../Navbar/Navbar";
import "./Checkout.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "../Cart/CartItem";
import { Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../redux/user";
import { emptyCart } from "../../redux/cart";
import { API } from "../../api";

const Checkout = () => {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const { products, total } = useSelector((state) => state.cart);
  const { userAddress, contactDetail, currentUser } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // address
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");

  // creating order in DB
  const handleBuy = async () => {
    // const data = {
    //   productDetail: products[0],
    //   orderTotal: total,
    //   deliveryAddress: userAddress,
    //   user: currentUser,
    //   contactNo: contactDetail,
    // };
    
    // const createOrder = await axios.post(
    //   `${API}/api/order`,
    //   data
    //   );
    //   // console.log(createOrder.data);
    //   if (createOrder.data.msg === "ok") {
    //     dispatch(emptyCart());
    //     setIsOrderPlaced(true);
    //     console.log("order placed successfully ✅");
    // }

    console.log(products[0])
  };

  // save address information
  const saveaddress = () => {
    const data = `${address}, ${city}, ${state}, ${pincode}`;
    dispatch(
      updateAddress({
        currentUser: name,
        addressData: data,
        contactDetail: contact,
      })
    );
  };

  return (
    <div className="checkout_div">
      <Navbar />

      {!isOrderPlaced && (
        <div className="checkoutContainer">
          {/* <div className="address_box">
            <div className="address_box_wrapper">
              <div className="input_item">
                <label htmlFor="name-add">Name</label>
                <input
                  className="name-add"
                  id="name-add"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="input_item">
                <label htmlFor="address-add">Address</label>
                <input
                  className="address-add"
                  id="address-add"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
              <div className="input_item">
                <label htmlFor="state-add">State</label>
                <input
                  className="state-add"
                  id="state-add"
                  type="text"
                  onChange={(e) => setState(e.target.value)}
                ></input>
              </div>
              <div className="input_item">
                <label htmlFor="city-add">City</label>
                <input
                  className="city-add"
                  id="city-add"
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
              <div className="input_item">
                <label htmlFor="pincode-add">Pincode</label>
                <input
                  className="pincode-add"
                  id="pincode-add"
                  type="number"
                  length={6}
                  onChange={(e) => setPincode(e.target.value)}
                ></input>
              </div>
              <div className="input_item">
                <label htmlFor="Contact-number-add">Contact-number</label>
                <input
                  className="Contact-number-add"
                  id="Contact-number-add"
                  type="number"
                  onChange={(e) => setContact(e.target.value)}
                ></input>
              </div>
              <button className="save-add" onClick={saveaddress}>
                Update Address
              </button>
            </div>
          </div> */}
          <div className="checkout_map_items">
            {products?.map((product) => (
              <div className="cart_product" key={product._id}>
                <div className="cart_product_container">
                  <div className="cart_product_img_container">
                    <img
                      src={product.image}
                      alt="product image"
                      className="cart_productImage"
                    />
                  </div>
                  <div className="cart_productBottom">
                    <div className="cart_product_description">
                      {product.description}
                    </div>
                    <div className="cart_product_price">
                      ₹ {product.price}/ {product.unit}
                    </div>
                    <div className="quantity">
                      Order Size - {product.order_quantity} {product.unit}
                    </div>
                    <div className="order_value">
                      Order price - ₹ {product.order_quantity * product.price}
                    </div>
                    {/* <button
                      className="cart btn"
                      // onClick={() => handleRemoveProduct(product)}
                    >
                      Remove
                    </button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout_products_invoice">
            <div className="address_details">
              Delivering to :<div>{currentUser}</div>
              <div>{userAddress}</div>
              Contact No :<div>{contactDetail}</div>
            </div>
            <div className="cart_container">
              {products.length > 0 && (
                <>
                  <div className="orderBill">
                    <div className="text">Total order value</div>
                    <div className="divider">|</div>
                    <div className="orderValue">₹ {total}</div>
                  </div>
                  <button className="checkout" onClick={handleBuy}>
                    Place order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {isOrderPlaced && (
        <div className="orderPlaced">
          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTj9RgSqVnM0tvuGKFUHCvmCIPOXJ54JXZJqKcaP8eLg&s" /> */}
          <span className="icon">✅</span>
          <div className="heading_orderPlaced">Order Placed Succesfully</div>
          <div className="option_buttons">
            <Button
              className="view_order_btn"
              variant="outlined"
              onClick={() => navigate("/orders")}
            >
              View orders
            </Button>
            <span className="or">or</span>
            <Button
              className="view_order_btn"
              variant="outlined"
              onClick={() => navigate("/")}
            >
              Continue shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
