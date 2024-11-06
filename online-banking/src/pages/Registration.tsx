import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [LastName, setLastName] = useState<string>('');
    const [FirstName, setFirstName] = useState<string>('');
    const [Username, setUsername] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPw] = useState<string>('');
    const [ConfirmPassword, setConfirmPw] = useState<string>('');
    const [Pin, setPin] = useState<string>('');
    const [ConfirmPin, setConfirmPin] = useState<string>('');
    const [errorMssg, setErrorMssg] = useState<string>('');
    const [successMssg, setSuccessMssg] = useState<string>('');
    const navigate = useNavigate(); 

    const validateInput = () => {
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email)) {
            setErrorMssg('Invalid email format.');
            return false;
        }

        const validChars = /^[A-Za-z0-9!*]*$/;
        if (!validChars.test(Username) || !validChars.test(Password)) {
            setErrorMssg('Username and password must contain only A-Z, a-z, 0-9, or !-* characters.');
            return false;
        }

        if (Password !== ConfirmPassword) {
            setErrorMssg('Password and Confirm Password do not match.');
            return false;
        }

        if (Pin !== ConfirmPin) {
            setErrorMssg('PIN and Confirm PIN do not match.');
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
                Pin,
            });

            setSuccessMssg('Congratulations! Registration successful!'); 
            setErrorMssg('');
            
            navigate('/Homepage'); 
        } catch (error) { 
            setErrorMssg('Registration failed. Please try again.');
            setSuccessMssg('');
        }
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

            <form onSubmit={submission} style={{
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
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
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
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={LastName}
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
                        value={Username}
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
                        value={Email}
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
                        value={Password}
                        onChange={(e) => setPw(e.target.value)}
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
                        value={ConfirmPassword}
                        onChange={(e) => setConfirmPw(e.target.value)}
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
                        type="password"
                        value={Pin}
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
                        type="password"
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
                        Submit
                    </button>
                </div>

                {errorMssg && <p style={{ color: 'red', textAlign: 'center', gridColumn: '1 / 3' }}>{errorMssg}</p>}
                {successMssg && <p style={{ color: 'green', textAlign: 'center', gridColumn: '1 / 3' }}>{successMssg}</p>}
            </form>

            <div style={{ textAlign: 'center', margin: '20px auto' }}>
                <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Cancel</a>
                <span> | </span>
                <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Save</a>
            </div>
        </div>
    );
};

export default Registration;








// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Registration.css';

// const Registration = () => {
//     const [LastName, setLastName] = useState<string>('');
//     const [FirstName, setFirstName] = useState<string>('');
//     const [Username, setUsername] = useState<string>('');
//     const [Email, setEmail] = useState<string>('');
//     const [Password, setPw] = useState<string>('');
//     const [ConfirmPassword, setConfirmPw] = useState<string>('');
//     const [errorMssg, setErrorMssg] = useState<string>('');
//     const [successMssg, setSuccessMssg] = useState<string>('');
//     const navigate = useNavigate(); 

//     const validateInput = () => {
//         // test email
//         if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(Email)) {
//             setErrorMssg('Invalid email format.');
//             return false;
//         }

//         // test username/password
//         const validChars = /^[A-Za-z0-9!*]*$/;
//         if (!validChars.test(Username) || !validChars.test(Password)) {
//             setErrorMssg('Username and password must contain only A-Z, a-z, 0-9, or !-* characters.');
//             return false;
//         }

//         if (Password !== ConfirmPassword) {
//             setErrorMssg('Password and Confirm Password do not match.');
//             return false;
//         }

//         return true;
//     };

//     const submission = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         if (!validateInput()) {
//             return; 
//         }

//         try {
//             const emailCheckResponse = await axios.get(`http://localhost:3000}`);
            
//             if (emailCheckResponse.data.exists) {
//                 setErrorMssg('Email is already registered!');
//                 setSuccessMssg('');
//                 return;
//             }

//             await axios.post('http://localhost:3000/registration', {
//                 LastName,
//                 FirstName,
//                 Username,
//                 Email,
//                 Password,
//             });

//             setSuccessMssg('Congratulation! Registration successful!'); 
//             setErrorMssg('');
            
//             navigate('/Homepage'); 
//         } catch (error) { 
//             setErrorMssg('Registration failed. Please try again.');
//             setSuccessMssg('');
//         }
//     };

//     return (
//         <div>
//             <title>Registration Page</title>  
//             <header>
//                 <nav className="navbar">
//                     <h1>Bank of Banks</h1>
//                 </nav>
//             </header>
            
//             <h2>Application</h2>
//             <h4>Welcome. Apply in just minutes.</h4>

//             <form onSubmit={submission}>
//                 {/* Form Fields */}
//                 <div>
//                     <label> Last Name:</label>
//                     <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
//                 </div>

//                 <div>
//                     <label> First Name:</label>
//                     <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} required />
//                 </div>

//                 <div>
//                     <label> Username:</label>
//                     <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} required />
//                 </div>

//                 <div>
//                     <label>Email:</label>
//                     <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
//                 </div>
         
//                 <div>
//                     <label>Password:</label>
//                     <input type="password" value={Password} onChange={(e) => setPw(e.target.value)} required />
//                 </div>
                
//                 <div>
//                     <label>Confirm Password:</label>
//                     <input type="password" value={ConfirmPassword} onChange={(e) => setConfirmPw(e.target.value)} required />
//                 </div>

//                 <div className="button" onClick={() => console.log('Button clicked!')}>
//                    Submit
// </div>


//                {errorMssg && <p style={{ color: 'red' }}>{errorMssg}</p>}
//                {successMssg && <p style={{ color: 'green' }}>{successMssg}</p>}
//            </form>


         
//            <a
//    href="/"
//    style={{
//        display: 'block', 
//        textAlign: 'center',
//        margin: '20px auto',
//        color: 'blue',
//        textDecoration: 'underline'
      
//    }}
// >
//    Cancel
// </a>
//                 <a
//    href="/"
//    style={{
//        display: 'block',
//        textAlign: 'center',
//        margin: '20px auto',
//        color: 'blue',
//        textDecoration: 'underline'
      
//    }}
// >
//    Save
// </a>
//         </div>
//     );
// };

// export default Registration;