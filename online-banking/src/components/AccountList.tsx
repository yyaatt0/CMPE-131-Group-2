import AccountCard from "./AccountCard";
import NoAccounts from "./NoAccounts";
import "../pages/Homepage.css"

type account = {id: number, name: string, balance: number};

interface AccountListProps {
  accounts: account[]; // List of accounts
  heading: string; // Account List Heading
  onSelectItem: () => void; // onClick Function to pass to AccountCard
}

function AccountList({accounts, heading, onSelectItem}: AccountListProps) {

  return (
    <>
      <h1 className="section-header">{heading}</h1>
      <div className="account-list">
        {accounts.length === 0 && <NoAccounts/>} {/*Display if no accounts have been created.*/}
        {accounts.map((acc) => (
            <AccountCard
                key={acc.id} 
                name={acc.name}
                balance={acc.balance}
                onClick={() => {
                  onSelectItem();
                }}
            />
        ))}
      </div>
    </>
  );
}


export default AccountList;
