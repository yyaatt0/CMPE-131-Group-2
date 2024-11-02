import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { Link } from 'react-router-dom'; 

const Registration = () => {
    const [LastName, setLastName] = useState<string>('');
    const [FirstName, setFirstName] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPw] = useState<string>('');
    const [ConfirmPassword, setConfirmPw] = useState<string>('');
    const [errorMssg, setErrorMssg] = useState<string>('');
    const [successMssg, setSuccessMssg] = useState<string>('');

    const validCharacters = /^[A-Za-z0-9!-\*]+$/;

    const submission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validCharacters.test(Username) || !validCharacters.test(Password)) {
            setErrorMssg('Invalid characters. Only A-Z, a-z, 0-9, and !-* are allowed.');
            setSuccessMssg('');
            return;
        }

        if (Password !== ConfirmPassword) {
            setErrorMssg('Password and Confirm Password do not match.');
            setSuccessMssg('');
            return;
        }

        try {
            const emailCheckResponse = await axios.get(`http://localhost:3001`);
            
            if (emailCheckResponse.data.exists) {
                setErrorMssg('Email is already registered.');
                setSuccessMssg('');
                return;
            }

            await axios.post('http://localhost:3000', {
                LastName,
                FirstName,
                Username,
                Email,
                Password,
            });

            setSuccessMssg('Registration successful!'); 
            setErrorMssg('');
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
                    <input
                        type="text"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required />
                </div>

                <div>
                    <label> First Name:</label>
                    <input
                        type="text"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required />
                </div>

                <div>
                    <label> Username:</label>
                    <input
                        type="text"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
         
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={Password}
                        onChange={(e) => setPw(e.target.value)}
                        required />
                </div>
                
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        required />
                </div>


                <div className="button" onClick={() => console.log('Button clicked!')}>
                    Submit
</div>

                {errorMssg && <p style={{ color: 'red' }}>{errorMssg}</p>}
                {successMssg && <p style={{ color: 'green' }}>{successMssg}</p>}
            </form>

            {/* Cancel Link */}
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
        

            {/* Save Link */}
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
