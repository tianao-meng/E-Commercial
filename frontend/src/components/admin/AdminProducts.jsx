import React, { useState, useEffect } from "react";
import { adminProductsAction,deleteProductAction } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import {DELETE_PRODUCT_RESET} from "../../constants/productContants"
const AdminProducts = ({ history}) => {
  const { loading, error, products } = useSelector((state) => state.products);
  const {  error:deleteError, isDeleted } = useSelector((state) => state.processProduct);
  const alert = useAlert();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (deleteError){
      alert.error(deleteError);
    }

    if (isDeleted){
      alert.success("Product deleted successfully")
      history.push("/admin/products");
      dispatch({
        type:DELETE_PRODUCT_RESET
      })
    }
    dispatch(adminProductsAction());
  }, [dispatch, error,isDeleted,deleteError]);


  function deleteHandler(productId) {
    dispatch(deleteProductAction(productId));
  }

  function datatable() {
    const res = {
      columns: [
        {
          label: "Id",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      res.rows.push({
        id: product._id,
        name: product.name,
        price: `$${product.price}`,
        stock: product.stock,
        actions: (
          <>
            <div className="d-flex">
              <Link
                className="btn btn-primary me-2"
                to={`/admin/product/${product._id}`}
              >
                <i class="fas fa-pencil-alt"></i>
              </Link>
              <button
                className="btn btn-danger ml-2"
                
                onClick={() => deleteHandler(product._id)}
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </>
        ),
      });
    });

    return res;
  }
  return (
    <div className="admin-products">
      <MetaData title="Admin Products" />
      <div className="row">
        <div className="col-12 col-md-3">
          <SideBar />
        </div>

        <div className="col-12 col-md-9 p-2 products-table">
          <h1 className="my-5">All Products</h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="table">
                <MDBDataTableV5
                  className="mt-5 "
                  hover
                  entriesOptions={[5, 20, 25]}
                  entries={5}
                  pagesAmount={4}
                  data={datatable()}
                  searchBottom={false}
                  searchTop
                  striped
                  bordered
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
