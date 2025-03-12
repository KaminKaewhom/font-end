import CartIcon from "../Components/cart/CartIcon";
import ProductsList from "../Components/product/ProductList";

import "./Products.css";

export default function Products() {
  return (
    <>
      <div className="contentProducts">
        <div className="contentProucts__head">
          <h3>Products</h3>
          <CartIcon />
        </div>
        <ProductsList />
      </div>
    </>
  );
}
