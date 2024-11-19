const Password = () => {
  <>
  </>
}

export default Password;


/* import React, { useState } from 'react';

const Password = () => {
  const [email, setEmail] = useState('');
 const [SuccessMss, setsuccessMss] = useState ('');
 const [newPassword, setnewPassword] = useState('');
 const [confirmnewPassword, setconfirmnewPassword] = useState('');
 const [errorMss, setErrorMss] =useState ('');

// Function to check password validity
 const Vpassword = (password: string): string | null => {
        const minLength = 9;
        if (password.length < minLength) return 'minLength = 9'

        if (!/[A-Z]/.test(password))
         return 'Need at least 1 uppercase';

       if(!~/[a-z]/.test(password))
       return 'Need at least 1 lowercase ';

      if(!/[$%^&|<>!@#*(),.?":{}]/.test(password))
     return 'Need at least 1 special character';

       if(!/\d/.test(password))
        return 'Need at least 1 number';
    
        return null;

 };


 const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

   //check if newPassword = confirmnewPassword
  if (newPassword !== confirmnewPassword) {
    setErrorMss('incorrect password.');
  } else {
    
    setsuccessMss('Password reset successfully.');
  }
   // Check the validity of the new password
  const error = Vpassword(newPassword);
if (error) {
    setErrorMss(error);
    setsuccessMss('');
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
           onChange= {(e) => setnewPassword(e.target.value)}
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
           onChange= {(e) => setconfirmnewPassword(e.target.value)}
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
    {errorMss && <div className="error-message">{errorMss}</div>}

     </form>
     
</div>
</div> 
    


 ); };

export default Password; */
