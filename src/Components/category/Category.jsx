import { useNavigate } from "react-router-dom";
import "./category.css";

const Category = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="category_wrapper_div">
      <div className="category_wrapper">
        <div className="category_heading">{item?.heading}</div>
        <img
          src={item?.image}
          alt={item?.image}
          className="category_image"
          onClick={() => navigate(`/category/${item?.heading}`)}
        />
      </div>
    </div>
  );
};

export default Category;
