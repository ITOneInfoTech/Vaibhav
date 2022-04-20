import { MASTER_DISPATCH_EVENTS } from "../../constants/constants";

const initalState = {
  productDetails: [],
  filteredProductList: [],
};

const masterReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case MASTER_DISPATCH_EVENTS.SET_PRODUCTS:
      return {
        ...state,
        productDetails: action.payload.productlist,
      };

    case MASTER_DISPATCH_EVENTS.APPLY_FILTER:
      const { productlist, filterValue } = action.payload;

      if (filterValue === "") {
        return {
          ...state,
          filteredProductList: [],
        };
      }

      if (filterValue === "HightoLow") {
        productlist.sort((a: any, b: any) => {
          return parseFloat(b.price) - parseFloat(a.price);
        });

        return {
          ...state,
          filteredProductList: productlist,
        };
      }

      if (filterValue === "LowtoHigh") {
        productlist.sort((a: any, b: any) => {
          return parseFloat(a.price) - parseFloat(b.price);
        });

        return {
          ...state,
          filteredProductList: productlist,
        };
      }
      break;
    default:
      return state;
  }
};

export default masterReducer;
