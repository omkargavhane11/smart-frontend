import "./home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { categoryData } from "../../data";
import Category from "../../Components/category/Category";
import Footer from "../../Components/footer/Footer";
import { closeNavModal } from "../../redux/helper";
import { useDispatch } from "react-redux";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
import { useState } from "react";
// import img1 from "../../assets/img1.jpg";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Subcategory from "../../Components/subcategory/Subcategory";

const Home = () => {

  const dispatch = useDispatch();

  document.addEventListener("click", (e) => {
    console.log({id: e.target.id})
    if(e.target.id !== "navbar_avatar"){
        dispatch(closeNavModal())
    }
    e.stopPropagation()
  })

  const header_images = [img2, img3, img1, img4, img5];
  const [current_img_index, setCurrent_img_index] = useState(0);

  const handle_slide = (type) => {
    if(type === "back" && current_img_index > 0){
        setCurrent_img_index(current_img_index-1);
    }else if(type === "back" && current_img_index === 1){
        setCurrent_img_index(header_images.length - 1);
    }else if(type === "forward" && current_img_index < header_images.length - 1){
      setCurrent_img_index(current_img_index+1);
    }else if(type === "forward" && current_img_index === header_images.length - 1){
      setCurrent_img_index(0);
    }
  }

  // setTimeout(() => {
  //   handle_slide("forward")
  // }, 3000);

  console.log("rendered");

  return (
    <div className="home">
      <div className="home_top">
        <Navbar />
      </div>
      <div className="home_middle">
        <div className="home_header_img_container">
            <img className="home_header_img" src={header_images[current_img_index]} alt="img1" />
            <ArrowBackIosIcon className="arrow_back" onClick={() => handle_slide("back")}/>
            <ArrowForwardIosIcon className="arrow_forward" onClick={() => handle_slide("forward")}/>
        </div>
      </div>
      <div className="bottom">
        <div className="home_bottom">
          <div className="home_cat_container">
          {/* <div className="home_section_heading">Categories</div> */}
          <div className="home_cat_display_container">
            <div className="home_cat_display">
              {categoryData.map((item, index) => (
                <Category key={index} item={item} />
                ))}
            </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
