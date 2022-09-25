import "./categoryPage.css";
import { useParams } from "react-router-dom";
// import Category from "../../Components/category/Category";
import { categoryData } from "../../data.js";
import Subcategory from "../../Components/subcategory/Subcategory";
import Navbar from "../../Components/Navbar/Navbar";

const CategoryPage = () => {
  const params = useParams();

  const category = categoryData.find(
    (item) => item.heading === params.category
  );
  return (
    <div>
      <Navbar />

      <div className="categoryproducts">
        {category.subCategory?.map((item, index) => (
          <Subcategory key={index} item={item} />
        ))}

        {/* <button onClick={() => console.log(category.heading)}>
        Show category
      </button> */}
      </div>
    </div>
  );
};

export default CategoryPage;
