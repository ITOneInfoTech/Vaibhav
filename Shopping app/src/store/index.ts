import { createStore, combineReducers } from "redux";
import masterReducer from "./reducers/Master";
import cartReducer from "./reducers/Cart";
import { composeWithDevTools } from "redux-devtools-extension";

const root = combineReducers({
  masterReducer,
  cartReducer,
});

const store = createStore(root, composeWithDevTools());

export default store;
