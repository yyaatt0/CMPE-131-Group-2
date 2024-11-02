import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Registration = () => {
    const [LastName, setLastName] = useState<string>('');
    const [FirstName, setFirstName] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPw] = useState<string>('');
    const [ConfirmPassword, setConfirmPw] = useState<string>('');
    const [errorMssg, setErrorMssg] = useState<string>('');
    const [successMssg, setSuccessMssg] = useState<string>('');
    const navigate = useNavigate(); 

    const validateInput = () => {
        // test email
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email)) {
            setErrorMssg('Invalid email format.');
            return false;
        }

        // test username/password
        const validChars = /^[A-Za-z0-9!*]*$/;
        if (!validChars.test(Username) || !validChars.test(Password)) {
            setErrorMssg('Username and password must contain only A-Z, a-z, 0-9, or !-* characters.');
            return false;
        }

        if (Password !== ConfirmPassword) {
            setErrorMssg('Password and Confirm Password do not match.');
            return false;
        }

        return true;
    };

    const submission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateInput()) {
            return; 
        }

        try {
            const emailCheckResponse = await axios.get(`http://localhost:3000}`);
            
            if (emailCheckResponse.data.exists) {
                setErrorMssg('Email is already registered!');
                setSuccessMssg('');
                return;
            }

            await axios.post('http://localhost:3000/registration', {
                LastName,
                FirstName,
                Username,
                Email,
                Password,
            });

            setSuccessMssg('Congratulation! Registration successful!'); 
            setErrorMssg('');
            
            navigate('/Homepage'); 
        } catch (error) { 
            setErrorMssg('Registration failed. Please try again.');
            setSuccessMssg('');
        }
    };

    return (
        <div>
            <title>Registration Page</title>  
            <header>
                <nav className="navbar">
                    <h1>Bank of Banks</h1>
                </nav>
            </header>
            
            <h2>Application</h2>
            <h4>Welcome. Apply in just minutes.</h4>

            <form onSubmit={submission}>
                {/* Form Fields */}
                <div>
                    <label> Last Name:</label>
                    <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>

                <div>
                    <label> First Name:</label>
                    <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>

                <div>
                    <label> Username:</label>
                    <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} required />
                </div>

                <div>
                    <label>Email:</label>
                    <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
         
                <div>
                    <label>Password:</label>
                    <input type="password" value={Password} onChange={(e) => setPw(e.target.value)} required />
                </div>
                
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={ConfirmPassword} onChange={(e) => setConfirmPw(e.target.value)} required />
                </div>

                <div className="button" onClick={() => console.log('Button clicked!')}>
                   Submit
</div>


               {errorMssg && <p style={{ color: 'red' }}>{errorMssg}</p>}
               {successMssg && <p style={{ color: 'green' }}>{successMssg}</p>}
           </form>


         
           <a
   href="/"
   style={{
       display: 'block', 
       textAlign: 'center',
       margin: '20px auto',
       color: 'blue',
       textDecoration: 'underline'
      
   }}
>
   Cancel
</a>
                <a
   href="/"
   style={{
       display: 'block',
       textAlign: 'center',
       margin: '20px auto',
       color: 'blue',
       textDecoration: 'underline'
      
   }}
>
   Save
</a>
        </div>
    );
};

export default Registration;
