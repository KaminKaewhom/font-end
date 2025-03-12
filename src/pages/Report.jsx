import { useEffect, useState } from "react";
import "./Report.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };

  const formattedDate = date.toLocaleDateString("th-TH", dateOptions);
  const formattedTime = date.toLocaleTimeString("th-TH", timeOptions);

  return `${formattedDate} ${formattedTime}`;
};

export default function Report() {
  const [reportData, setReportData] = useState({ data: [] });

  useEffect(() => {
    async function saveReport() {
      try {
        const response = await fetch("http://localhost:5000/report", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ check: "save" }),
        });

        const data = await response.json();

        // กรองข้อมูลให้อยู่ในรูปแบบที่รวมข้อมูลตาม order_id
        const groupedData = data.data.reduce((acc, curr) => {
          const existingOrder = acc.find(
            (item) => item.order_id === curr.order_id
          );
          if (existingOrder) {
            // ถ้ามีข้อมูลออเดอร์เดิมอยู่แล้วให้รวมข้อมูล
            existingOrder.quantity += `\n${curr.quantity.toString()}`;
            // คำนวณ total_amount ใหม่
            existingOrder.total_amount += curr.quantity * curr.price;
            // รวมชื่อผลิตภัณฑ์เป็นสตริงและเว้นบรรทัด
            existingOrder.product_names += `\n${curr.product_name}`;

            existingOrder.price += `\n${curr.price.toString()}`;
          } else {
            // ถ้าไม่มีก็เพิ่มข้อมูลใหม่
            acc.push({
              ...curr,
              product_names: curr.product_name,
              total_amount: curr.quantity * curr.price, // คำนวณยอดรวม
            });
          }
          return acc;
        }, []);

        setReportData({ data: groupedData });
        console.log("Second request successful:", groupedData);
      } catch (err) {
        console.error("Error with second request:", err);
      }
    }
    saveReport();
  }, []);

  return (
    <div className="report-container">
      <table className="report-table">
        <thead>
          <tr>
            <th>report id</th>
            <th>order id</th>
            <th>order date</th>
            <th>customer name</th>
            <th className="productName">product name</th>
            <th>category name</th>
            <th>quantity</th>
            <th>price</th>
            <th>total amount</th>
          </tr>
        </thead>
        <tbody>
          {reportData.data.length > 0 ? (
            reportData.data.map((r, index) => {
              return (
                <tr key={r.report_id}>
                  <td>{index + 1}</td>
                  <td>{r.order_id}</td>
                  <td>{formatDate(r.order_date)}</td>
                  <td>{r.customer_name}</td>
                  <td className="productName">{r.product_names}</td>
                  <td>{r.category_name}</td>
                  <td>{r.quantity}</td>
                  <td>{r.price}</td>
                  <td>{r.total_amount}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="loading-row" colSpan="9">
                กำลังโหลดข้อมูล...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
