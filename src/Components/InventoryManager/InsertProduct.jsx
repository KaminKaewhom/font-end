import { useRef, useState } from "react";
import "./InsertProduct.css";

export default function InsertProduct() {
  const nameRef = useRef();
  //   const brandRef = useRef();
  //   const categoryRef = useRef();
  const priceRef = useRef();
  const stockRef = useRef();
  //   const descriptionRef = useRef();
  const [imageUrl, setImageUrl] = useState("");

  const handleInsert = async (e) => {
    e.preventDefault();

    const productData = {
      product_name: nameRef.current.value,
      product_brand: "other",
      category_id: 1,
      product_price: priceRef.current.value,
      stock_quantity: stockRef.current.value,
      description: " ",
      image_url: imageUrl,
    };

    try {
      const response = await fetch("http://localhost:5000/insertProducts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Insert failed!");
      }

      const result = await response.json();
      alert(`Product added successfully! ID: ${result.insertedId}`);

      nameRef.current.value = "";
      //   brandRef.current.value = "";
      //   categoryRef.current.value = "";
      priceRef.current.value = "";
      stockRef.current.value = "";
      //   descriptionRef.current.value = "";
      setImageUrl(""); // รีเซ็ตรูป
      window.location.reload();
    } catch (error) {
      console.error("Insert error:", error);
      alert("Insert failed. Please try again.");
    }
  };

  return (
    <div className="insertProducts">
      <h3>Insert Product</h3>
      <form onSubmit={handleInsert}>
        <div className="input-group">
          <label>Product Name</label>
          <input type="text" ref={nameRef} required />
        </div>

        <div className="input-group">
          <label>Price</label>
          <input type="number" ref={priceRef} required />
        </div>

        <div className="input-group">
          <label>Stock Quantity</label>
          <input type="number" ref={stockRef} required />
        </div>

        <div className="input-group">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {imageUrl && (
          <img src={imageUrl} alt="Preview" className="image-preview" />
        )}

        <button className="sign" type="submit">
          Insert Product
        </button>
      </form>
    </div>
  );
}
