  import React, { useState } from 'react'
  import './items.css'

  export default function AddCar({ store }) {
    const item = JSON.parse(localStorage.getItem("element"))
    const [qty, setQty] = useState(1)
    const [datetime, setDatetime] = useState("")
    const [driveOption, setDriveOption] = useState("self")
    let cl = JSON.parse(localStorage.getItem("cl")) || []

    function bookCar() {
      if (!datetime) {
        alert("Please select a date and time for booking.")
        return
      }

      let c = 0
      cl.push({
        item: item,
        qty: qty,
        date: datetime,
        drive: driveOption
      })

      localStorage.setItem("cl", JSON.stringify(cl))
      cl.forEach(el => {
        c += el.qty
      })
      localStorage.setItem("count", c)
      store.dispatch({ type: "page", data: "Cartpage" })
    }

    return (
      <div className='card-parent' style={{ flexDirection: "column", alignItems: "center" }}>

        <div className='card'>
          <div className='card-img'>
            <img src={item.pimage} alt="not available" width={200} height={200} />
          </div>
          <div className='card-name'>
            <p>{item.pname}</p>
          </div>
          <div className='card-price'>
            <p>Rs. {item.pcost} / day</p>
          </div>
        </div>

        <div className='cart-qty'>
          <svg onClick={() => setQty(qty + 1)} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
            <path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z" />
          </svg>
          <input
            type="text"
            value={qty}
            size={3}
            style={{
              textAlign: "center",
              borderRadius: "5px",
              height: "30px",
              fontSize: "12px",
              color: "brown",
              fontWeight: "bold",
              margin: "10px"
            }}
          />
          <svg onClick={() => qty > 1 ? setQty(qty - 1) : qty} xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#0000F5">
            <path d="M200-446.67v-66.66h560v66.66H200Z" />
          </svg>

          <br /><br />

          {/* DateTime Input */}
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              margin: "10px"
            }}
          />

          {/* Drive Option */}
          <div style={{ marginTop: "10px" }}>
            <label style={{ fontWeight: "bold", marginRight: "10px" }}>Drive Option:</label>
            <select
              value={driveOption}
              onChange={(e) => setDriveOption(e.target.value)}
              style={{
                padding: "6px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            >
              <option value="self">Self-Driving</option>
              <option value="with-driver">With Driver</option>
            </select>
          </div>

          <br />
          <button
            onClick={bookCar}
            style={{
              backgroundColor: "yellowgreen",
              borderRadius: "10px",
              padding: "5px 15px",
              marginTop: "15px"
            }}
          >
            BOOK THIS CAR
          </button>
        </div>

      </div>
    )
  }
