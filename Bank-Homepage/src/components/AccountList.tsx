/*

If account list is empty => Display start page content
Else => Display account lists

*/

import AccountCard from "./AccountCard";
import "./AccountList.css"

interface AccountListProps {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function AccountList({items, heading, onSelectItem}: AccountListProps) {

  return (
    <>
      <h1>{heading}</h1>
      <div className="account-list">
        {items.length === 0 && <p>No existing accounts.</p>}
        {items.map((item) => (
            <AccountCard
                key={item} 
                name={item}
                balance=""
                onClick={() => {
                  onSelectItem(item);
                }}
            />
        ))}
      </div>
    </>
  );
}


export default AccountList;
