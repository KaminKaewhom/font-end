import "./ProductCard.css";

import { CartProductContext } from "../../App";
import { useContext } from "react";
export default function ProductCard({ product }) {
  const { cartProducts, setCartProducts } = useContext(CartProductContext);
  const isInCart = cartProducts.find(
    (p) => p.product_id === product.product_id
  );

  function handleClick() {
    if (isInCart) return;
    setCartProducts([...cartProducts, product]);
  }

  return (
    <div
      className={`productCart ${isInCart ? " productCart__item--inCart" : ""}`}
      onClick={handleClick}
    >
      <img className="productCart__img" src={product.image_url} alt="" />
      <div className="prodcutCart__detail">
        <p className="productCart__name">{product.product_name}</p>
        <p className="productCart__quantity">
          quantity : {product.stock_quantity}
        </p>
      </div>
      <p className="productCart__price">
        ฿ {new Intl.NumberFormat("th-TH").format(product.product_price)}
      </p>
    </div>
  );
}
