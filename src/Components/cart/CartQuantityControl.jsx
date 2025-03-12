import "./CartQuantityControl.css";
import { useContext, useEffect } from "react";
import { CartProductContext } from "../../App";

export default function CartQuantityControl({ cartProduct }) {
  const { cartProducts, setCartProducts } = useContext(CartProductContext);
  useEffect(() => {
    if (cartProduct && cartProduct.quantity === undefined) {
      setCartProducts((prevCart) =>
        prevCart.map((item) =>
          item.product_id === cartProduct.product_id
            ? { ...item, quantity: 1 }
            : item
        )
      );
    }
  }, [cartProduct, setCartProducts]);
  if (!cartProduct) return null;

  const increaseQuantity = () => {
    setCartProducts((prevCart) =>
      prevCart.map((item) =>
        item.product_id === cartProduct.product_id
          ? {
              ...item,
              quantity: Math.min(
                (item.quantity ?? 0) + 1,
                Number(item.stock_quantity)
              ),
            }
          : item
      )
    );
  };

  const decreaseQuantity = () => {
    setCartProducts((prevCart) =>
      prevCart
        .map((item) =>
          item.product_id === cartProduct.product_id
            ? {
                ...item,
                quantity: Math.max((item.quantity ?? 1) - 1, 0),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="CartQuantityControl">
      <button className="CartQuantityControl__btn" onClick={decreaseQuantity}>
        -
      </button>
      <div>{cartProduct.quantity}</div>
      <button className="CartQuantityControl__btn" onClick={increaseQuantity}>
        +
      </button>
    </div>
  );
}
