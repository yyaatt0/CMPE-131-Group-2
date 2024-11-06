import React, { useState } from 'react';
import { LockIcon, UserIcon } from 'lucide-react';
import FooterCard from '../components/FooterCard';
import NavBar from '../components/NavBar';
// import { useAsyncError, useFetcher } from 'react-router-dom';

const AtmLogin = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // Using this for the button animation 
  const actions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [isActionBtnActive, setActionBtnActive] = useState<number | null>(null);
  const [isActionBtnHover, setActionBtnHover] = useState<number | null>(null);

  // Using this for zero button animation on the numpad
  const[zeroBtnHover, setZeroBtnHover] = useState(false);
  const[zeroBtnActive, setZeroBtnActive] = useState(false);

  // Using this for submit button animation on the screen
  const[submitBtnHover, setSubmitBtnHover] = useState(false);
  const[submitBtnActive, setSubmitBtnActive] = useState(false);

  // Limits the password to 4 characters long
  const handleNumpadClick = (num: string) => {
    if (password.length < 4) {
      setPassword((prev) => prev + num);
    }
  };

  // Checks if there is at least a password length of 4 and a username 
  // inputted then welcomes, other than that, then we will print out an
  // error
  // Wait for backend to deal with this
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password.length === 4) {
      setMessage(`Welcome, ${username}!`);
    } else {
      setMessage('Invalid username or password.');
    }
  };


  return (
    // The div below describes the basic body style
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif'}}>

      {/* Header style */}
      <header style={{ backgroundColor: '#003459', color: 'white', padding: '24px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Bank of Banks ATM</h1>
        <p style={{ fontSize: '1.125rem', marginTop: '8px' }}>Welcome to your secure banking experience</p>
      </header>

      {/* Navigation Bar */}
      <NavBar/>

      {/* The main below is describing the large center gray background portion */}
      <main style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px', backgroundColor: '#e5e7eb' }}>
        
        {/* This div is for aesthetic and makes a black border, imitating a screen */}
        <div style={{ backgroundColor: 'black', borderRadius: '32px', padding: '16px', margin: '10px', width: '100%', maxWidth: '800px' }}>
          
          {/* This div acts as another border to have the screen look like it has edges; its the light gray blue color mix */}
          <div style={{ backgroundColor: '#1f2937', borderRadius: '16px', padding: '32px', maxWidth: '768px' }}>
            
            {/* This div is a white screen thingy that holds the content of what the screen 'displays' */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: 'inset 0 6px 8px rgba(0, 0, 0, 0.3)', padding: '24px' }}>
              
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '50px' }}>Enter Your Credentials</h2>
              
              {/* This form box will hold the textbox to enter the credentials, number grid, and submit button */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {message && (
                  <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#ed4337' }}>{message}</p>
                )}

                {/* This div holds the two textboxes: username and password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  {/* This div is describing the username textbox */}
                  <div style={{ position: 'relative', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <UserIcon style={{ position: 'absolute', right: '89%', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ 
                        paddingLeft: '40px', 
                        paddingRight: '12px', 
                        paddingTop: '10px', 
                        paddingBottom: '10px', 
                        fontSize: '18px', 
                        border: '2px solid #d1d5db', 
                        borderRadius: '8px', 
                        height: '25px', 
                        width: '80%', 
                        backgroundColor: 'white',
                        color: 'black',
                      }}/>
                  </div>

                  {/* This div is describing the password textbox */}
                  <div style={{ position: 'relative', marginBottom: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <LockIcon style={{ position: 'absolute', right: '89%', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input
                      type="password"
                      placeholder="Pin"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                      maxLength={4}
                      style={{ 
                        paddingLeft: '40px', 
                        paddingRight: '12px', 
                        paddingTop: '10px', 
                        paddingBottom: '10px', 
                        fontSize: '18px', 
                        border: '2px solid #d1d5db', 
                        borderRadius: '8px', 
                        height: '25px', 
                        width: '80%',
                        backgroundColor: 'white', 
                        color: 'black',
                      }}/>
                  </div>
                </div>

                {/* This div will hold the numpad portion of the screen */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  
                  {/* Numpad from 1-9 */}
                  {actions.map((num) => (
                    <button
                      key={num}

                      onMouseEnter={() => setActionBtnHover(num)}
                      onMouseLeave={() => setActionBtnHover(null)}
                      onMouseDown={() => setActionBtnActive(num)}
                      onMouseUp={() => setActionBtnActive(null)}

                      type="button"
                      onClick={() => handleNumpadClick(num.toString())}
                      style={{ 
                        padding: '16px', 
                        fontSize: '1.25rem', 
                        backgroundColor: isActionBtnHover === num ? '#cbd5e1' : '#d1d5db', 
                        color: 'black',
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer', 
                        transition: isActionBtnHover === num ? 'background-color 0.5s, transform 0.4s ease' : 'background-color 0.5s',
                        transform: isActionBtnActive === num ? 'scale(0.95)' : 'scale(1)'
                      }}
                    >
                      {num}
                    </button>
                  ))}

                  {/* 0 Button */}
                  <button
                    type="button"

                    onMouseEnter={() => setZeroBtnHover(true)}
                    onMouseLeave={() => setZeroBtnHover(false)}
                    onMouseDown={() => setZeroBtnActive(true)}
                    onMouseUp={() => setZeroBtnActive(false)}

                    onClick={() => handleNumpadClick('0')}
                    style={{ 
                      padding: '16px', 
                      fontSize: '1.25rem', 
                      backgroundColor: zeroBtnHover ? '#cbd5e1' : '#d1d5db', 
                      color: 'black',
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      transition: zeroBtnHover  ? 'background-color 0.5s, transform 0.4s ease' : 'background-color 0.5s',
                      transform: zeroBtnActive  ? 'scale(0.95)' : 'scale(1)',
                      gridColumn: 'span 3' 
                  }}
                  >
                    0
                  </button>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"

                    onMouseEnter={() => setSubmitBtnHover(true)}
                    onMouseLeave={() => setSubmitBtnHover(false)}
                    onMouseDown={() => setSubmitBtnActive(true)}
                    onMouseUp={() => setSubmitBtnActive(false)}

                  style={{ 
                    width: '100%', 
                    padding: '12px',
                    backgroundColor: submitBtnHover ? '#00171F' : '#003459', 
                    color: 'white', 
                    fontSize: '16px', 
                    fontWeight: 'bold', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer', 
                    transition: 'background-color 0.3s, transform 0.4s ease',
                    transform: submitBtnActive  ? 'scale(0.95)' : 'scale(1)', 
                }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* The copyright stuff down below */}
      <FooterCard/>
    </div>
  );
}

export default AtmLogin;