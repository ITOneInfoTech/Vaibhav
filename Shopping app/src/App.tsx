import Home from "./components/Home";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Order from "./components/Order";
import OrderGreeting from "./components/OrderGreeting";
function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<Order />} />
            <Route path="/order-greeting" element={<OrderGreeting />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
