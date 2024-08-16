import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../components/AuthContext.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { updateUser } = useContext(AuthContext);
  const apiRequest = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      console.log("Sending login request", { username: email, password });
      const res = await apiRequest.post("/login", {
        email: email,
        password: password,
      });
      console.log("Login response", res);
      updateUser(res.data);
      navigate("/home");
    } catch (err) {
      console.error("Login error", err);
      if (err.response && err.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("An error occurred during login. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login Form</div>
            <div className="card-body">
              {message && <div className="alert alert-danger">{message}</div>}
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
              <div className="mt-3">
                <span>Not registered? <Link to="/register">Register here</Link></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
