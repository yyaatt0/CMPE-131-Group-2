import './Homepage.css'
import '../styles.css'

import images from '../images'
import { savings_desc, checkings_desc } from '../textdescriptions'

import { useState } from "react";
import { user, account } from '../types';

import WideImage from "../components/WideImage";
import FooterCard from "../components/FooterCard";
import NavBar from "../components/NavBar";
import ListCard from '../components/ListCard';
import ArrowButton from '../components/ArrowButton';

// Temp hardcoded accounts list
let temp_accounts: account[] = [
    { ID: 0, name: "Personal Checking", balance: 1000 },
    { ID: 1, name: "Personal Savings", balance: 10000 },
    { ID: 2, name: "Business Checking", balance: 93758 },
    { ID: 3, name: "Business Savings", balance: 500782 }
];

// Temp currently logged in user
let currentUser: user = {
  UID: 100524, 
  
  firstName: 'Jerry', 
  lastName: 'Racecardriver', 
  
  phone_primary: '(123)456-7890', 
  email: 'jerrydriver@gmail.com', 
  
  ssn: '123-45-6789', 
  
  accounts: null
}

function Homepage() {

  // Handle account selection
  const handleSelectAccount = () => {
    window.location.href = "/accountpage"; // Redirect to account page
  };

  return (
    <div>

      <NavBar/>

      <WideImage 
        image={images.home_cover}
        text="Bank of Banks"
      />

      <h1 className='section-header'>Accounts</h1>

      {currentUser.accounts && 

        <div className="account-list">
        {currentUser.accounts.map((acc) => (
            <ListCard key={acc.ID} onClick={handleSelectAccount}>
              <h3> {acc.name}: </h3>
              <label className='list-content'> {acc.balance} </label>
            </ListCard>
        ))}
      </div>

      }

      {!currentUser.accounts &&
        
        <div className="no-accounts">
          <div className="acc-desc">
            <h2 
              style={{
                fontSize: '40px', 
                marginBottom: '0'
              }}
            >
              Savings
            </h2>
            <p style={{fontSize: '20px'}}>{savings_desc}</p>
            <ArrowButton 
              path="/userlogin" 
              text="Create Account"
              color="rgb(57, 184, 74)"
              hColor="rgb(81, 226, 101)"
            />
          </div>
          <div className="acc-desc">
            <h2 
              style={{
                fontSize: '40px', 
                marginBottom: '0'
              }}
            >
              Checking
            </h2>
            <p style={{fontSize: '20px'}}>{checkings_desc}</p>
            <ArrowButton 
              path="/userlogin" 
              text="Create Account"
              color="rgb(57, 184, 74)"
              hColor="rgb(81, 226, 101)"
            />
          </div>
        </div>

      }

      <WideImage
        image={images.home_signing}
      />

      <FooterCard />
    </div>
  );
}

export default Homepage;
