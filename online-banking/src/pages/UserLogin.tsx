import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

const UserLogin = () => {
  const [username, setUsername] = useState<string>('');   // Store the entered username
  const [password, setPassword] = useState<string>('');   // Store the entered password
  const [error, setError] = useState<string | null>(null);   // Store error messages 
  const navigate = useNavigate();

  // Function to handle when the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send HTTP POST request to backend to authenticate login information
      const response = await axios.post('http://localhost:3000/auth/login', {
        username: username, // Username is sent in the body of the request
        password: password, // Password is sent in the body of the request
      }, { withCredentials: true }); // Include cookies for session management

      // If authentication is successful, navigate to the user page  
      if (response.data.success) {
        navigate('/userPortal'); // Redirect to the user portal
      } else {
        setError(response.data.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: ' sans-serif', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Holds the nav bar and heading  */}
      <header>
        <nav
          style={{
            backgroundColor: '#003459',
            padding: '30px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          <h1>Bank of Banks</h1>
        </nav>
      </header>

      {/* Navigation Bar */}
      <NavBar />

      <div
        style={{
          width: '300px',
          margin: '100px auto',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#333' }}>LOGIN</h2>
        <h4 style={{ textAlign: 'center' }}>Sign in to continue</h4>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Username Input */}
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                padding: '10px',
                backgroundColor: '#D3D3D3',
                fontSize: '15px',
                borderRadius: '4px',
                border: '1px solid #809AAC',
                marginBottom: '15px',
                width: '93%',
              }}
            />
          </div>

          {/* Password Input */}
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '10px',
                backgroundColor: '#D3D3D3',
                fontSize: '20px',
                borderRadius: '4px',
                border: '1px solid #809AAC',
                marginBottom: '15px',
                width: '93%',
              }}
            />
          </div>

          {/* Display Error Message */}
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>
              {error}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: '55%',
              padding: '10px',
              backgroundColor: '#003459',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '15px',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#003459')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#465C81')}
          >
            Login
          </button>
        </form>

        {/* Forgot Password Link */}
        <br />
        <div style={{ textAlign: 'center' }}>
          <a href="/ForgotPassword">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
