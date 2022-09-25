import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { categoryData } from "../../data";
import Category from "../../Components/category/Category";
import Footer from "../../Components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="home_top">
        <Navbar />
      </div>
      <div className="bottom">
        <div className="home_bottom">
          <div className="section_heading">Categories</div>
          <div className="cat_display_container">
            <div className="cat_display">
              {categoryData.map((item, index) => (
                <Category key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
