import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Sending verification code to:', email);
      navigate('/verifyCode');
    } else {
      setErrorMsg('Please enter your email address!');
    }
  };

  return (
    <div style={{fontFamily: 'Arial, sans-serif', margin: 0 }}>
    <header>
      <nav style={{
                  backgroundColor: '#003459',
                  padding: '30px',
                  color: 'white',
                  textAlign: 'center'
              }}>
        <h1 style={{fontWeight: 'bold', fontSize: '30px'}}>Bank of Banks</h1>
      </nav>
    </header>

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
      }}>
         <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', marginTop: '40px'}}>Forgot Password</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Email:</label>
            <input
              style={{
                padding: '10px',
                backgroundColor: '#D3D3D3',
                fontSize: '15px',
                borderRadius: '4px',
                border: '1px solid #809AAC',
                marginBottom: '15px',
                width: '93%'
              }}

              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              required
            />
          </div>
          <button 
            style={{
              width: '100px',
              padding: '10px',
              backgroundColor: '#003459',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'center',
              marginTop: '10px',
              fontSize: '15px'
            }}>Submit</button>
          <br />
          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

