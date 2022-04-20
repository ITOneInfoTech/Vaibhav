import { MASTER_DISPATCH_EVENTS } from "../../constants/constants";

export function addToCart(product: any, quantity: number) {
  return {
    type: MASTER_DISPATCH_EVENTS.ADD_TO_CART,
    payload: { product, quantity },
  };
}

export function decrementQtyCart(product: any, quantity: number) {
  return {
    type: MASTER_DISPATCH_EVENTS.QTY_DECREMENT,
    payload: { product, quantity },
  };
}

export function removeItemFromCart(product: any) {
  return {
    type: MASTER_DISPATCH_EVENTS.REMOVE_ITEM_CART,
    payload: { product },
  };
}

export function clearCart() {
  return {
    type: MASTER_DISPATCH_EVENTS.CLEAR_CART,
    payload: {},
  };
}
