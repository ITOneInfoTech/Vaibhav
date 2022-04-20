import React, { useState } from "react";
import Product from "./Product";
import { getProductsRequest } from "../actions/masterActions";
import { useSelector, RootStateOrAny } from "react-redux";
import { useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import { applyFilterToProduct, setProducts } from "../store/actions/Master";
import { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import apiCall from "../services/api";

const ProductList = () => {
  const dispatch = useDispatch();

  const productDetails = useSelector(
    (state: RootStateOrAny) => state.masterReducer.productDetails
  );

  const filteredProductList = useSelector(
    (state: RootStateOrAny) => state.masterReducer.filteredProductList
  );

  const [selectedValue, setSelectedValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsOnPage, setItemsOnPage] = useState(5);

  const sendSaveProductsrequest = async () => {
    try {
      const response: AxiosResponse<any> = await apiCall(getProductsRequest());

      if (response.status === StatusCodes.OK) {
        const { data } = response;
        if (data) {
          //  const groupedItems = chunk(productDetails, 4);
          dispatch(setProducts(data.products));
        }
      }
    } catch (error) {
      // if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      console.log("Error is ", error);
      //}
    }
  };

  useEffect(() => {
    sendSaveProductsrequest();
  });

  const applyFilter = (value: String) => {
    dispatch(applyFilterToProduct(productDetails, value));
  };

  useEffect(() => {
    applyFilter(selectedValue);
  }, [selectedValue]);

  const noOfPages = [];
  const length =
    filteredProductList && filteredProductList.length === 0
      ? productDetails.length
      : filteredProductList.length;
  for (let i = 1; i <= Math.ceil(length / itemsOnPage); i++) {
    noOfPages.push(i);
  }

  const handlePagePrevious = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };

  const handlePageNext = () => {
    if (currentPage === noOfPages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const lastItemIndex = currentPage * itemsOnPage;
  const firstItemIndex = lastItemIndex - itemsOnPage;
  const prod =
    filteredProductList && filteredProductList.length === 0
      ? productDetails
      : filteredProductList;
  const currentPageItems = prod.slice(firstItemIndex, lastItemIndex);

  const ItemsList = <Product productDetails={currentPageItems} />;

  return (
    <>
      <div className="container">
        <div className="row ">
          <div className="col-sm-12">
            <div style={{ margin: "25px 0" }}>
              <label className="control-label">Sort by:</label>
              <select
                onChange={(e) => setSelectedValue(e.target.value)}
                value={selectedValue}
              >
                <option value="">Default</option>
                <option value="HightoLow">High to Low</option>
                <option value="LowtoHigh">Low to High</option>
              </select>
            </div>
          </div>
        </div>

        {ItemsList}

        <div className="row">
          <div className="col-sm-6">
            <ul className="pagination" style={{ cursor: "pointer" }}>
              <li
                className={
                  currentPage === 1 ? "page-item disabled" : "page-item"
                }
                onClick={() => handlePagePrevious()}
              >
                <a className="page-link">Previous</a>
              </li>
              {noOfPages
                ? noOfPages.map((option, i) => (
                    <li
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "active" : ""}
                    >
                      <a className="page-link">{i + 1}</a>
                    </li>
                  ))
                : ""}
              <li
                className={
                  currentPage === noOfPages.length
                    ? "page-item disabled"
                    : "page-item"
                }
                onClick={() => handlePageNext()}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </div>
          <div className="col-sm-6 text-right">
            <div style={{ marginTop: "25px", marginRight: "30px" }}>
              <label className="control-label">Items Per Page:</label>
              <select
                onChange={(e) => {
                  setItemsOnPage(parseInt(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
