import { useState, useEffect } from "react";
import "./EditProduct.css";

export default function EditProduct({
  product_item,
  editingProductId,
  setEditingProductId,
}) {
  const isOpen = editingProductId === product_item.product_id;
  const [img, setImg] = useState(product_item.image_url);
  const [name, setName] = useState(product_item.product_name);
  const [stockQuantity, setStockQuantity] = useState(
    product_item.stock_quantity
  );
  const [price, setPrice] = useState(product_item.product_price);

  useEffect(() => {
    if (isOpen) {
      setImg(product_item.image_url);
      setName(product_item.product_name);
      setStockQuantity(product_item.stock_quantity);
      setPrice(product_item.product_price);
    }
  }, [isOpen, product_item]);

  const handleSave = async () => {
    const updatedProduct = {
      product_id: product_item.product_id,
      product_name: name,
      product_price: price,
      stock_quantity: stockQuantity,
      image_url: img,
    };

    try {
      const response = await fetch("http://localhost:5000/update-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEditingProductId(null); // ปิด popup หลังบันทึกเสร็จ
        window.location.reload();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("เกิดข้อผิดพลาดในการอัพเดตสินค้า");
    }
  };

  return (
    <>
      <button
        className="edit-btn"
        onClick={() =>
          setEditingProductId(isOpen ? null : product_item.product_id)
        }
      >
        Edit
      </button>

      {isOpen && (
        <div className="editProduct__overlay">
          <div className="editProduct__popup">
            <button
              className="close-btn"
              onClick={() => setEditingProductId(null)}
            >
              ❌
            </button>
            <h3>Edit Product</h3>
            <img src={img} alt="Product" className="product-img" />
            <label>Image URL</label>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />

            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Stock Quantity</label>
            <input
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />

            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
}
