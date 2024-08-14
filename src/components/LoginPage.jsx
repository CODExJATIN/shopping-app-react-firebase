import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Adjust the import path based on your project structure
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { loginEmail, loginPassword } = formData;

    if (!loginEmail || !loginPassword) {
      toast.error("Both email and password are required");
      return;
    }

    try {
      // Sign in user with Firebase authentication
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      toast.success("Logged in successfully!");
      navigate('/');

      // Redirect or perform any other actions after login
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className='form-page'>
      <div className="form-container">
        <section>
          <header className="header">
            <h1>Login</h1>
          </header>

          <form className="login-signup-form" onSubmit={handleSubmit}>
            <label htmlFor="loginEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              className="input-field"
              autoComplete="email"
              value={formData.loginEmail}
              onChange={handleChange}
              required
            />

            <label htmlFor="loginPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              className="input-field"
              autoComplete="current-password"
              value={formData.loginPassword}
              onChange={handleChange}
              required
            />

            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginForm;
