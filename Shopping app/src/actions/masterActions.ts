/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { Links } from "../constants/api";
import { AxiosRequestConfig } from "axios";

export const getProductsRequest = () => {
  return <AxiosRequestConfig>{
    method: "GET",
    url: Links.API_GET_PRODUCT,
  };
};

export const confirmOrder = (params: any) => {
  return <AxiosRequestConfig>{
    method: "POST",
    url: Links.API_PLACE_ORDER,
    data: params,
  };
};
