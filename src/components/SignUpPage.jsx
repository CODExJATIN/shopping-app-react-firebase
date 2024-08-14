import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, password, confirmPassword, address } = formData;

    if (!fullName || !email || !password || !confirmPassword || !address) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // Create user with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        fullName,
        email,
        address,
        createdAt: new Date(),
        myCart: [], 
        myOrders: []
      });
      

      toast.success("User registered successfully!");
      navigate('/login');

    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <section>
          <header className="header">
            <h1>Sign Up</h1>
          </header>

          <form className="login-signup-form" onSubmit={handleSubmit}>
            <label htmlFor="signupName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="signupName"
              name="fullName"
              className="input-field"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <label htmlFor="signupEmail" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="signupEmail"
              name="email"
              className="input-field"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="signupPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="signupPassword"
              name="password"
              className="input-field"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label htmlFor="signupConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="signupConfirmPassword"
              name="confirmPassword"
              className="input-field"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <label htmlFor="signupAddress" className="form-label">
              Full Address
            </label>
            <textarea
              id="signupAddress"
              name="address"
              className="input-field textarea-field"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignupForm;
