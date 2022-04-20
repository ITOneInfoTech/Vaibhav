import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { confirmOrder } from "../actions/masterActions";
import { StatusCodes } from "http-status-codes";
import { AxiosResponse } from "axios";
import apiCall from "../services/api";
import { clearCart } from "../store/actions/Cart";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state: RootStateOrAny) => state.cartReducer.products
  );

  const totalPrice = useSelector(
    (state: RootStateOrAny) => state.cartReducer.totalPrice
  );

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const placeOrder = () => {
    if (name === "") {
      alert("Please enter your name");
      return;
    }

    if (address === "") {
      alert("Please enter your address");
      return;
    }

    let productdata: any = [];

    cartItems.forEach((item: any) => {
      productdata.push({
        productID: item._id,
        qty: item.quantity,
        price: item.price,
        total: item.total,
      });
    });
    const orderdata = {
      personName: name,
      deliveryAddress: address,
      productsOrdered: productdata,
      orderTotal: totalPrice,
    };

    sendConfirmOrdersrequest(orderdata);
  };

  /* useEffect(() => {
    if (cartItems.length <= 0) {
      navigate(`/`);
    }
  }); */

  const sendConfirmOrdersrequest = async (data: any) => {
    try {
      const response: AxiosResponse<any> = await apiCall(confirmOrder(data));

      if (response.status === StatusCodes.OK) {
        const { data } = response;

        if (data) {
          if (data.status === "success") {
            alert(data.message);
            dispatch(clearCart());
            navigate(`/order-greeting`);
          }
        }
      }
    } catch (error) {
      console.log("Error is ", error);
    }
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">Place Order</div>
              <div className="panel-body">
                <table className="table table-striped">
                  <thead className="table-head">
                    <tr>
                      <td>Product Name</td>
                      <td> Quntity</td>
                      <td> SubTotal</td>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems &&
                      cartItems.map((cartitems: any, index: number) => (
                        <tr key={index}>
                          <td>{cartitems.name}</td>
                          <td>{cartitems.quantity}</td>
                          <td>
                            <i className="fa fa-inr"></i>
                            {cartitems.price * cartitems.quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <br />

                <br />
                <div className="form-group">
                  <label className="col-sm-2 control-label">
                    Enter Order Details
                  </label>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      id="inputName3"
                      placeholder="Name"
                      name="firstName"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label">Address</label>
                  <div className="col-sm-6">
                    <textarea
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Deliver Address"
                      name="lastName"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 control-label"></label>
                  <div className="col-sm-6">
                    <button onClick={placeOrder} className="btn btn-warning">
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
