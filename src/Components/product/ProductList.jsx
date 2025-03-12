import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";
import { ProductContext } from "../../App";
export default function ProductList() {
  const { products, setProducts } = useContext(ProductContext);
  useEffect(() => {
    async function getProduct() {
      const response = await fetch("http://localhost:5000/product");
      const data = await response.json();
      setProducts(data);
    }
    getProduct();
  }, []);
  return (
    <div className="productList">
      {products.map(
        (productItem) =>
          productItem.stock_quantity === 0 || (
            <ProductCard key={productItem.product_id} product={productItem} />
          )
      )}
    </div>
  );
}
