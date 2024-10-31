import AccountCard from "./AccountCard";
import "./AccountList.css" // Temp styling [*Move all styling to single css later]
import NoAccounts from "./NoAccounts";

type account = {id: number, name: string, balance: number};

interface AccountListProps {
  accounts: account[]; // List of accounts
  heading: string; // Account List Heading
  onSelectItem: () => void; // onClick Function to pass to AccountCard
}

function AccountList({accounts, heading, onSelectItem}: AccountListProps) {

  return (
    <>
      <h1>{heading}</h1>
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
