import "./cart.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import CartItem from "../../Components/Cart/CartItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../redux/cart";
import { useToast } from "@chakra-ui/react";
import {API} from "../../api";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { products, total } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.user);

  // const handleBuy = async (total) => {
  //   const {
  //     data: { key },
  //   } = await axios.get("http://localhost:8080/payment/getkey");

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

  // creating order in DB

  const handleBuy = async () => {
    // console.log("order placed successfully ✅");

    try {
    products.forEach(async (product) => {
      const data = {
        productDetail: product,
        orderTotal: total,
        deliveryAddress: currentUser.address,
        user:currentUser,
        contactNo: currentUser.contactNo,
        orderFor:product.merchantId
      };
      const createOrder = await axios.post(
        `${API}/api/order`,
        data
      );

      if(createOrder.data.msg === "ok"){
        toast({
          description: "Order placed successfully ✅",
          status: "info",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        }); 
      }else{
        toast({
          description: "Failed to place order !",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    });

      dispatch(emptyCart());
           
  } catch (error) {
    toast({
      description: "Failed to place order",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "bottom",
    });
  }

  };

  const handle_Add_Address = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="cart_page">
        <Navbar />
        <div className="cart_container">
          <div className="cart_left">
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
              <div className="address_details_container">
                {products.length > 0 && (
                  <div className="address_details">
                    Delivery For
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
                        <span className="bill_item_key">Sub Total</span>
                        <span className="bill_item_value">₹ {total}</span>
                      </div>
                      <div className="bill_item">
                        <span className="bill_item_key">
                          Shipping Charges{" "}
                        </span>
                        <span className="bill_item_value">₹ 50</span>
                      </div>
                      <div className="bill_item">
                        <span className="bill_item_key">
                          Total order value
                        </span>
                        <span className="bill_item_value">
                          ₹ {total + 50}
                        </span>
                      </div>
                    </div>
                  </div>

                 
                </>
              )}
            </div>
            
            {products.length > 0 && 
            <div style={{width:"100%"}}>
            {currentUser ? (
              <button className="checkout" onClick={handleBuy}>
                Place Order
              </button>
            ) : (
              <button className="checkout" onClick={handle_Add_Address}>
                Add Address
              </button>
            )}
            </div>
            }
          </div>
        </div>

        {/* empty cart display */}
        {!products.length > 0 && (
          <div className="emptyCartDisplay_container">
            <div className="emptyCartDisplay">
              <img
                src="https://shop.millenniumbooksource.com/static/images/cart1.png"
                alt="cart_image"
                className="cart_empty_image"
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
