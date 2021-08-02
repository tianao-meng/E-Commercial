import React, { useState, useEffect } from "react";
import { updateProductAction,productDetailsAction } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import SideBar from "./SideBar";
import {UPDATE_PRODUCT_RESET} from "../../constants/productContants"

const UpdateProduct = ({ match, history}) => {

    const { loading:updateLodading, error:updateError,isUpdated } = useSelector((state) => state.processProduct);
    const { loading, error, product } = useSelector((state) => state.product);

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
    const [oldImages, setOldImages] = useState([]);

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
  
    
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            alert.error(error);
        }

        if(updateError){
            alert.error(updateError);
        }
  
        if (isUpdated){
            history.push("/admin/products");
            alert.success("Update product successfully");
            
            dispatch({
                type:UPDATE_PRODUCT_RESET
            })
            dispatch(productDetailsAction(match.params.id));
            
        }
        if (product._id === match.params.id){
            
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setStock(product.stock);
            setSeller(product.seller);
            
            setOldImages(product.images);
            
            
            
        } else {
            console.log("in get details")
            dispatch(productDetailsAction(match.params.id));
        }
    }, [dispatch, error,isUpdated,updateError,product]);

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
        dispatch(updateProductAction(match.params.id,formData));
        
    };
    
    const changeHandler = (e) => {

        const files = Array.from(e.target.files);
        

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);
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
          <MetaData title="Admin Update Product" />
          <div className="row">
            <div className="col-12 col-md-3">
              <SideBar />
            </div>
            {loading? <Loader /> : 
            <>
                <div className="col-12 col-md-9 p-2 ">
              
                    <div className="newProductCard">
                    <h1>Update Product</h1>
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
                            value={name}
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
                            value={price}
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
                            value={description}
                            />
                        </div>

                        <div class="mb-3">
                            <label className="form-label">Category</label>
                            <select  value={categories} className="form-select" onChange={e => setCategory(e.target.value)}>

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
                            value={stock}
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
                            value={seller}
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
                            
                            {oldImages.map((image) => (
                                
                                <img className="mt-2 ms-1" src={image.url} alt="avatar" />
                            ))}
                            {imagesPreview.map((image) => (
                                <img className="mt-2 ms-1" src={image} alt="avatar" />
                            ))}
                            
            
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning mt-2"
                            disabled={updateLodading ? true : false}
                        >
                            Update
                        </button>
                    </form>
                </div>
           
          </div>
            
            </>}

          </div>
        </div>
      );
}

export default UpdateProduct
