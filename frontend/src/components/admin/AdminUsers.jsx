import React, { useState, useEffect } from "react";
import { allUsersAction,adminDeleteUserAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layouts/MetaData";
import Loader from "../layouts/Loader";
import { MDBDataTableV5 } from "mdbreact";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const AdminUsers = ({match}) => {
    const { loading, error, users } = useSelector((state) => state.allUsers);
    
    const { error:deleteError, isdeleted } = useSelector((state) => state.userUpdated);
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
      if (error) {
        alert.error(error);
      }

      if(deleteError){
        alert.error(deleteError);
      }
      if(isdeleted){
        alert.success("Delete user successfully");
        dispatch({ type: DELETE_USER_RESET});
      }
      dispatch(allUsersAction());
    }, [dispatch, error, isdeleted,deleteError]);


  
    function datatable() {
      const res = {
        columns: [
          {
            label: "User ID",
            field: "userId",
            sort: "asc",
          },
          {
            label: "Name",
            field: "name",
            sort: "asc",
          },
          {
            label: "Email",
            field: "email",
            sort: "asc",
          },
          {
            label: "Role",
            field: "role",
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
  
      users.forEach((user) => {
        res.rows.push({
            userId: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
          actions: (
            <>
              <div className="d-flex">
                <Link
                  className="btn btn-primary me-2"
                  to={`/admin/user/${user._id}`}
                >
                  <i class="fas fa-pencil-alt"></i>
                </Link>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(user._id)}
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
    function handleDelete(id){
        dispatch(adminDeleteUserAction(id));
    }
    return (
        <div className="admin-products">
        <MetaData title="Admin Users" />
        <div className="row">
          <div className="col-12 col-md-3">
            <SideBar />
          </div>
  
          <div className="col-12 col-md-9 p-2 products-table">
            <h1 className="my-5">All Users</h1>
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
    )
}

export default AdminUsers
