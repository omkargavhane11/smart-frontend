import "./inventory.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import List from "../../Components/list/List";
import { API } from "../../api";
import Navbar from "../../Components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { closeNavModal, toggleNavModal } from "../../redux/helper";
import { emptyCart } from "../../redux/cart";
import { logout } from "../../redux/user";

const StoreInventory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.helper.navModalOpen);
  const user = useSelector((state) => state.user.currentUser);
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  const productData = async () => {
    const res = await axios.get(`${API}/products/inventory/${currentUser._id}`);
    setData(res.data.productList);
  };

  useEffect(() => {
    productData();
  }, []);

  useEffect(() => {
    if (!currentUser) navigate("/");
    // eslint-disable-next-line
  }, []);

  const emptyCartProducts = () => {
    dispatch(emptyCart());
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(closeNavModal())
    navigate("/login");
  };

  document.addEventListener("click", (e) => {
    console.log({id: e.target.id})
    if(e.target.id !== "navbar_avatar"){
        dispatch(closeNavModal())
    }
    e.stopPropagation();
  })

  return (
    <div className="store_inventory">
      <>
      <div className="searchProduct">
        <p className="navbar_brand" onClick={() => navigate("/")}>
          smartbuy
        </p>
        <button className="return-dashboard" onClick={() => navigate("/store")}>
          Dashboard
        </button>
        <button onClick={() => navigate("/add")} className="in-new">
          New product
        </button>
        <div className="user_avatar">
            <span className="username">{user?.name.split(" ")[0]}</span>
            {/* <span className="firstname">{user}</span> */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-vWL06qbKx_pfPr-bFrIjw1t7y5ogYgIiNITgPVmXcHS6DSN3T793hhNAWRngBnR3dec&usqp=CAU"
              alt="user"
              className="user_image"
              onClick={()=> dispatch(toggleNavModal())}
              id="navbar_avatar"
            />
            {open && (
              <div className="logout_modal">
                {user?.userType === "Merchant" && (
                  <>
                    {/* <div className="modal_item">Dashboard</div> */}
                    <div
                      className="modal_item"
                      onClick={() => navigate("/store")}
                    >
                      My Store
                    </div>
                  </>
                )}
                {/* <div className="modal_item">Profile</div> */}
                {user?.userType === "Merchant" && (
                  <div className="modal_item" onClick={() => navigate("/add")}>
                    Add new product
                  </div>
                )}
                <div className="modal_item" onClick={emptyCartProducts}>
                  Empty Cart
                </div>
                <div
                  className="modal_item orders_small_screen"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </div>
                {user ? (
                  <div className="modal_item" onClick={handleLogout}>
                    Logout
                  </div>
                ) : (
                  <div
                    className="modal_item"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </div>
                )}
              </div>
            )}
      </div>
      </div>
      <div className="inventory_display">
        {data?.map((item) => (
          <List key={item._id} product={item} />
          ))}
        {data.length === 0 && <h2>No inventory to display !</h2>}
      </div>
      
      </>
    </div>
  );
};

export default StoreInventory;
