import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserBar from '../components/UserBar';
import FooterCard from '../components/FooterCard';

const AdminLogin = () => {
  const [username, setUsername] = useState('');   // Store the entered username
  const [password, setPw] = useState('');   // Store the entered password
  const [error, setError] = useState('');
  const navigate = useNavigate();

    // Function to handle when the Admin submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Check default account login conditions
     if (username === 'admin' && password === 'admin1') {
        navigate('/AdminPortal'); //redirected to adminportal page
        return;
      }
    try {
            // Send HTTP POST request to backend to authenticate login information
      const response = await axios.post('http://localhost:3000/AdminLogin', {
        userid: username,  // Username is sent in the body of the request
        password: password, // password is sent in the body of the request
      });

      // If authentication is successful, navigate to the admin page  
      if (response.data.success && response.data.isAdmin) {
        navigate('/AdminPortal');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      // Handle errors during HTTP request sending
      setError('An error occurred. Please try again.');
    }
  };

  return (
  //  <div style={{ fontFamily: ' sans-serif' , flexDirection: 'column', minHeight: '100vh'}}>
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif'}}>

      {/* Navigation Bar */}
      <UserBar/>

      {/* Holds the nav bar and heading  */}
      
        {/* Upper portion of the page, later to include a functional nav bar so we can navigate through multiple pages
        Have this navbar as a component  */}
        {/* <nav style={{
          backgroundColor: '#003459',
          padding: '30px',
          color: 'white',
          textAlign: 'center'
        }}> */}
      <header style={{ backgroundColor: '#003459', color: 'white', padding: '24px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>

        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Bank of Banks </h1>

        
        
      </header>
      
      {/* This div holds the login potion of the page, like the textbox for the password/username,
      some of the buttons, and titles */}
      <div style={{
        width: '300px',
        margin: '100px auto',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        borderRadius: '10px',
      }}>
        <h2 style={{ textAlign: 'center', color: '#333' }}> ADMIN LOGIN</h2>
        <h4 style={{ textAlign: 'center' }}>Sign in to continue</h4>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* This div holds both the username and password input boxes */}
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Username:</label>
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
                width: '93%'
              }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              required
              style={{
                padding: '10px',
                backgroundColor: '#D3D3D3',
                fontSize: '20px',
                borderRadius: '4px',
                border: '1px solid #809AAC',
                marginBottom: '15px',
                width: '93%'
              }}
            />
          </div>

          {error && <div style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</div>}
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
              fontSize: '15px'
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#003459')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#465C81')}
          >
            Login
          </button>
        </form>


<p style={{ textAlign: "center" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const messageElement = document.getElementById("forgot-message");
            if (messageElement) {
              messageElement.style.display = "block"; 
            } else {
              console.error("Element with id 'forgot-message' not found.");
            }
          }}
        >
          Forgot Password?
        </a>
      </p>

      <div
        id="forgot-message"
        style={{ display: "none", color: "red", marginTop: "10px" }}
      >
        Please contact IT for assistance!
      </div>
        
       <div style={{ textAlign: 'center', margin: '20px auto' }}>

<a href="/userlogin" style={{ paddingBottom: '10px', display: 'inline-block' }}> User Login </a> 
</div>
      </div>
      <FooterCard/>

    </div>
  );
};

export default AdminLogin;
