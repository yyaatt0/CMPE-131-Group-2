import {CircleDollarSign} from 'lucide-react';

import '../styles.css';

import ArrowButton from "./ArrowButton";
import CircleFrame from "./CircleFrame";

/* ===== New Account Info Section ===== */
interface AccInfoProps {
  heading: string;
  text: string;
  direction: string;
}

/* 
  Blue card on homepage that displays info about different account types.
  Also contains button that redirects to account creation page if logged in
  or to login page if not logged in. 
*/

function AccountInfoCard({heading, text}: AccInfoProps) {
  return (
      <div className="acc-desc">
          <h2 
            style={{
              fontSize: '40px', 
              marginBottom: '0'
            }}
          >
            {heading}
          </h2>
          <p style={{fontSize: '20px'}}>{text}</p>
          <ArrowButton 
            path="/userlogin" 
            text="Create Account"
            color="rgb(57, 184, 74)"
            hColor="rgb(81, 226, 101)"
          />
      </div>
  );
}

/*
  Section containing account info cards and images/icons beside them.
*/

function AccountInfoSection({heading, text, direction}: AccInfoProps) {

  if (direction === "right"){
      return (
          <div className="no-accounts">
              <AccountInfoCard heading={heading} text={text} direction=""/>
              <div className="desc-img">[Image Placeholder]</div>
          </div>
      );
  }
  
  return (
      <div className="no-accounts">
          <div className="desc-img">
            <CircleFrame size="100px" vOffset='5' color="red">
              <CircleDollarSign className="circle-content"/>
            </CircleFrame>
            <CircleFrame size="300px" color="blue">
              <CircleDollarSign className="circle-content"/>
            </CircleFrame>
            <CircleFrame size="150px" hOffset='12' vOffset='150' color="green">
              <CircleDollarSign className="circle-content"/>
            </CircleFrame>
          </div>
          <AccountInfoCard heading={heading} text={text} direction=""/>
      </div>
  );
}

/* ===== No accounts available to display ===== */

// Placeholder text for account info cards
let tempText = 
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. " +
  "This is placeholder text. Fill in later with information on the account listed above. ";

/*
  Section containing all account info sections.
*/

function NoAccounts() {
  return (
      <>
      <AccountInfoSection heading="Checking" text={tempText} direction="right"/>
      <AccountInfoSection heading="Savings" text={tempText} direction="left"/>
      </>
  );
}

/* ===== AccountCard ===== */

interface AccountCardProps {
  name: string;   // Account name
  balance: number; // Account balance
  onClick: (item: string) => void; // onClick function
}

/*
  Card that displays account name and balance. Redirects to account page when clicked.
*/

function AccountCard({name, balance, onClick}: AccountCardProps) {

  return (
      <div className="account-card" onClick={() => onClick(name)}>
          <div className="card-text">
              {name && <h3>{name}</h3>}
              {!name && <h3>Account</h3>} {/*Default name*/}
              {balance && <p>${balance}</p>}
              {!balance && <p>$0.00</p>}  {/*Default balance*/}
          </div>
      </div>
  );
}

/* ===== Account List ===== */

type account = {id: number, name: string, balance: number};

interface AccountListProps {
  accounts: account[]; // List of accounts
  onSelectAccount: () => void; // onClick Function to pass to AccountCard
}

/*
  Section containing all account cards on record that will display when logged in.
*/

function AccountList({accounts, onSelectAccount}: AccountListProps) {

  return (
    <>
      <div className="account-list">
        {accounts.length === 0 && <NoAccounts/>} {/*Display if no accounts have been created.*/}
        {accounts.map((acc) => (
            <AccountCard
                key={acc.id} 
                name={acc.name}
                balance={acc.balance}
                onClick={() => {
                  onSelectAccount();
                }}
            />
        ))}
      </div>
    </>
  );
}

export default AccountList;