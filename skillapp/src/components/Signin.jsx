import axios from "axios";
import "./style.css";

function Login({ store }) {

  function Fun1(event) {
    event.preventDefault();

    const email = document.getElementById("usr").value;
    const password = document.getElementById("pwd").value;

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email)) {
      alert("Only @gmail.com email addresses are allowed.");
      return;
    }

    if (password.length === 0) {
      alert("Please enter a password.");
      return;
    }

    axios.post("http://localhost:8081/check", { email, password })
      .then((res) => {
        if (res.data.role !== 0) {
          localStorage.setItem("un", res.data.name);
          localStorage.setItem("role", res.data.role);
          store.dispatch({ type: "page", data: "Electronics" });
        } else {
          alert("Login Failed, Retry or Signup");
        }
      })
      .catch((err) => {
        alert("Login request failed. Please check the server.");
        console.error(err);
      });
  }

  function Mover() {
    document.getElementById("f1").className = "mover-form";
  }

  function Mleave() {
    document.getElementsByName("nf1")[0].className = "login-form";
  }

  return (
    <form id="f1" name="nf1" className="login-form" onMouseOver={Mover} onMouseLeave={Mleave}>
      <table>
        <tbody>
          <tr style={{ textAlign: 'center', backgroundColor: 'skyblue' }}>
            <td colSpan={2}> <b> Login </b> </td>
          </tr>
          <tr className="form-group">
            <td><label htmlFor="usr">Email</label></td>
            <td><input type="email" className="form-control" id="usr" required /></td>
          </tr>
          <tr className="form-group">
            <td><label htmlFor="pwd">Password</label></td>
            <td><input type="password" className="form-control" id="pwd" required /></td>
          </tr>
          <tr className="form-group" style={{ textAlign: 'center' }}>
            <td colSpan={2}>
              <button onClick={Fun1} style={{ backgroundColor: 'yellowgreen' }}> Login </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Login;
