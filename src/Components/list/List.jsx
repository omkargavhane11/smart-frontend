import "./list.css";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const List = ({ product }) => {
  const toast = useToast();
  const [edit, setEdit] = useState(false);

  // product inputs
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(product?.description);
  const [price, setPrice] = useState(product?.price);
  const [quantity, setQuantity] = useState(product?.quantity);

  // save updated details
  const handleSave = async () => {
    const formData = new FormData();
    // formData.append("name", name);
    file && formData.append("image", file);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    // formData.append("unit", unit);
    // formData.append("category", category);
    // formData.append("subcategory", subcategory);
    // formData.append("color", color);
    // formData.append("brand", brand);
    try {
      const { update } = await axios.put(
        `https://s-mart-77.herokuapp.com/products/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (update?.modifiedCount === 1) {
        console.log("Product details updated successfully");
        toast({
          title: "Success",
          description: "Product details updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      } else {
        console.log("Failed to update product details");
        toast({
          // title: "error",
          description: "Failed to update product details",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (error) {
      console.log(error.message);
    }

    // console.log(file);
    setEdit(false);
  };

  // delete product
  const deleteProduct = async () => {
    try {
      const action = await axios.delete(
        `https://s-mart-77.herokuapp.com/products/${product._id}`
      );
      console.log(action.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={edit ? "li edit-inventory" : "li"}>
      <img
        src={product.image}
        alt=""
        className={edit ? "li-img-edit" : "li-img"}
      />
      {!edit ? (
        <div className="li-details">
          <div className="li-desc">{product?.description}</div>
          <div className="li-price">₹ {product?.price}</div>
          <div className="li-stock">Stock Quantity - {product?.quantity}</div>
          <div className="li-btns">
            <button className="li-btn" onClick={() => setEdit(true)}>
              Edit
            </button>
            <button className="li-btn" onClick={deleteProduct}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="li-details">
          <div className="li-input-item">
            <span className="li-input-key">New image</span>
            <input
              type="file"
              className="li-desc"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="li-input-item">
            <span className="li-input-key">Description</span>
            <textarea
              type="text"
              value={description}
              className="li-desc-input"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="li-input-item">
            <span className="li-input-key">Price</span>
            <input
              type="number"
              value={price}
              className="li-price-input"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="li-input-item">
            <span className="li-input-key">Stock Quantity</span>
            <input
              type="number"
              value={quantity}
              className="li-stock-input"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="li-btns-edit">
            <button className="li-btn" onClick={handleSave}>
              Save
            </button>
            <button className="li-btn" onClick={() => setEdit(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
