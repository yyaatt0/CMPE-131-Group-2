import './Homepage.css'
import '../styles.css'

import images from '../images'
import { savings_desc, checkings_desc, credit_desc, insurance_desc, business_desc } from '../textdescriptions'

import { useEffect, useState } from "react";
import { user, account } from '../types';

import WideImage from "../components/WideImage";
import FooterCard from "../components/FooterCard";
import NavBar from "../components/NavBar";
import ListCard from '../components/ListCard';
import ArrowButton from '../components/ArrowButton';
import { useNavigate } from 'react-router-dom';
import ScrollBox from '../components/ScrollBox';
import InfoCardSmall from '../components/InfoCardSmall';

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

  const navigate = useNavigate();

  // Handle account selection
  const handleSelectAccount = () => {
    navigate('/accountpage'); // Redirect to account page
  };

  const handleCreateAccount = () => {
    if(currentUser){
      console.log("Redirect to account creation page.")
    }
    else
      navigate('/userlogin');
  }

  return (
    <div>

      <NavBar/>

      <WideImage src={images.home_cover}>
        <header className='wide-image-text'>Bank of Banks</header>
      </WideImage>

      <h1 className='section-header'>Accounts</h1>

        {currentUser.accounts &&

          <div className='account-list-section'>
            <ScrollBox className='account-list'>
              {currentUser.accounts.map((acc) => (
                  <ListCard key={acc.ID} onClick={handleSelectAccount} className='account-card'>
                    <h3> {acc.name}: </h3>
                    <p> ${acc.balance} </p>
                  </ListCard>
              ))}
            </ScrollBox>
            <ArrowButton className='account-list-button' onClick={handleCreateAccount}>Open Account</ArrowButton>
          </div>

        }
        {!currentUser.accounts &&
        
          <div className='account-info-section'>
            <div className="account-description">
              <div className='text-area'>
                <h2>Savings</h2>
                <p>{savings_desc}</p>
                <ArrowButton className='green-button' onClick={handleCreateAccount}>Open Account</ArrowButton>
              </div>
              <div className='image-area'>
                <img src={images.saving}/>
              </div>
            </div>
            <div className="account-description">
              <div className='image-area'>
                <img src={images.checking}/>
              </div>
              <div className='text-area'>
                <h2>Checking</h2>
                <p>{checkings_desc}</p>
                <ArrowButton className='green-button' onClick={handleCreateAccount}>Open Account</ArrowButton>
              </div>
            </div>
          </div>
        
        }

      <div className='offers-section'>
          <InfoCardSmall heading='Platinum Rewards'>
            <p>{credit_desc}</p>
          </InfoCardSmall>
          <InfoCardSmall heading='Insurance' className='blue-1'>
            <p>{insurance_desc}</p>
          </InfoCardSmall>
          <InfoCardSmall heading='Business Accounts' className='blue-2'>
            <p>{business_desc}</p>
          </InfoCardSmall>
      </div>

      <h1 className='section-header'></h1>
      <WideImage src={images.home_signing}/>

      <FooterCard />
    </div>
  );
}

export default Homepage;
