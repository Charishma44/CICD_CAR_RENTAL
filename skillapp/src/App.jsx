import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signin from './components/Signin'
import Signup from './components/Signup'
import ResponsiveAppBar from './components/Appbar'
import { Home, About, Page2 } from './components/Info'
import Cars from './components/Cars'
import Bookings from './components/Bookings'
import Locations from './components/Locations'
import Admin from './components/Admin'
import AddCar from './components/AddCar'
import Cartpage from './components/Cartpage'
import Billing from './components/Billing'

function App({ store }) {
  function Display() {
    switch (store.getState()) {
      case "Signin":
        return (<Signin store={store} />)
      case "Signup":
        return (<Signup />)
      case "Cars":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<Cars store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "Bookings":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<Bookings store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "Locations":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<Locations store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "About":
        return (<About />)
      case "Admin":
        if (localStorage.getItem("role") === "1")
          return (<Admin />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "AddCar":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<AddCar store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "Cartpage":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<Cartpage store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "Billing":
        if (localStorage.getItem("role") === "1" || localStorage.getItem("role") === "2")
          return (<Billing store={store} />)
        else {
          alert("You are Not Authorized")
          return (<Signin store={store} />)
        }
      case "Home":
        return (<Home />);
      default:
        return (<Home />);
    }
  }

  function cartClick() {
    store.dispatch({ "type": "page", "data": "Cartpage" })
  }

  return (
    <div className='container'>
      <div className='header' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className='menubar' style={{ width: "85%" }}>
          <ResponsiveAppBar store={store} a={10} b={"abc"} />
        </div>
        <div style={{ marginRight: "2vw", display: "flex", alignItems: "center" }}>
          <button onClick={cartClick} style={{
            backgroundColor: "#2196F3",
            color: "white",
            padding: "10px 16px",
            fontSize: "14px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}>
            Pay Now
          </button>
          <div style={{ marginLeft: "8px", fontSize: "16px", color: "#2196F3", fontWeight: "bold" }}>
            ({localStorage.getItem("count") || 0})
          </div>
        </div>
      </div>

      <center style={{ margin: 0, padding: 0 }}>
        <Display />
      </center>
    </div>
  )
}

export default App
