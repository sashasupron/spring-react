import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const checkLogin = () => {
  //   if (login === "admin" && password === "1234") {
  //     dispatch({ type: "LOGIN" });
  //     navigate("/");
  //   } else {
  //     setError("Incorrect login or password");
  //   }
  // };

  const checkLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: login, password }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || 'Login failed');
        return;
      }

      dispatch({ type: 'LOGIN' });
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="login-page">
      <h1 id="login-page-h1">Login</h1>

      <input
        className="search-input"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input
        className="search-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p id="error-message">{error}</p>}

      <button className="search-button" onClick={checkLogin}>
        Log In
      </button>
    </div>
  );
};

export { LoginPage };
