import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../components/NavBar';

//LOGIN FUNCTION
const UserLogin = () => {
  //USER CREDENTIALS
  const [login, setLogin] = useState({
    username: "",
    pass: "",
  })

  //ERRORS
  const [error, setError] = useState<string | null>(null);   // Store error messages 

  //USING NAVIGATE
  const navigate = useNavigate()

  //FUNCTION TO UPDATE STORED VAR FROM USER INPUT
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setLogin((prev)=>({ ...prev, [e.target.name]: e.target.value }));
  };

    // Function to handle when the user submits the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      
      //AWAIT AXIOS POST REQUEST THEN SEND LOGIN DETAILS, THEN GET RESPONSE AS 'RESPONSE'
      await axios.post("http://localhost:3000/users", login).then((response) => {

        //IF RESPONSE DATA = TRUE, GO TO USER PORTAL; ELSE SET ERROR
        if (response.data) {
          navigate('/homepage');
        } 
        //USER NOT FOUND
        else {
          setError('Invalid username or password');
        }
      })
    }
    catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: ' sans-serif' , flexDirection: 'column', minHeight: '100vh'}}>

      {/* Holds the nav bar and heading  */}
      <header>
        {/* Upper portion of the page, later to include a functional nav bar so we can navigate through multiple pages
        Have this navbar as a component  */}
        <nav style={{
          backgroundColor: '#003459',
          padding: '30px',
          color: 'white',
          textAlign: 'center'
        }}>
          <h1>Bank of Banks</h1>
        </nav>
      </header>

      {/* Navigation Bar */}
      <NavBar/>
      
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
        <h2 style={{ textAlign: 'center', color: '#333' }}>LOGIN</h2>
        <h4 style={{ textAlign: 'center' }}>Sign in to continue</h4>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* This div holds both the username and password input boxes */}
          <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Username:</label>
            <input
              type="text"
              placeholder='username'
              name='username'
              onChange={handleChange}
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
              placeholder='password'
              name='pass'
              onChange={handleChange}
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

        {/* Button going to the forgot password page */}
        <br />
        <div style={{ textAlign: 'center' }}>
          <a href="/ForgotPassword">Forgot Password?</a>
        </div>
      </div>

    </div>
  );
};

export default UserLogin;
