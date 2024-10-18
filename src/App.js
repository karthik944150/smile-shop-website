import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage  from "./components/HomePage";
import Product from "./components/Product"
import ProductItemDetails from "./components/ProductItemDetails";
import NotFound from "./components/NotFound";

const App = () => { 
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/products" element={<Product/>} />
        <Route exact path="/products/:id" element={<ProductItemDetails/>} />
        
        <Route path="*" element = {<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
