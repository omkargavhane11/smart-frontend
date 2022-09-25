import "./cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart";
import { useToast } from "@chakra-ui/react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

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
    toast({
      description: "Order placed successfully ✅",
      status: "info",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  };

  const handle_Add_Address = () => {
    navigate("/login");
  };

  return (
    <div>
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
                  </div>
                )}
              </div>
            )}

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
                  </div>
                  <div className="order_total">
                    <span className="order_total_key">Total order value</span>
                    <span className="orderValue order_total_value">
                      ₹ {total + 50}
                    </span>
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
