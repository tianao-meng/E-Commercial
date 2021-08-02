import React, { useState, useEffect } from "react";
import { newProductAction } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import SideBar from "./SideBar";
import {NEW_PRODUCT_RESET} from "../../constants/productContants"

const NewProduct = ({history}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState( "Electronics");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [imagesPreview, setImagesPreview] = useState(
    []
  );
  const [images, setImages] = useState([]);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const { loading, error,success } = useSelector((state) => state.newProduct);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (success){
      history.push("/admin/products");
      alert.success("Add new product successfully");
      dispatch({
        type:NEW_PRODUCT_RESET
      })
    }
  }, [dispatch, error,success]);
  const handleSubmit = (e) => {
    e.preventDefault();
   
    var formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("seller", seller);
    images.forEach((image) => {
      formData.append("images", image);
    })
    dispatch(newProductAction(formData));
    
  };

  const changeHandler = (e) => {

    const files = Array.from(e.target.files);
    

    setImagesPreview([]);
    setImages([]);
    files.map(file => {
      let reader = new FileReader();
      reader.onloadend = function () {
        
        setImagesPreview(curArray => [...curArray, reader.result]);
        setImages(curArray => [...curArray, reader.result]);
      };
      reader.readAsDataURL(file);
    })

  };
  return (
    <div className="newProduct">
      <MetaData title="Admin Add Product" />
      <div className="row">
        <div className="col-12 col-md-3">
          <SideBar />
        </div>

        <div className="col-12 col-md-9 p-2 ">
          
          {loading ? <Loader /> : <>

            <div className="newProductCard">
              <h1>New Product</h1>
              <form className="newProductForm" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Name</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => setName(e.target.value)}
                    name="name"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Price</strong>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={e => setPrice(e.target.value)}
                    name="price"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>description</strong>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    onChange={e => setDescription(e.target.value)}
                    name="description"
                  />
                </div>

                <div class="mb-3">
                  <label className="form-label">Category</label>
                  <select  className="form-select" onChange={e => setCategory(e.target.value)}>

                    {categories.map((category => (
                      <option>{category}</option>
                    )))}
                    
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Stock</strong>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={e => setStock(e.target.value)}
                    name="stock"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <strong>Seller</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={e => setSeller(e.target.value)}
                    name="seller"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                  <strong>Images</strong>
                    </label>
                    <input
                          type="file"
                          className="form-control"
                          onChange={changeHandler}
                          name="avatar"
                          accept="image/*"
                          multiple
                    />
                    {imagesPreview.map((image) => (
                      <img className="mt-2 ms-1" src={image} alt="avatar" />
                    ))}
                    
  
                </div>

                <button
                  type="submit"
                  className="btn btn-warning mt-2"
                  disabled={loading ? true : false}
                >
                  Create
                </button>
              </form>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
