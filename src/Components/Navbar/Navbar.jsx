import { useNavigate } from "react-router-dom";
import "./navbar.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { Button, Badge } from "@mui/material";
import { emptyCart } from "../../redux/cart";
import { useDispatch } from "react-redux";

const Navbar = () => {
  //
  const navigate = useNavigate();

  // redux
  const { quantity } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const emptyCartProducts = () => {
    dispatch(emptyCart());
  };

  //
  const [search, setSearch] = useState("");
  const [isOrderPage, setOrderPage] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/orders") {
      setOrderPage(true);
    }
  }, [window.location.pathname]);

  return (
    <div className="navbar">
      <div className="navbar_left">
        <p className="navbar_brand" onClick={() => navigate("/")}>
          S-Mart
        </p>
        {!user && (
          <p className="newProductLink link" onClick={() => navigate("/add")}>
            Add new product
          </p>
        )}
      </div>
      <div className="navbar_middle">
        <SearchIcon />
        <input
          className="navbar_search"
          type="search"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="navbar_right">
        {/* <Button className="empty_cart_btn" onClick={emptyCartProducts}>Empty cart</Button> */}
        {!isOrderPage ? (
          <div className="orders" onClick={() => navigate("/orders")}>
            Orders
          </div>
        ) : (
          ""
        )}
        <Badge badgeContent={quantity} color="error">
          <ShoppingCartIcon
            className="cart_icon"
            onClick={() => navigate("/cart")}
          />
        </Badge>
      </div>
    </div>
  );
};

export default Navbar;
