import React, { useState } from "react";
import Navbar from "./NavBar";
import { useSelector, RootStateOrAny } from "react-redux";
import { imgUrl } from "../constants/api";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  addToCart,
  decrementQtyCart,
  removeItemFromCart,
} from "../store/actions/Cart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPrice = useSelector(
    (state: RootStateOrAny) => state.cartReducer.totalPrice
  );

  const cartItems = useSelector(
    (state: RootStateOrAny) => state.cartReducer.products
  );

  const [cartCount, setCartCount] = useState(0);

  const addUpdateItemToCart = (itemInfo: any) => {
    let quantity = 1;
    dispatch(addToCart(itemInfo, quantity));
  };

  const decrementItemQty = (itemInfo: any) => {
    let quantity = 1;
    dispatch(decrementQtyCart(itemInfo, quantity));
  };

  const removeItemCart = (itemInfo: any) => {
    dispatch(removeItemFromCart(itemInfo));
  };

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item: any) => {
      count += item["quantity"];
    });
    setCartCount(count);
  });

  const placeOrder = () => {
    if (totalPrice >= 500) {
      navigate(`/place-order`);
    } else {
      alert("Maximum order amount is 500 and more");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) {
      navigate(`/`);
    }
  });

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-default">
              <div className="panel-heading">MY CART ({cartCount})</div>
              <div className="panel-body">
                {cartCount <= 0 && (
                  <h1 style={{ textAlign: "center" }}>Your cart is empty</h1>
                )}
                {cartItems &&
                  cartItems.map((cartitems: any, index: number) => (
                    <div className="row" key={index}>
                      <div className="col-md-3">
                        {" "}
                        <img
                          src={`${imgUrl}/${cartitems.image}`}
                          alt={cartitems.name}
                          width="100px"
                          height="200px"
                        />
                      </div>
                      <div className="col-md-3">
                        {" "}
                        {cartitems.name}
                        <br />
                        <i className="fa fa-inr"></i>
                        {cartitems.price}
                      </div>
                      <div className="col-md-3 item-desc">
                        {" "}
                        Quantity
                        <br />
                        <button
                          onClick={() => decrementItemQty(cartitems)}
                          className="qtyminus"
                        >
                          -
                        </button>
                        <input
                          ng-model="qty"
                          type="text"
                          name="quantity"
                          className="qty"
                          value={cartitems.quantity}
                          readOnly
                        />
                        <button onClick={() => addUpdateItemToCart(cartitems)}>
                          +
                        </button>
                      </div>
                      <div className="col-md-3">
                        {" "}
                        <button
                          className="btn btn-warning"
                          onClick={() => removeItemCart(cartitems)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  ))}

                <hr />
                <div className="row">
                  <div className="col-md-9">
                    <label className="pull-right">Amount Payable</label>
                  </div>
                  <div className="col-md-3 ">{totalPrice}</div>
                </div>
              </div>
              <div className="panel-footer">
                <Link className="btn btn-success" to="/">
                  Continue Shopping
                </Link>

                <button
                  onClick={placeOrder}
                  className="pull-right btn btn-danger"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
