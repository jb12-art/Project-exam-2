// src/pages/Login.tsx

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import BackToHome from '../components/BackToHome';
import Layout from '../components/Layout';
import { createApiKey, loginUser } from '../api/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Login'; // browser tab text
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    try {
      const user = await loginUser({
        email,
        password,
      });

      localStorage.setItem('accessToken', user.accessToken);
      localStorage.setItem('userName', user.name);
      localStorage.setItem(
        'venueManager',
        user.venueManager === true ? 'true' : 'false',
      );

      const apiKey = await createApiKey(user.accessToken);

      localStorage.setItem('apiKey', apiKey.key);

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Login failed');
      }
    }
  }

  return (
    <Layout>
      {/* Back to home btn */}
      <BackToHome />

      <h1 className={styles.header}>Login</h1>

      <div className={styles.container}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          {/* email */}
          <label htmlFor="emailLogin">Email</label>

          <input
            className={styles.inputEmail}
            type="email"
            name="email"
            id="emailLogin"
            required
            placeholder="example@stud.noroff.no"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />

          {/* password */}
          <label htmlFor="passwordLogin">Password</label>

          <input
            className={styles.inputPassword}
            type="password"
            name="password"
            id="passwordLogin"
            required
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />

          {error && <p>{error}</p>}

          {/* login button */}
          <button className={styles.loginBtn} type="submit">
            Login
          </button>

          {/* link */}
          <p>
            Don't have an account?{''}
            <Link className={styles.linkToRegister} to="/register">
              Register
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
