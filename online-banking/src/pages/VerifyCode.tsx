import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const VerifyCode = () => {
  const [code, setCode] = useState(''); // Store the confirmation code entered by the user
  const [errorMsg, setErrorMsg] = useState('');     // Store error messages when errors occur
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState<string>('');   // Store success message when confirmation is successful

// Function to handle when the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send HTTP POST request to backend with confirmation code
      const response = await axios.post('https://backend/verify-code', {
        code: code,
      });

      if (response.data.success) {
         // If authentication is successful, display a success message and go to the resetPassword page.
        setSuccessMsg('Verification successful!');
        navigate('/resetPassword');
      } else {
        // If the authentication code is invalid, display an error message
        setErrorMsg('Invalid verification code. Please try again1');
      }
    } catch (error) {
      setErrorMsg('An error occurred!');
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

       {/* ask the user to enter their verify code */}
      <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', marginTop: '40px'}}>Verify Code</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>
              Enter your code:</label>
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
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>



{/* This is the "Submit" button */}
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
          
          {/* for the error messages and success messages */}
          {successMsg && <div className="success-message">{successMsg}</div>}
          {errorMsg && <div className="error-message">{errorMsg}</div>}
       




      </form>
    </div>
    </div>
  );
};

export default VerifyCode;
