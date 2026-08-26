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
      {/* Back to home btn */}
      <BackToHome />

      <h1 className={styles.header}>Register</h1>

      <div className={styles.container}>
        <form className={styles.registerForm} onSubmit={handleSubmit}>
          {/* account type */}
          <fieldset className={styles.fieldset}>
            <legend>Account type</legend>

            <label className={styles.labelCustomer}>
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

          {/* name */}
          <label htmlFor="name">Username</label>

          <input
            className={styles.inputName}
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            placeholder="username"
          />

          {/* email */}
          <label htmlFor="email">Email</label>

          <input
            className={styles.inputEmail}
            name="email"
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
          <label htmlFor="passwordRegister">Password</label>

          <input
            className={styles.inputPassword}
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
            placeholder="password"
          />

          {/* register button */}
          <button className={styles.registerBtn} type="submit">
            Register
          </button>

          {error && <p>{error}</p>}

          {success && <p>{success}</p>}

          {/* link */}
          <p>
            Already have an account?{' '}
            <Link className={styles.linkToLogin} to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
