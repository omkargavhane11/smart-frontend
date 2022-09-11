import "./category.css";

const Category = ({ item }) => {
  return (
    <div className="category_wrapper_div">
      <div className="category_wrapper">
        <div className="category_heading">{item.heading}</div>
        <img src={item.image} alt={item.image} className="category_image" />
      </div>
    </div>
  );
};

export default Category;
