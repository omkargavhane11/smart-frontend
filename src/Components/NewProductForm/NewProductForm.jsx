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

  const [file, setFile] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

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

    const uploadProduct = await axios.post(
      "http://localhost:8080/products",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setFile(null);
    setDescription("");
    setPrice("");
    setUnit("");
    setQuantity("");
    setName("");
    setCategory(null);

    toast({
      title: "Added",
      description: "Product added successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  // unit of product
  const selectOptionValue = () => {
    let options = document.getElementsByClassName("unit_options_value");
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        setUnit(options[i].value);
      }
    }
  };

  // select product category
  const handleCategoryChange = () => {
    const cat_items = document.getElementsByClassName("category_option");
    for (let i = 0; i < cat_items.length; i++) {
      if (cat_items[i].selected) {
        setCategory(cat_items[i].value);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="newProduct">
        <h1>Add new product</h1>
        <form className="form" onSubmit={handleSaveProduct}>
          <div className="input">
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
          <div className="input">
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
          <div className="input">
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
          <div className="input">
            <label htmlFor="category" className="inputLabel">
              Category
            </label>
            <select
              className="quantity"
              id="category"
              onChange={handleCategoryChange}
            >
              {categoryData.map((cat) => (
                <option value={cat.heading} className="category_option">
                  {cat.heading}
                </option>
              ))}
            </select>
          </div>
          <div className="input">
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
          <div className="input">
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
          <div className="input">
            <label htmlFor="media" className="inputLabel">
              Media
            </label>
            <input
              className="media"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
          </div>
          <button className="saveProduct" type="submit">
            Add
          </button>
          <button
            className="backToHome"
            type="button"
            onClick={() => navigate("/")}
          >
            Home Page
          </button>
        </form>
      </div>
    </>
  );
};

export default NewProductForm;
