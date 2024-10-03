import React from "react";
import Products from "../components/Products";
import Info from "../components/Info";

function Home() {
  return (
    <div className="homePage container">
      <Info />
      <Products />
    </div>
  );
}

export default Home;
