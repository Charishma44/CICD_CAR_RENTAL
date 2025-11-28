import React, { useState, useEffect } from 'react';
import './items.css';
import axios from 'axios';

export default function Cars({ store }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    // Fetch car data only once when component mounts
    axios.get("http://localhost:8081/cars")
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
        setError("Failed to fetch cars. Try again later.");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once

  function cardAction(item) {
    localStorage.setItem("element", JSON.stringify(item));
    store.dispatch({ type: "page", data: "AddCar" });
  }

  if (loading) {
    return <div>Loading Car List...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='card-parent'>
      {result.map((item) => (
        <div className='card' onClick={() => cardAction(item)} key={item.pid}>
          <div className='card-img'>
            <img src={item.pimage} alt={item.pname} width={200} height={200} />
          </div>
          <div className='card-name'>
            <p>{item.pname}</p>
          </div>
          <div className='card-price'>
            <p>Rs. {item.pcost} / day</p>
          </div>
        </div>
      ))}
    </div>
  );
}
