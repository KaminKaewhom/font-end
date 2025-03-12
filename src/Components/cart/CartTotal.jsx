import { useContext } from "react";
import { CartProductContext } from "../../App";
import "./CartTotal.css";

export default function CartTotal() {
  const { cartProducts } = useContext(CartProductContext);

  const totalPrice = cartProducts.reduce(
    (sum, product) =>
      sum + Number(product.product_price) * (product.quantity ?? 1),
    0
  );

  const finalTotal = totalPrice;

  return (
    <>
      <div className="cartTotal">
        <h4>Total : ฿ {new Intl.NumberFormat("th-TH").format(finalTotal)}</h4>
      </div>
    </>
  );
}
