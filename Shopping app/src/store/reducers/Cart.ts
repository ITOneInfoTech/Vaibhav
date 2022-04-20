import { MASTER_DISPATCH_EVENTS } from "../../constants/constants";

const initalState = {
  products: [],
  totalPrice: 0,
};

const cartReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case MASTER_DISPATCH_EVENTS.ADD_TO_CART:
      const { product, quantity } = action.payload;

      let existed_item: any = state.products.find(
        (item) => product._id === item["_id"]
      );

      if (existed_item) {
        existed_item["quantity"] += quantity;
        existed_item["total"] =
          existed_item["quantity"] * parseFloat(existed_item["price"]);
        return {
          ...state,
          totalPrice: state.totalPrice + parseFloat(product.price),
        };
      } else {
        product.quantity = quantity;
        product.total = product.quantity * parseFloat(product.price);
        //calculating the total
        let newTotal = state.totalPrice + parseFloat(product.price);

        return {
          ...state,
          products: [...state.products, product],
          totalPrice: newTotal,
        };
      }

    case MASTER_DISPATCH_EVENTS.QTY_DECREMENT:
      let addedItem: any = state.products.find(
        (item) => item["_id"] === action.payload.product._id
      );

      //if the qt == 0 then it should be removed
      if (addedItem.quantity === 1) {
        let new_items = state.products.filter(
          (item) => item["_id"] !== action.payload.product._id
        );
        let newTotal = state.totalPrice - addedItem.price;
        return {
          ...state,
          products: new_items,
          totalPrice: newTotal,
        };
      } else {
        addedItem.quantity -= 1;
        addedItem.total = addedItem.quantity * parseFloat(addedItem.price);
        let newTotal = state.totalPrice - addedItem.price;
        return {
          ...state,
          totalPrice: newTotal,
        };
      }

    case MASTER_DISPATCH_EVENTS.REMOVE_ITEM_CART:
      let itemToRemove = state.products.find(
        (item) => action.payload.product._id === item["_id"]
      );
      let new_items = state.products.filter(
        (item) => action.payload.product._id !== item["_id"]
      );

      //calculating the total
      let newTotal =
        itemToRemove &&
        state.totalPrice - itemToRemove["price"] * itemToRemove["quantity"];

      return {
        ...state,
        products: new_items,
        totalPrice: newTotal,
      };

    case MASTER_DISPATCH_EVENTS.CLEAR_CART:
      return {
        products: [],
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
