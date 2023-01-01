import { useNavigate } from "react-router-dom";
import Subcategory from "../subcategory/Subcategory";
import "./category.css";

const Category = ({ item }) => {
  const navigate = useNavigate();
  // console.log(item.subCategory);
  
  return (
    <div className="c_category_wrapper_div">
      <div className="category_wrapper">
        <div className="category_heading">{item?.heading}</div>
        <div className="category_mapper">
          {item.subCategory.map((sub,index) =>(
            <Subcategory item={sub} key={index}/>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
