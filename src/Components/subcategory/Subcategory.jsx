import "./subcategory.css";
import { useNavigate } from "react-router-dom";

const Subcategory = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="sub_category_wrapper_div">
        <div className="sub_category_wrapper">
          <div className="sub_category_heading">{item?.heading}</div>
          <img
            src={item?.image}
            alt={item?.image}
            className="sub_category_image"
            onClick={() => navigate(`/category/sub/${item?.heading}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Subcategory;
