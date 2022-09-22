import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./subcategory.css";

const Subcategory = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="category_wrapper_div">
        <div className="category_wrapper">
          <div className="category_heading">{item?.heading}</div>
          <img
            src={item?.image}
            alt={item?.image}
            className="category_image"
            onClick={() => navigate(`/category/sub/${item?.heading}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Subcategory;
