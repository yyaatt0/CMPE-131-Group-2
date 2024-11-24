import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FooterCard from '../components/FooterCard';
import NavBar from '../components/NavBar';

/* const ForgotPassword = () => {
  //useState to manage the state of emails and error messages
  //Initialize state for email, default value is empty string
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); //Initialize state for error message
  const navigate = useNavigate();

    //Function to handle when the user submits the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Call API to send confirmation code via email
      console.log('Sending verification code to:', email);
     //Navigate to the code confirmation page
      navigate('/verifyCode');
    } else {
      setErrorMsg('Please enter your email address!'); // If the email is empty, display an error message 

    }
  }; */

 const ForgotPassword = () => {
    const [email, setEmail] = useState(''); // State to store email
    const [errorMsg, setErrorMsg] = useState(''); // State for error message
    const [loading, setLoading] = useState(false); // State to handle loading state
    const navigate = useNavigate(); // Hook for navigation
  
    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
// Check email format (regex to check valid email)
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email || !emailRegex.test(email)) {
        setErrorMsg('Please enter a valid email address!');
        return;
      }
  
      setLoading(true); // Start loading
      setErrorMsg(''); // Clear previous errors
  
      try {
// Send request to back-end to send confirmation code via email
        const response = await axios.post('https://backend-api.com/api/auth/forgot-password', { email });
  
        if (response.data.success) {
// If code sent successfully, go to code verification page
          console.log('Verification code sent to:', email);
          navigate('/VerifyCode');
        } else {
          
          setErrorMsg('Failed to send verification code. Please try again later.');
        }
      } catch (error) {
// Handle errors if there is a problem while sending the request
        console.error('Error during sending verification code:', error);
        setErrorMsg('An error occurred. Please try again.');
      } finally {
        setLoading(false); // stop loading
      }
    };

  return (
 /*    <div style={{fontFamily: 'Arial, sans-serif', margin: 0 }}>
    <header>
      <nav style={{
                  backgroundColor: '#003459',
                  padding: '30px',
                  color: 'white',
                  textAlign: 'center'
              }}>
        <h1 style={{fontWeight: 'bold', fontSize: '30px'}}>Bank of Banks</h1>
      </nav>
    </header> */
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
            <FooterCard/>
    </div>
  );
};

export default ForgotPassword;

