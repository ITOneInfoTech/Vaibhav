import React, { Suspense } from "react";
/* import Navbar from "./NavBar";

import ProductList from "./ProductList"; */

const Navbar = React.lazy(() => import("./NavBar"));
const ProductList = React.lazy(() => import("./ProductList"));

const Home = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <Navbar />
          <ProductList />
        </section>
      </Suspense>
    </>
  );
};

export default Home;
