import React from "react";
import Navbar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";

const OrderGreeting = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Order Placed</div>
              <div className="panel-body text-center">
                <h1 className="text-success">
                  <i className="fa fa-check-circle fa-2x"></i>
                </h1>
                <h2 style={{ lineHeight: "2" }}>Thank you for your order!</h2>
                <br />

                <Link className="btn btn-primary" to="/">
                  <i className="fa fa-angle-double-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderGreeting;
