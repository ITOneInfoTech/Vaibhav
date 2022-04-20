import React, { useEffect, useState } from "react";

import { addToCart } from "../store/actions/Cart";

import { useDispatch } from "react-redux";
import { imgUrl } from "../constants/api";
import "../assets/style.css";

type ProductProps = {
  productDetails: any;
};

const classesArray = ["bg-info", "bg-success", "bg-warning", "bg-danger"];

const Product = ({ productDetails }: ProductProps) => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);

  const addUpdateItemToCart = (itemInfo: any) => {
    let quantity = 1;
    dispatch(addToCart(itemInfo, quantity));
  };

  const getProduct = (itemInfo: any, indexofprod: number) => {
    const view = itemInfo.map((product: any, index: number) => {
      return (
        <>
          <div className="col-md-3" key={index} style={{ padding: "10px" }}>
            <div className={`${classesArray[index]} card-align`}>
              <img
                src={`${imgUrl}/${product.image}`}
                alt={product.name}
                width="100"
                height="200"
              />
              <br />
              <br />
              <p style={{ margin: "10px", display: "flex" }}>{product.name}</p>
              <p style={{ margin: "10px", display: "flex" }}>
                <i className="fa fa-inr"></i>
                {product.price}
              </p>
              <button
                onClick={() => addUpdateItemToCart(product)}
                className="btn btn-warning add-btn"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      );
    });

    return (
      <>
        <div className="row parent-block">{view}</div>
        <hr style={{ color: "red" }}></hr>
      </>
    );
  };

  const chunk = (arr: any, size: number) =>
    arr.reduce(
      (acc: any, e: any, i: any) => (
        i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
      ),
      []
    );

  useEffect(() => {
    const subArrayofFour = chunk(productDetails, 4);

    setItems(subArrayofFour);
  }, [productDetails]);

  return (
    <>
      {items &&
        items.map((item: any, index: number) => {
          return getProduct(item, index);
        })}
    </>
  );
};

export default Product;
