import "./App.css";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import UserLogin from "./components/user/UserLogin";
import UserRegister from "./components/user/UserRegister";
import UserProfile from "./components/user/UserProfile";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { loadUserAction } from "./actions/userActions";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import PasswordChange from "./components/user/PasswordChange";
import ForgetPassword from "./components/user/ForgetPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import AdminProducts from "./components/admin/AdminProducts";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct"
import AdminOrders from "./components/admin/AdminOrders"
import UpdateOrder from "./components/admin/UpdateOrder"
import AdminUsers from "./components/admin/AdminUsers"
import UpdateUser from "./components/admin/UpdateUser"
import AdminReviews from "./components/admin/AdminReviews"
function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const dispatch = useDispatch();

  const { loadUser } = bindActionCreators(
    { loadUser: loadUserAction },
    dispatch
  );
  const {user, isAuthenticated} = useSelector((state) => state.user);

  const getStripeApiKey = async () => {
    const { data } = await axios.get("/api/v1/stripeapi");
    setStripeApiKey(data.stripeApiKey);
  };
  useEffect(async () => {
    loadUser();
    
    await getStripeApiKey();
  }, [dispatch]);
  
  return (
    <Router>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Route path="/" component={Home} exact />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/login" component={UserLogin} />
          <Route path="/register" component={UserRegister} />

          <Route path="/password/forget" component={ForgetPassword} exact />
          <Route path="/password/reset/:resetToken" component={NewPassword} />
          {/* <Route path="/me" component={UserProfile} exact /> */}

          <Route path="/cart" component={Cart} exact />
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute
            path="/confirm"
            component={ConfirmOrder}
            exact
          />
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} exact />
            </Elements>
          )}
          <ProtectedRoute path="/success" component={OrderSuccess} exact />
          <ProtectedRoute path="/me" component={UserProfile} exact />
          <ProtectedRoute path="/me/update" component={UpdateProfile} exact />
          <ProtectedRoute path="/orders/me" component={ListOrders} exact />
          <ProtectedRoute path="/order/:id" component={OrderDetails} exact />
          <ProtectedRoute
            path="/password/update"
            component={PasswordChange}
            exact
          />
        </div>
        <ProtectedRoute
          path="/dashboard"
          isAdmin={true}
          component={Dashboard}
          exact
        />
        <ProtectedRoute
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
          exact
        />
        <ProtectedRoute
          path="/admin/products"
          isAdmin={true}
          component={AdminProducts}
          exact
        />

        <ProtectedRoute
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
          exact
        />
        
        <ProtectedRoute
          path="/admin/orders"
          isAdmin={true}
          component={AdminOrders}
          exact
        />
        <ProtectedRoute
          path="/admin/order/:id"
          isAdmin={true}
          component={UpdateOrder}
          exact
        />
        <ProtectedRoute
          path="/admin/users"
          isAdmin={true}
          component={AdminUsers}
          exact
        />
        <ProtectedRoute
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
          exact
        />
        <ProtectedRoute
          path="/admin/reviews"
          isAdmin={true}
          component={AdminReviews}
          exact
        />
        {user.role && (user.role !== "Admin" || !isAuthenticated) && <Footer /> }
        
      </div>
    </Router>
  );
}

export default App;
