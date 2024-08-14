import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Adjust the path to your Firebase config file
import { toast } from 'react-toastify';

const GetStarted = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter an email address.');
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email exists, redirect to login page
        toast.info('Email exists. Redirecting to login page.');
        navigate('/login');
        
      } else {
        // Email does not exist, redirect to signup page
        toast.info('Email does not exist. Redirecting to signup page.');
        navigate('/signup');
      }
    } catch (error) {
      toast.error('An error occurred while checking the email.');
      console.error('Error checking email:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <section>
          <header className="header">
            <a
              href="/"
              aria-label="BallCart Home Page"
              className="logo-title"
            >
              <strong>BallCart</strong>
            </a>
            <h1>Sign in or create your account</h1>
            <p>
              Not sure if you have an account?<br />
              Enter your email and we’ll check for you.
            </p>
          </header>

          <form id="sign-in-form" className="sign-in-form" onSubmit={handleSubmit}>
            <label htmlFor="loginId" className="form-label">
              Email Address
            </label>
            <div className="input-container">
              <label htmlFor="email" className="visually-hidden"></label>
              <input
                type="email"
                id="email"
                name="email"
                aria-label="Email Address"
                className="input-field"
                autoComplete="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Continue
            </button>
            <p className="privacy-notice">
              Securing your personal information is our priority.
              <br />
              <a
                href="https://corporate.walmart.com/privacy-security"
                target="_blank"
                rel="noopener noreferrer"
              >
                See our privacy measures.
              </a>
            </p>
          </form>
        </section>
      </div>

      <div className="footer-container">
        <footer className="footer">
          <div>© 2024 BallCart. All Rights Reserved.</div>
          <ul className="footer-links">
            <li>
              <button className="feedback-button">Give feedback</button>
            </li>
            <li>
              <a
                href="https://corporate.walmart.com/privacy-security/california-privacy-rights"
                target="_blank"
                rel="noopener noreferrer"
              >
                CA Privacy Rights
              </a>
            </li>
            <li>
              <a
                href="https://www.walmart.com/account/api/ccpa-intake?native=false&amp;app=gm&amp;type=sod"
                target="_blank"
                rel="noopener noreferrer"
              >
                Your Privacy Choices
              </a>
            </li>
            <li>
              <a
                href="https://corporate.walmart.com/privacy-security/walmart-privacy-notice#what-type-of-information-do-we-collect-and-how-do-we-collect-it"
                target="_blank"
                rel="noopener noreferrer"
              >
                Notice at Collection
              </a>
            </li>
            <li>
              <a
                href="https://www.walmart.com/account/api/ccpa-intake?native=false&amp;app=gm&amp;type=access"
                target="_blank"
                rel="noopener noreferrer"
              >
                Request My Personal Information
              </a>
            </li>
            <li>
              <a
                href="https://www.walmart.com/account/delete-account"
                target="_blank"
                rel="noopener noreferrer"
              >
                Delete Account
              </a>
            </li>
            <li>
              <a
                href="https://corporate.walmart.com/california-transparency"
                target="_blank"
                rel="noopener noreferrer"
              >
                California Supply Chains Act
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};

export default GetStarted;
