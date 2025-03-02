import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = { username, password };
    const url = isRegistering ? 'http://localhost:8080/api/register' : 'http://localhost:8080/api/login';

    axios.post(url, userData)
      .then((response) => {
        const token = response.data;
        console.log(isRegistering ? 'Registration successful' : 'Login successful', token);
        // Handle the token here (e.g., store it in localStorage or state)
      })
      .catch((error) => {
        setError(isRegistering ? 'Registration failed' : 'Invalid username or password');
      });
  };

  return (
    <div>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? 'Already have an account? Login' : 'Need an account? Register'}
      </button>
    </div>
  );
};

export default Login;