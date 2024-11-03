import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPw] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://www.sjsu.edu/', {
        userid: username,
        password: password,
      });

      if (response.data.success) {
        navigate('/userPortal');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <header>
        <nav className="navbar">
          <h1> Bank of Banks</h1>
        </nav>
      </header>

      <div className="login">
        <h2>LOGIN</h2>
        <h4> Sign in to continue</h4>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>User name:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          <button type="submit">Login</button>
        </form>
        <br />
        <div className="ForgotPassword">
          <a href="/ForgotPassword">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;