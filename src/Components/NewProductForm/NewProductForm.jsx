import "./NewProductForm.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { categoryData } from "../../data";
import Navbar from "../Navbar/Navbar";

const NewProductForm = ({ counter, setCounter }) => {
  const toast = useToast();
  const navigate = useNavigate();

  let newCategoryData = [
    { heading: "null", id: Math.random() },
    ...categoryData,
  ];

  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [subcategory, setSubCategory] = useState(null);
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");

  const getSelectedCategoryData = categoryData.find(
    (item) => item.heading === category
  );

  const handleSaveProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("unit", unit);
    formData.append("category", category);
    formData.append("subcategory", subcategory);
    formData.append("color", color);
    formData.append("brand", brand);

    if (
      (name ||
        file ||
        description ||
        price ||
        quantity ||
        unit ||
        category ||
        subcategory) !== ("" || null || undefined)
    ) {
      const uploadProduct = await axios.post(
        "https://s-mart-77.herokuapp.com/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFile("");
      setDescription("");
      setPrice("");
      setUnit("");
      setQuantity("");
      setName("");
      setCategory("");
      setSubCategory("");
      setColor("");

      if (!uploadProduct.data.error) {
        toast({
          title: "Added",
          description: "Product added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } else {
        toast({
          title: "Failed",
          description: "Failed to add Product",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }

      // console.log({
      //   name,
      //   description,
      //   price,
      //   unit,
      //   quantity,
      //   file,
      //   category,
      //   subcategory,
      // });
    } else {
      toast({
        title: "Failed",
        description: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // unit of product
  const selectOptionValue = () => {
    let options = document.getElementsByClassName("unit_options_value");
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        setUnit(options[i].value);
      }
    }
    console.log(unit);
  };

  // select product category
  const handleCategoryChange = async () => {
    const cat_items = document.getElementsByClassName("category_option");
    for (let i = 0; i < cat_items.length; i++) {
      if (cat_items[i].selected) {
        await setCategory(cat_items[i].value);
        await console.log(category);
      }
    }
  };

  // select product sub category
  const handleSubCategoryChange = () => {
    const sub_cat_items = document.getElementsByClassName(
      "sub_category_option"
    );
    for (let i = 0; i < sub_cat_items.length; i++) {
      if (sub_cat_items[i].selected) {
        setSubCategory(sub_cat_items[i].value);
        console.log(subcategory);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="newProduct">
        <h1>Add new product</h1>
        <form className="form" onSubmit={handleSaveProduct}>
          <div className="new-input">
            <label htmlFor="name" className="inputLabel">
              Name
            </label>
            <input
              className="name"
              type="text"
              placeholder="Product name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div className="new-input">
            <label htmlFor="description" className="inputLabel">
              Description
            </label>
            <textarea
              className="description"
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="new-input">
            <label htmlFor="color" className="inputLabel">
              Color
            </label>
            <input
              className="color"
              type="text"
              placeholder="Red"
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </div>
          <div className="new-input">
            <label htmlFor="brand" className="inputLabel">
              brand
            </label>
            <input
              className="brand"
              type="text"
              placeholder="Brand name"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
            />
          </div>
          <div className="new-input">
            <label htmlFor="quantity" className="inputLabel">
              Quantity in stock
            </label>
            <input
              className="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="new-input">
            <label className="inputLabel">Category</label>
            <select
              className="quantity"
              id="category"
              onChange={handleCategoryChange}
            >
              {newCategoryData.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.heading}
                  className="category_option"
                  disabled={cat.heading === null}
                >
                  {cat.heading}
                </option>
              ))}
            </select>
          </div>
          <div className="new-input">
            <label className="inputLabel">Sub Category</label>
            <select
              className="quantity"
              id="subcategory"
              onChange={handleSubCategoryChange}
            >
              {getSelectedCategoryData?.subCategory?.map((cat, index) => (
                <option
                  key={index}
                  value={cat.heading}
                  className="sub_category_option"
                >
                  {cat.heading}
                </option>
              ))}
            </select>
          </div>
          <div className="new-input">
            <label htmlFor="price" className="inputLabel">
              Price of Unit product
            </label>
            <input
              className="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="new-input">
            <label htmlFor="unit_select" className="inputLabel">
              Unit
            </label>
            <select
              name="unit_select"
              id="unit_select"
              onChange={selectOptionValue}
            >
              <option value="g" className="unit_options_value">
                g
              </option>
              <option value="kg" className="unit_options_value">
                Kg
              </option>
              <option value="litre" className="unit_options_value">
                Litre
              </option>
              <option value="Dozen" className="unit_options_value">
                Dozen
              </option>
              <option value="Piece" className="unit_options_value">
                Piece
              </option>
            </select>
          </div>
          <div className="new-input">
            <label htmlFor="media" className="inputLabel">
              Media
            </label>
            <input
              className="media"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
              // value={file}
            />
          </div>
          <div className="new-input">
            <button className="saveProduct" type="submit">
              Add
            </button>
            <button
              className="backToHome"
              type="button"
              onClick={() => console.log(subcategory)}
            >
              Home Page
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewProductForm;
