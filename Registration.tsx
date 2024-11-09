import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
    const [LastName, setLastName] = useState(''); 
    const [FirstName, setFirstName] = useState('');
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Pin, setPin] = useState('');
    const [ConfirmPin, setConfirmPin] = useState('');
    const [message, setMessage] = useState('');
    const [errorMssg, setErrorMssg] = useState (''); //Error messages
    const [successMssg, setSuccessMssg] = useState (''); //success messages
    const navigate = useNavigate(); 


    // The validateInput function checks the validity of user input data
    const isValidUsernamePassword = (str: string) => {
        const regex = /^[A-Za-z0-9!*\-]+$/; //Only characters from A-Z, a-z, 0-9, and !-* are accepted.
        return regex.test(str);
    };

    const isEmailAlreadyRegistered = async (email: string) => {
        // Call backend to check email
        const response = await axios.post('http://localhost/backend/check-email.php', { email });
        return response.data.isEmailExist;
    };

     //check the password with ConfirmPassword
    const handleRegistration = async () => {
        if (Password !== ConfirmPassword) {
            setMessage('Passwords and ConfirmPassword do not match.');
            return;
        }

        //Check if Username contains invalid characters
        if (!isValidUsernamePassword(Username)) {
            setMessage('Username contains invalid characters.');
            return;
        }

                //Check if password contains invalid characters
        if (!isValidUsernamePassword(Password)) {
            setMessage('Password contains invalid characters.');
            return;
        }

        //check if the email already exists
        const isEmailExist = await isEmailAlreadyRegistered(Email);
        if (isEmailExist) {
            setMessage('Email is already registered.');
            return;
        }

        // Send new account registration request
        try {
            const response = await axios.post('http://localhost/backend/registration.php', {
                LastName,
                FirstName,
                Username,
                Email,
                Password,
                Pin,
            });

            //If registration is successful
            if (response.data.success) {
                // Redirect to login page after successful registration
            window.location.href = "/UserLogin"; 
                setMessage(response.data.message);
            } else {
                //displays error message if registration fails
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Error registering:', error);
            setMessage('Registration failed.');
        }
        };

 const handleCancel = () => {

    navigate('/Homepage');  // return to homepage
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleRegistration();
};

return (
         <div style={{ fontFamily: 'Arial, sans-serif', margin: 0 }}>
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
            
            <h2 style={{ textAlign: 'center', fontWeight: 'normal', fontSize: '25px', marginTop: '20px' }}>Welcome, apply in just minutes.</h2>
            
            <form onSubmit={handleSubmit} style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px', // Added gap between elements
                maxWidth: '600px',
                margin: '20px auto'
            }}>
                <div
                    style={{
                        margin: 10
                    }}>
                    <label>First Name:</label>

                <input 
                    type="text" 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px' }}
                            
                />
                </div>


                <div
                    style={{
                        margin: 10
                    }}>
                    
                    <label>Last Name:</label>
                <input 
                    type="text" 
                    onChange={(e) => setLastName(e.target.value)} 

                    required
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>
                
                <div style={{ gridColumn: '1 / 3', margin: 10 }}>
                    <label>Username:</label>
                <input 
                    type="text" 
                    onChange={(e) => setUsername(e.target.value)} 

                    required
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>
                

                <div style={{ gridColumn: '1 / 3', margin: 10 }}>
                    <label>Email:</label>
                <input 
                    type="email" 
                    onChange={(e) => setEmail(e.target.value)} 

                    required
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>
                

                <div
                    style={{
                        margin: 10
                    }}> 
            <label>Password:</label>

                <input 
                    type="password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>
                

             <div
                    style={{
                        margin: 10
                    }}>
                    <label>Confirm Password:</label>
                <input 
                    type="password" 
                    onChange={(e) => setConfirmPassword(e.target.value)} 

                    required
                    style={{
                        padding: '10px',
                        backgroundColor: '#D3D3D3',
                        fontSize: '20px',
                        borderRadius: '4px',
                        border: '1px solid #809AAC',
                        width: '100%',
                        marginTop: '5px'
                    }}
                />
            </div>
                


            <div
                    style={{
                        margin: 10
                    }}>
                    <label>PIN:</label>
                <input 
                    type="text" 
                    onChange={(e) => setPin(e.target.value)} 
                    required
                        maxLength={4}
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>


                <div
                    style={{
                        margin: 10
                    }}>
                    <label>Confirm PIN:</label>
                    <input
                        //for the confirmPIN
                        type="text"
                        value={ConfirmPin}
                        onChange={(e) => setConfirmPin(e.target.value)}
                        required
                        maxLength={4}
                        style={{
                            padding: '10px',
                            backgroundColor: '#D3D3D3',
                            fontSize: '20px',
                            borderRadius: '4px',
                            border: '1px solid #809AAC',
                            width: '100%',
                            marginTop: '5px'
                        }}
                    />
                </div>
                
                <div style={{ gridColumn: '1 / 3', textAlign: 'center', marginTop: '20px' }}>
                    <button type="submit" style={{
                        width: '30%',
                        padding: '10px',
                        backgroundColor: '#003459',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }}>
                          {/* This is the "Submit" button. */}
                        Submit
                    </button>
                </div>

                  {/* for the error messages and success messages */}
                {errorMssg && <p style={{ color: 'red', textAlign: 'center', gridColumn: '1 / 3' }}>{errorMssg}</p>}
                {successMssg && <p style={{ color: 'green', textAlign: 'center', gridColumn: '1 / 3' }}>{successMssg}</p>}
            </form>
            <div style={{ textAlign: 'center', margin: '20px auto' }}>

                
<a href="/" onClick={handleCancel} style={{ color: 'blue', textDecoration: 'underline' }}>Cancel
{/* This is the "Cancel" button */}
</a>
<span> | </span>
</div>
</div>
        
    );


}; 

export default Registration;
