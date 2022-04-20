import React, { useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../store/actions/Cart";
import { useDispatch } from "react-redux";
function Navbar() {
  const dispatch = useDispatch();

  const totalPrice = useSelector(
    (state: RootStateOrAny) => state.cartReducer.totalPrice
  );

  const cartItems = useSelector(
    (state: RootStateOrAny) => state.cartReducer.products
  );

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cartItems.forEach((item: any) => {
      count += item["quantity"];
    });
    setCartCount(count);
  });

  return (
    <>
      <div className="container">
        <h1>
          <Link to="/">My Ecommerce Site</Link>
          <span className="pull-right">
            <Link to="/cart"> Cart ({cartCount}) </Link>
            <i
              onClick={() => dispatch(clearCart())}
              className="fa fa-trash"
            ></i>
          </span>
        </h1>
        <hr />
      </div>
    </>
  );
}
export default Navbar;
