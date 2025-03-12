import "./CartItem.css";
import CartQuantityControl from "./CartQuantityControl";
export default function CartItem({ cartProduct }) {
  return (
    <div className="cartItem">
      <img src={cartProduct.image_url} alt="" />
      <div className="cartItem__detail">
        <p className="cartItem__name">{cartProduct.product_name}</p>
        <p className="cartItem__quantity">
          quantity : {cartProduct.stock_quantity}
        </p>
        <p>
          ฿ {new Intl.NumberFormat("th-TH").format(cartProduct.product_price)}
        </p>
      </div>
      <CartQuantityControl cartProduct={cartProduct} />
    </div>
  );
}
