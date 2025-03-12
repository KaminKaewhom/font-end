import { useState } from "react";
import "./CustomerForm.css";

export default function CustomerForm({ formData, handleChange }) {
  return (
    <div className="customerForm">
      <p className="customerForm__title">Customer</p>
      <form className="form" id="customerForm">
        <div className="customerForm__group-N-P">
          <div className="input-group">
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="phone">phone</label>
            <input
              type="tel"
              name="phone_number"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
