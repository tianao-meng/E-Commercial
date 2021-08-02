import React, { useState, useEffect } from "react";
import { productReviewsAction,deleteReviewAction } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import SideBar from "./SideBar";
import {  PRODUCT_REVIEWS_RESET, DELETE_REVIEW_RESET} from"../../constants/productContants"
//import { DELETE_REVIEW_RESET } from "../../constants/productContants";

const AdminReviews = ({history}) => {
    const [productId, setProductId] = useState("");

    let { loading, error, reviews } = useSelector((state) => state.reviews);
    const {error:deleteError, isDeleted}= useSelector((state) => state.review);

    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
      if (error) {
        alert.error(error);
      }
      if (deleteError){
        alert.error(deleteError);
      }
      if(isDeleted){
        alert.success("Delete review successfully");
        dispatch({ type: DELETE_REVIEW_RESET});
        dispatch(productReviewsAction(productId));
      }

      return () => {
        dispatch({type:PRODUCT_REVIEWS_RESET})
      }
    }, [dispatch, error,isDeleted]);

    function deleteHandler(id) {
        
        dispatch(deleteReviewAction(id, productId));
    }

    function handleSearch(){
    
        dispatch(productReviewsAction(productId));
    }
  
    function datatable() {
      const res = {
        columns: [
          {
            label: "Review ID",
            field: "reviewId",
            sort: "asc",
          },
          {
            label: "Ratine",
            field: "rating",
            sort: "asc",
          },
          {
            label: "Comment",
            field: "comment",
            sort: "asc",
          },
          {
            label: "User",
            field: "user",
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
  
      reviews.forEach((review) => {
        res.rows.push({
            reviewId: review._id,
            rating: review.rating,
            comment: review.comment,
            user: review.name,
            actions: (
                <>
                <div className="d-flex">
                    <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(review._id)}
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
                <MetaData title="Product Reviews" />
            <div className="row">
                <div className="col-12 col-md-3">
                    <SideBar />
                </div>
        
                <div className="col-12 col-md-9 p-2 products-table">
                    <div className="w-75 mx-md-auto mx-3 mt-5">

                        
                        <h4>Enter Product Id</h4>
                        <input
                            type="text "
                            className="form-control rounded-0"
                            placeholder="Enter Product Id..."
                            onChange={(e) => setProductId(e.target.value)}
                            value={productId}
                        />
                        <button
                            className="btn text-light bg-primary rounded-0 mt-3 w-100"
                            type="button"
                            disabled={loading ? true : false}
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                        
                    </div>
                    {reviews.length === 0 ? (
                            <div className="w-75 mx-md-auto mx-3 mt-5">
                                <p className="mt-4">No Reviews</p>
                            </div>
                                
                            ) : (
                            <>
                                <div className="table mx-md-auto mx-3">
                                <MDBDataTableV5
                                    className="mt-5"
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
    )
}

export default AdminReviews
