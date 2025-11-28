import React from 'react';
import axios from 'axios';

const Billing = ({ store }) => {
  const cart = JSON.parse(localStorage.getItem('cl')) || [];
  const totalAmount = cart.reduce((sum, item) => sum + item.item.pcost * item.qty, 0);

  const handleBooking = async () => {
    try {
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        await axios.post("http://localhost:8081/booking", {
          pid: item.item.pid,
          pname: item.item.pname,
          pcost: item.item.pcost,
          pimage: item.item.pimage,
          pqty: item.qty,
        });
      }

      alert("Booking Confirmed!");

      // Clear cart
      localStorage.setItem("cl", JSON.stringify([]));
      localStorage.setItem("count", 0);
      store.dispatch({ type: "page", data: "Cars" });

    } catch (error) {
      alert("Failed to confirm booking. Please try again.");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Car Rental Invoice</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={th}>Car Model</th>
            <th style={th}>Cost per Day</th>
            <th style={th}>Days Rented</th>
            <th style={th}>Rental Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td style={td}>{item.item.pname}</td>
              <td style={td}>{item.item.pcost}</td>
              <td style={td}>{item.qty}</td>
              <td style={td}>
                ₹{(item.item.pcost * item.qty).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', fontSize: '18px', marginTop: '20px' }}>
        <strong>Total Amount to Pay:</strong> ₹{totalAmount.toLocaleString()}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handleBooking}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: 'yellowgreen',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

const th = {
  border: '1px solid #ddd',
  padding: '10px',
  backgroundColor: '#f4f4f4',
};

const td = {
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
};

export default Billing;
