import { MASTER_DISPATCH_EVENTS } from "../../constants/constants";

export function setProducts(productlist: any) {
  return {
    type: MASTER_DISPATCH_EVENTS.SET_PRODUCTS,
    payload: { productlist },
  };
}

export function applyFilterToProduct(productlist: any, filterValue: String) {
  return {
    type: MASTER_DISPATCH_EVENTS.APPLY_FILTER,
    payload: { productlist, filterValue },
  };
}
