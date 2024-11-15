import React, { useState } from 'react';

const Password = () => {
  const [email, setEmail] = useState('');
 const [SuccessMsg, setSuccessMsg] = useState ('');
 const [newPassword, setNewPassword] = useState('');
 const [confirmnewPassword, setConfirmnewPassword] = useState('');
 const [errorMsg, setErrorMsg] =useState ('');

//Function to check password strength
 const validPassword = (password: string): string | null => {
    const minLength = 9;
    const UpperCase = /[A-Z]/.test(password);
    const LowerCase = /[a-z]/.test(password);
    const SpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const Number = /\d/.test(password);

    if (password.length < minLength) return 'minLength = 9'
    if (!UpperCase) return 'Need at least 1 uppercase';
    if (!LowerCase) return 'Need at least 1 lowecase ';
    if (!SpecialChar) return 'Need at least 1 special character';
    if (!Number) return 'Need at least 1 number';
    return null;
  
 const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

   //check if newPassword = confirmnewPassword
  if (newPassword !== confirmnewPassword) {
    setErrorMsg('incorrect password.');
  } else {
    
    setSuccessMsg('Password reset successfully.');
  }

    const error = validPassword(newPassword);
if (error) {
    setErrorMsg(error);
    setSuccessMsg('');
    return;
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

     <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '25px', marginTop: '40px'}}> Reset Account Password</h2>
     <form onSubmit= {handleResetPassword}style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

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
           type= "email"
           name= "email"
           value= {email}
           onChange={(e) => setEmail(e.target.value)}
           id= "email"
           required
         />
       </div>

      
       <div style={{ width: '100%' }}>
            <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Password:</label>
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
           type= "password"
           name= "password"
           value= {newPassword}
           onChange= {(e) => setNewPassword(e.target.value)}
           id= "newpassword"
           required
         />
       </div>

       <div style={{ width: '100%' }}>
       <label style={{ display: 'block', marginBottom: '5px' , fontWeight: 'bold'}}>Confirm Password:</label>
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
           type= "confirmpassword"
           name= "confirmpassword"
           value= {confirmnewPassword}
           onChange= {(e) => setConfirmnewPassword(e.target.value)}
           id= "confirmPassword"
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
    <br></br>
    {errorMsg && <div className="error-message">{errorMsg}</div>}

     </form>
     
</div>
</div>
    


 ); };

export default Password;
