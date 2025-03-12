import { ProductContext } from "../App";
import { useContext, useEffect, useState } from "react";
import EditProduct from "../Components/InventoryManager/EditProduct";
import "./InventoryManager.css";
import InsertProduct from "../Components/InventoryManager/InsertProduct";
export default function InventoryManager() {
  const [editingProductId, setEditingProductId] = useState(null);
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
    <div className="inventoryManager">
      <InsertProduct />
      <table className="inventoryManager__table">
        <thead>
          <tr>
            <th>id</th>
            <th>img</th>
            <th>Name</th>
            <th>Stock Quantity</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td>{p.product_id}</td>
              <td>
                <img src={p.image_url} alt="" />
              </td>
              <td>{p.product_name}</td>
              <td>{p.stock_quantity}</td>
              <td>{p.product_price}</td>
              <td>
                <EditProduct
                  product_item={p}
                  editingProductId={editingProductId}
                  setEditingProductId={setEditingProductId}
                />
                {/* <button onClick={() => handleDeleteProduct(p.product_id)}>
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
