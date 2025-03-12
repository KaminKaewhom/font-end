import "./CartDetail.css";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import CustomerForm from "./CustomerForm";
import { CartProductContext } from "../../App";
import { useContext, useState } from "react";

export default function CartDetail() {
  const { cartProducts, setCartProducts } = useContext(CartProductContext);

  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.name ||
      !formData.phone_number ||
      !formData.address
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const orderData = {
      ...formData,
      items: cartProducts,
    };
    console.log(orderData);
    try {
      const response = await fetch("http://localhost:5000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order successful:", data);

        alert("บันทึกคำสั่งซื้อสำเร็จ");
        window.location.reload();
      } else {
        console.error("Error:", data.error);
        alert(data.error || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("เกิดข้อผิดพลาดในการส่งคำสั่งซื้อ");
    }
  };

  return (
    <div className="CartDetail">
      <CustomerForm formData={formData} handleChange={handleChange} />
      <h4>Cart</h4>
      <div className="CartDetail__list">
        {cartProducts.length === 0 ? (
          <span>Your cart is empty</span>
        ) : (
          cartProducts.map((product) => (
            <CartItem key={product.product_id} cartProduct={product} />
          ))
        )}
      </div>
      <CartTotal />
      <button className="sign" onClick={handleSubmit}>
        Create Order
      </button>
    </div>
  );
}
