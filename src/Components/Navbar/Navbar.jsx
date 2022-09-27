import { useNavigate, useParams } from "react-router-dom";
import "./navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { emptyCart } from "../../redux/cart";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user";
import { closeFilter, toggleFilter } from "../../redux/helper";
import NavSearch from "../../Components/navSearch/Navsearch";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({ searchInput }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(false);

  // redux
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const isFilterOpen = useSelector((state) => state.helper.filterModalOpen);

  const dispatch = useDispatch();

  const emptyCartProducts = () => {
    dispatch(emptyCart());
  };

  //
  const [search, setSearch] = useState(searchInput ? searchInput : "");
  const [isOrderPage, setOrderPage] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/orders") {
      setOrderPage(true);
    }
  }, [window.location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar_left">
          <p className="navbar_brand" onClick={() => navigate("/")}>
            smartbuy
          </p>
        </div>
        <div className="navbar_middle">
          <SearchIcon />
          <input
            className="navbar_search"
            type="search"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            className="nav_search_btn"
            onClick={() => {
              if (search.length) {
                navigate(`/products/search/${search}`);
              }
            }}
          >
            Search
          </button>
        </div>
        <div className="navbar_right">
          {!searchBoxOpen ? (
            <SearchIcon
              className="search_bar_icon"
              onClick={() => setSearchBoxOpen(!searchBoxOpen)}
            />
          ) : (
            <div className="search_box_modal">
              <div className="search_box_modal_wrapper">
                <div className="search_box_top">
                  <div>Search product</div>
                  <div
                    className="close_searchBox_btn"
                    onClick={() => {
                      setSearchBoxOpen(!searchBoxOpen);
                    }}
                  >
                    <CloseIcon />
                  </div>
                </div>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  className="search_box_modal_input"
                />{" "}
                <div
                  className="search_searchBox_btn"
                  onClick={() => {
                    if (search.length) {
                      navigate(`/products/search/${search}`);
                    } else {
                      alert("Enter something to search !");
                    }
                    // console.log("searching...");
                  }}
                >
                  Search
                </div>
              </div>
            </div>
          )}
          {!isOrderPage ? (
            <div className="orders" onClick={() => navigate("/orders")}>
              Orders
            </div>
          ) : (
            ""
          )}
          <div className="quantity_badge_div">
            <ShoppingCartIcon
              className="cart_icon"
              onClick={() => navigate("/cart")}
            />

            {quantity > 0 && <span className="quantity_badge">{quantity}</span>}
          </div>

          <div className="user_avatar">
            <span className="username">{user?.name.split(" ")[0]}</span>
            {/* <span className="firstname">{user}</span> */}
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-vWL06qbKx_pfPr-bFrIjw1t7y5ogYgIiNITgPVmXcHS6DSN3T793hhNAWRngBnR3dec&usqp=CAU"
              alt="user"
              className="user_image"
              onClick={() => setOpen(!open)}
            />
            {open && (
              <div className="logout_modal">
                {user?.isAdmin && (
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
                {user?.isAdmin && (
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
      </div>
    </div>
  );
};

export default Navbar;
