import '../styles.css'

import { useNavigate } from 'react-router-dom';

import {House, UserRound, DollarSign, LogIn, LogOut} from 'lucide-react'
import { useState } from 'react';


function UserBar() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const handleLogInOut = () => {

        /*
        
        Temp code to handle login. Toggles login button between login and logout.
        Functionality needs to be updated to log a user in and out of a session, while
        updating page content.
        
        */

        if(loggedIn)
            setLoggedIn(false);
        else{
            navigate("/userlogin");
            setLoggedIn(true);
        }

    }

    return(
        <nav>
            <div className='nav-tab' onClick={() => navigate('/homepage')}>
                <div style={{display: 'table-cell', verticalAlign: 'middle', transform: 'translate(25%, 5%)'}}>
                    <House/>
                </div>
                <p style={{display: 'table-cell', verticalAlign: 'middle'}}>Home</p>
            </div>
            <div className='nav-tab' onClick={() => navigate('/atmlogin')}>
                <div style={{display: 'table-cell', verticalAlign: 'middle', transform: 'translate(25%, 5%)'}}>
                    <DollarSign/>
                </div>
                <p style={{display: 'table-cell', verticalAlign: 'middle'}}>ATM</p>
            </div>
            {/* >> User Profile page to be added <<
            <div className='nav-tab' onClick={() => navigate('/userprofile')}>
                <div style={{display: 'table-cell', verticalAlign: 'middle', transform: 'translate(25%, 5%)'}}>
                    <UserRound/>
                </div>
                <p style={{display: 'table-cell', verticalAlign: 'middle'}}>Profile</p>
            </div>
            */}
            
        </nav>
    );
}

export default UserBar;

export default UserBar;
