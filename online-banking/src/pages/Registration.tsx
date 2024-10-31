import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
    const [LastName, setLastName] = useState<string>('');
    const [FirstName, setFirstName] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPw] = useState<string>('');
    const [ConfirmPassword, setConfirmPw] = useState<string>('');
    const [id, setID] = useState<string>('');
    const [errorMssg, setErrorMssg] = useState<string>('');
    const [successMssg, setSuccessMssg] = useState<string>('');

    const submission = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000', {
                LastName,
                FirstName, 
                Username,
                Email,
                Password,
                id,
            });

            setSuccessMssg('Registration successful!'); 
            setErrorMssg('');
        } 
        catch (error) { 
            setErrorMssg('Please try again!');
            setSuccessMssg(''); 
        }
    };

    return (
        <div>
            <title>Registration Page</title>  
            <header>
                <nav className="navbar">
                    <h1> Bank of Banks</h1>
                </nav>
            </header>
            
            <h2> Application</h2>
            <h4> Welcome. Apply in just minutes.</h4>

            <form onSubmit={submission}>
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

                <div>
                    <label>ID:</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                        required />
                </div>

                <button type="submit"> Submit</button>
                
            </form>
        </div>
    );
};

export default Registration;