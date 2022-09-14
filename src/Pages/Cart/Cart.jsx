import Navbar from "../../Components/Navbar/Navbar";
import "./cart.css";
import { useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart";
import { useState } from "react";
import { updateAddress } from "../../redux/user";
import { Button } from "@mui/material";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const handleBuy = async (total) => {
  //   const {
  //     data: { key },
  //   } = await axios.get("https://s-mart-77.herokuapp.com/api/getkey");

  //   const {
  //     data: { order },
  //   } = await axios.post("https://s-mart-77.herokuapp.com/api/checkout", {
  //     amount: total,
  //   });

  //   const options = {
  //     key, // Enter the Key ID generated from the Dashboard
  //     amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  //     currency: "INR",
  //     name: "Acme Corp",
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     callback_url: "https://s-mart-77.herokuapp.com/api/paymentverification",
  //     prefill: {
  //       name: "Gaurav Kumar",
  //       email: "gaurav.kumar@example.com",
  //       contact: "9999999999",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };
  //   const razor = new window.Razorpay(options);
  //   razor.open();
  // };

  // const handleBuy = () => {
  //   navigate("/order/checkout");
  // };

  // creating order in DB
  const handleBuy = async () => {
    console.log("order placed successfully ✅");
    products.forEach(async (product) => {
      const data = {
        productDetail: product,
        orderTotal: total,
        deliveryAddress: currentUser.address,
        user: currentUser,
        contactNo: currentUser.contactNo,
      };
      const createOrder = await axios.post(
        "https://s-mart-77.herokuapp.com/api/order",
        data
      );
      console.log(createOrder.data);
    });
    dispatch(emptyCart());
  };

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  const saveaddress = () => {
    const data = `${address}, ${city}, ${state}, ${pincode}`;
    dispatch(
      updateAddress({
        currentUser: currentUser.name,
        userAddress: currentUser.address,
        contactDetail: currentUser.contactNo,
      })
    );

    setAddOpen(false);
  };

  const handle_Add_Address = () => {
    navigate("/login");
  };

  return (
    <div>
      {addOpen && (
        <div className="address_box">
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
            <button className="cancel_update" onClick={() => setAddOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="cart_page">
        <Navbar />
        <div className="cart_left">
          <div className="cart_container">
            {products?.map((product, index) => (
              <CartItem key={index} product={product} />
            ))}
          </div>
          <div className="cart_right">
            {products.length > 0 && (
              <button
                className="empty_cart"
                onClick={() => dispatch(emptyCart())}
                // onClick={() => console.log(products)}
              >
                Empty Cart
              </button>
            )}
            {currentUser && (
              <div>
                {products.length > 0 && (
                  <div className="address_details">
                    <div>{currentUser?.name}</div>
                    Delivery Address
                    <div>{currentUser?.address}</div>
                    Contact No :<div>{currentUser?.contactNo}</div>
                    {/* <button
                      className="edit_button"
                      onClick={() => setAddOpen(true)}
                    >
                      Edit
                    </button> */}
                  </div>
                )}
              </div>
            )}

            {/* {currentUser && (
              <div>
                {products.length > 0 && (
                  <div className="address">
                    I apeear when user is looged in there are items in cart
                  </div>
                )}
              </div>
            )} */}

            <div className="invoice">
              {products.length > 0 && (
                <>
                  <div className="orderBill">
                    <div className="bill">
                      <div className="bill_item">
                        <span className="ordertotal_key key">Order Total</span>
                        <span className="ordertotal value">₹ {total}</span>
                      </div>
                      <div className="bill_item">
                        <span className="shipping_charges ordertotal_key key">
                          Shipping Charges{" "}
                        </span>
                        <span className="ordertotal value">₹ 50</span>
                      </div>
                      <div className="bill_item"></div>
                    </div>
                    <div className="order_total">
                      <span className="order_total_key">Total order value</span>
                      <span className="orderValue order_total_value">
                        ₹ {total + 50}
                      </span>
                    </div>
                  </div>
                  {currentUser ? (
                    <button className="checkout" onClick={handleBuy}>
                      Place Order
                    </button>
                  ) : (
                    <button className="checkout" onClick={handle_Add_Address}>
                      Add Address
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {!products.length > 0 && (
          <div className="emptyCartDisplay_container">
            <div className="emptyCartDisplay">
              <img
                src="https://shop.millenniumbooksource.com/static/images/cart1.png"
                alt="cart_image"
              />
              <button
                variant="contained"
                onClick={() => navigate("/")}
                className="continue_shopping_btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
