import Navbar from "../../Components/Navbar/Navbar";
import "./cart.css";
import { useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
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

  const handleBuy = () => {
    navigate("/order/checkout");
  };
  const { products, total } = useSelector((state) => state.cart);

  const navigate = useNavigate();

  return (
    <div className="cart">
      <Navbar />
      <div className="cart_container">
        {products?.map((product) => (
          <CartItem key={product._id} product={product} />
        ))}

        {products.length > 0 && (
          <>
            <div className="orderBill">
              <div className="text">Total order value</div>
              <div className="divider">|</div>
              <div className="orderValue">₹ {total}</div>
            </div>
            <button className="checkout" onClick={() => handleBuy(total)}>
              Proceed to checkout
            </button>
          </>
        )}
        {!products.length > 0 && (
          <div className="emptyCartDisplay">
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
    </div>
  );
};

export default Cart;
