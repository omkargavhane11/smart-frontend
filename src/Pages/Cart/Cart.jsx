import Navbar from "../../Components/Navbar/Navbar";
import "./cart.css";
import { useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart";
import { useState } from "react";
import { updateAddress } from "../../redux/user";

const Cart = () => {
  const dispatch = useDispatch();
  // const handleBuy = async (total) => {
  //   const {
  //     data: { key },
  //   } = await axios.get("http://localhost:8080/api/getkey");

  //   const {
  //     data: { order },
  //   } = await axios.post("http://localhost:8080/api/checkout", {
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
  //     callback_url: "http://localhost:8080/api/paymentverification",
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
        deliveryAddress: userAddress,
        user: currentUser,
        contactNo: contactDetail,
      };

      const createOrder = await axios.post(
        "http://localhost:8080/api/order",
        data
      );
      console.log(createOrder.data);
    });
    dispatch(emptyCart());
  };

  const { products, total } = useSelector((state) => state.cart);
  const { currentUser, userAddress, contactDetail } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");

  const saveaddress = () => {
    const data = `${address}, ${city}, ${state}, ${pincode}`;
    dispatch(
      updateAddress({
        currentUser: name,
        addressData: data,
        contactDetail: contact,
      })
    );

    setAddOpen(false);
  };

  const [addOpen, setAddOpen] = useState(false);

  return (
    <>
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
              <div className="address_details">
                Address
                <div>{currentUser}</div>
                <div>{userAddress}</div>
                Contact No :<div>{contactDetail}</div>
                <button onClick={() => setAddOpen(true)}>Edit</button>
              </div>
            )}

            <div className="invoice">
              {products.length > 0 && (
                <>
                  <div className="orderBill">
                    {/* {products.map((item) => (
                      <div className="invoice_item">
                        <span className="in_product_name">
                          {item.description}
                        </span>
                        <span className="in_product_price">
                          {item.price} / {item.unit}
                        </span>
                        <span>*</span>
                        <span className="in_product_order_quantiy">
                          {item.order_quantity} {item.unit}
                        </span>
                        <span>=</span>
                        <span className="in_product_order_value_of_item">
                          ₹ {item.price * item.order_quantity}
                        </span>
                      </div>
                    ))} */}
                    <div className="bill">
                      <div className="bill_item">
                        <span className="ordertotal_key key ">Order Total</span>
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
                      <span className="text">Total order value</span>
                      <span className="divider">|</span>
                      <span className="orderValue">₹ {total}</span>
                    </div>
                  </div>
                  <button className="checkout" onClick={handleBuy}>
                    Place Order
                  </button>
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
              <Button
                variant="contained"
                onClick={() => navigate("/")}
                className="continue_shopping_btn"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
