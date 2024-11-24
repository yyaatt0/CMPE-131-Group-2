import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterCard from '../components/FooterCard';
import NavBar from '../components/NavBar';

const ResetPassword = () => {
  // Save new password
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');    // Save confirmation password
  const [errorMsg, setErrorMsg] = useState('');   // Save error message 
  const [successMsg, setSuccessMsg] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const navigate = useNavigate();

    // Function to handle when the user submits the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      // Check if the new password and confirm password do not match
    if (newPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please try again.');
      return;
    }

      // Call API to update new password
    console.log('Updating password to:', newPassword);
    setSuccessMsg('Password has been successfully updated!');     // Display success message
    setTimeout(() => navigate('/'), 2000);     //Redirect to main page after 2 seconds

  };

  return (
    
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif'}}>

{/* Navigation Bar */}
<NavBar/>

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

<h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', marginTop: '40px'}}>Reset Password</h2>
<form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
<div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>New Password:</label>

   {/* for the user to enter the new password */}
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
    


 {/* let the user enter the new password one more time to confirm the new password */}
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
              name="confirmNewpassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              id="confirmPassword"
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
                 <FooterCard/>

    </div>
  );
};

export default ResetPassword;

