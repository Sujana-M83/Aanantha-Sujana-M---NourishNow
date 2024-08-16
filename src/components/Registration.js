/*import React, { useState } from 'react';
import './Registration.css';
import {Link} from 'react-router-dom';

 const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Link to="/home"><button type="submit" className="register-button">Register</button></Link>
      </form>
      <p>Already have an account?<Link to="/login">Login</Link></p>
    </div>
  );
};

export default Registration;*/
// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './AuthService';
import { GoogleLogin } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
      e.preventDefault();
      setMessage(''); 
      setError(''); 
      try {
          const response = await AuthService.register({ firstName, lastName, email, password });
          console.log(response);  
          if (response.status === 200 && response.data === 'User registered successfully') {
              setMessage("Registration successful! Login to go to homepage")
          } else {
              setMessage(response.data); 
          }
      } catch (error) {
          console.error(error);  
          if (error.response && error.response.data) {
              setError(error.response.data); 
          } else {
              setError('Registration failed. Please try again.'); 
          }
      }
  };
  const handleGoogleSuccess = (response) => {
    console.log('Google Login Success:', response);
    // Handle the Google login success logic here
  };

  const handleGoogleFailure = (error) => {
    console.error('Google Login Error:', error);
    // Handle the Google login error logic here
  };
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Registration</div>
                        <div className="card-body">
                            {message && <div className="alert alert-info">{message}</div>}
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleRegister}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Register</button>
                            </form>
                            <div className="mt-3">
                                <span>Already registered? <Link to="/login">Login here</Link></span>
                            </div>
                            <div className="mt-3">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                />
              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
