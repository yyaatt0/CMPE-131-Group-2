import "./AccountList.css" // temp styling [*move all styling to single css later]

interface AccountCardProps {
    name: string;   // Account name
    balance: number; // Account balance
    onClick: (item: string) => void; // onClick function
}

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

export default AccountCard;