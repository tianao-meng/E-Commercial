import React, { useState, useEffect } from "react";
import { adminUpdateUserAction,userDetailsAction,loadUserAction } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import SideBar from "./SideBar";
import {UPDATE_USER_RESET} from "../../constants/userConstants"

const UpdateUser = ({ match, history}) => {

    const { loading:updateLoading, error:updateError, isupdated } = useSelector((state) => state.userUpdated);
    const { loading, error, user } = useSelector((state) => state.userDetails);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error) {
            alert.error(error);
        }

        if(updateError){
            alert.error(updateError);
        }
  
        if (isupdated){
            history.push("/admin/users");
            alert.success("Update user successfully");
            
            dispatch({
                type:UPDATE_USER_RESET
            })
            dispatch(userDetailsAction(match.params.id));
            dispatch(loadUserAction());
            
        }
        if (user._id === match.params.id){
            
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            
        } else {
        
            dispatch(userDetailsAction(match.params.id));
        }
    }, [dispatch, error,isupdated,updateError,user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            role
        }
        dispatch(adminUpdateUserAction(match.params.id, userData));
    };

    return (
        <div className="newProduct">
          <MetaData title="Admin Update User" />
          <div className="row">
            <div className="col-12 col-md-3">
              <SideBar />
            </div>
            {loading? <Loader /> : 
            <>
                <div className="col-12 col-md-9 p-2 ">
              
                <div className="updateUserCard">
                    <h1>Update User</h1>
                    <form className="updateUserForm" onSubmit={handleSubmit}>
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
                            <strong>Email</strong>
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            onChange={e => setEmail(e.target.value)}
                            name="price"
                            value={email}
                            />
                        </div>


                        <div class="mb-3">
                            <label className="form-label">Role</label>
                            <select  value={role} className="form-select" onChange={e => setRole(e.target.value)}>

                            
                                <option>Admin</option>
                                <option>User</option>
                            
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning mt-2"
                            disabled={updateLoading ? true : false}
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

export default UpdateUser
