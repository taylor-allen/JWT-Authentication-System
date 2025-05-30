import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState } from "react";
import { signup, login } from "../hooks/actions";

export const AuthForm = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const onLoginSuccess = (token) => {
    dispatch({ type: "updateToken", payload: token }); 
    navigate("/private"); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (isLogin) {
      const { data, ok } = await login(email, password);
      if (ok) {
        setMessage('Login successful!');
        onLoginSuccess();
      } else {
        setMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } else {
      // Handle Signup
      const { data, ok } = await signup(email, password);
      if (ok) { 
        setMessage('Signup successful! Please log in.');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.message || 'Signup failed. Email might be taken.');
      }
    }
  };
  return (
    <div className="container">
      <div
        style={{
          maxWidth: "400px",
          margin: "20px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Email:
            </label>
            <input
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
          
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        {message && (
          <p
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: message.includes("successful") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}
        <p style={{ textAlign: "center", marginTop: "25px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              setMessage("");
              setEmail("");
              setPassword("");
            }}
            style={{
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isLogin ? "Sign Up here" : "Log In here"}
          </span>
        </p>
      </div>

      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
