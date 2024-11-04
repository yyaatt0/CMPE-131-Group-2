import React, { useState } from 'react';
import './Registration.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
    } else {
      setSuccessMsg('Password reset successful.');
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
        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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

          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>New Password:</label>
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

              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              required
            />
          </div>

          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Confirm New Password:</label>
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

              type="password"
              name="confirmPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              id="confirmPassword"
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
          {successMsg && <div className="success-message">{successMsg}</div>}
          {errorMsg && <div className="error-message">{errorMsg}</div>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;