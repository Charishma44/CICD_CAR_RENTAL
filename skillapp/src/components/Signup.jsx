import axios from "axios";
import "./style.css";

function Signup() {

    async function handleSignup(event) {
        event.preventDefault();

        const name = document.getElementById("usrname").value.trim();
        const role = document.getElementById("sel1").value;
        const email = document.getElementById("usr").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("pwd").value;

        // Email validation
        if (!email.endsWith("@gmail.com")) {
            alert("Only @gmail.com emails are allowed.");
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must be at least 8 characters, include 1 uppercase letter and 1 symbol.");
            return;
        }

        // Check for duplicate users
        try {
            const existing = await axios.get("http://localhost:8081/users");
            const isDuplicate = existing.data.some(user => user.email === email);
            if (isDuplicate) {
                alert("Account with this email already exists.");
                return;
            }
        } catch (err) {
            alert("Error checking existing users. Make sure backend is running.");
            return;
        }

        // Send OTP
        try {
            const sendOtpResponse = await axios.post(
                "http://localhost:8081/send-otp",
                { phone },
                { headers: { "Content-Type": "application/json" } }
            );
            alert(sendOtpResponse.data);

            // Prompt user to enter OTP (check console if trial Twilio)
            const otp = prompt("Enter the OTP sent to your phone (or check console if trial Twilio):");
            if (!otp) {
                alert("OTP is required to complete registration.");
                return;
            }

            const verifyResponse = await axios.post(
                "http://localhost:8081/verify-otp",
                { phone, otp },
                { headers: { "Content-Type": "application/json" } }
            );

            if (verifyResponse.data !== "Verified") {
                alert("Invalid OTP. Signup cancelled.");
                return;
            }
        } catch (error) {
            console.error("OTP error:", error.response ? error.response.data : error.message);
            alert("OTP verification failed. Check console for details.");
            return;
        }

        // Register user
        try {
            const res = await axios.post(
                "http://localhost:8081/user",
                { name, role, email, phone, password },
                { headers: { "Content-Type": "application/json" } }
            );
            alert(res.data);
        } catch (err) {
            console.error("Signup failed:", err.response ? err.response.data : err.message);
            alert("Signup failed. Check console for details.");
        }
    }

    function handleMouseOver() {
        document.getElementById("f1").className = "mover-signup";
    }

    function handleMouseLeave() {
        document.getElementsByName("nf1")[0].className = "login-form";
    }

    return (
        <form
            id="f1"
            name="nf1"
            className="login-form"
            style={{
                margin: '50px auto',
                padding: '20px',
                width: '400px',
                boxShadow: '0 0 20px #77ff77',
                borderRadius: '10px',
                backgroundColor: 'white'
            }}
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
        >
            <table style={{ width: '100%' }}>
                <thead>
                    <tr style={{ textAlign: 'center', backgroundColor: 'skyblue' }}>
                        <td colSpan={2} style={{ padding: '10px', fontWeight: 'bold' }}>User Sign Up Page</td>
                    </tr>
                </thead>
                <tbody>
                    <tr className="form-group">
                        <td><label htmlFor="usrname">Name</label></td>
                        <td><input type="text" id="usrname" required style={{ width: '100%' }} /></td>
                    </tr>
                    <tr className="form-group">
                        <td><label htmlFor="sel1">Role</label></td>
                        <td>
                            <select id="sel1" required style={{ width: '100%' }}>
                                <option value="1">ADMIN</option>
                                <option value="2">USER</option>
                            </select>
                        </td>
                    </tr>
                    <tr className="form-group">
                        <td><label htmlFor="usr">Email</label></td>
                        <td><input type="email" id="usr" required style={{ width: '100%' }} /></td>
                    </tr>
                    <tr className="form-group">
                        <td><label htmlFor="phone">Phone</label></td>
                        <td><input type="text" id="phone" required style={{ width: '100%' }} /></td>
                    </tr>
                    <tr className="form-group">
                        <td><label htmlFor="pwd">Password</label></td>
                        <td><input type="password" id="pwd" required style={{ width: '100%' }} /></td>
                    </tr>
                    <tr style={{ textAlign: 'center' }}>
                        <td colSpan={2}>
                            <button onClick={handleSignup} style={{ marginTop: '10px', backgroundColor: "yellowgreen", padding: "8px 20px", border: "none", borderRadius: "5px" }}>Signup</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default Signup;
