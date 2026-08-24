// src/pages/Register.tsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import BackToHome from '../components/BackToHome';
import { registerUser } from '../api/auth';
import styles from './Register.module.css';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [venueManager, setVenueManager] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    document.title = 'Register';
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');

    try {
      await registerUser({
        name,
        email,
        password,
        venueManager,
      });

      setSuccess('Registration successful! You can now login.');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Registration failed');
      }
    }
  }

  return (
    <Layout>
      <BackToHome />

      <h1 className={styles.header}>Register</h1>

      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          {/* name */}
          <label htmlFor="name">Username</label>

          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />

          {/* email */}
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            placeholder="example@stud.noroff.no"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            pattern=".+@stud\.noroff\.no"
            title="Use your @stud.noroff.no email address"
            required
          />

          {/* password */}
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
          />

          <fieldset>
            <legend>Account type</legend>

            <label>
              <input
                type="radio"
                name="accountType"
                checked={!venueManager}
                onChange={() => setVenueManager(false)}
              />
              Customer
            </label>

            <label>
              <input
                type="radio"
                name="accountType"
                checked={venueManager}
                onChange={() => setVenueManager(true)}
              />
              Venue Manager
            </label>
          </fieldset>

          {/* register button */}
          <button type="submit">Register</button>

          {error && <p>{error}</p>}

          {success && <p>{success}</p>}
        </form>
      </div>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </Layout>
  );
}
