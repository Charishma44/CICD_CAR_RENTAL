import React, { useState } from 'react';
import './items.css';

export default function Cartpage({ store }) {
  const [cl, setCl] = useState(JSON.parse(localStorage.getItem("cl")) || []);

  function updateCart(newCart) {
    localStorage.setItem("cl", JSON.stringify(newCart));
    const totalQty = newCart.reduce((sum, item) => sum + item.qty, 0);
    localStorage.setItem("count", totalQty);
    setCl(newCart);
  }

  function removeItem(index) {
    const updated = cl.filter((_, i) => i !== index);
    updateCart(updated);
  }

  function billing() {
    store.dispatch({ type: "page", data: "Billing" });
  }

  function Amount() {
    return cl.reduce((sum, item) => sum + (item.item.pcost * item.qty), 0);
  }

  return (
    <div className='card-parent'>
      <div className='card' style={{ width: "auto", padding: "40px" }}>
        <table border={1} style={{ width: '100%', textAlign: 'center' }}>
          <thead>
            <tr>
              <th>Car Model</th>
              <th>Cost per Day</th>
              <th>Days Rented</th>
              <th>Rental Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cl.map((element, index) => (
              <tr key={index}>
                <td>{element.item.pname}</td>
                <td>{element.item.pcost}</td>
                <td>{element.qty}</td>
                <td className='card-price'>{element.item.pcost * element.qty}</td>
                <td>
                  <button onClick={() => removeItem(index)} style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <br /><br />
        <b>Total Amount to Pay:</b> ₹{Amount()}
        <br /><br />
        <button onClick={billing} style={{ backgroundColor: "yellowgreen", padding: '10px 20px', borderRadius: '5px' }}>
          Proceed to Pay
        </button>
      </div>
    </div>
  );
}
