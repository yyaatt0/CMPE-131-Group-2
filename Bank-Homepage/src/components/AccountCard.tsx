import "./AccountList.css"

interface AccountCardProps {
    name: string;
    balance: string;
    onClick: (item: string) => void;
}

function AccountCard({name, balance, onClick}: AccountCardProps) {

    return (
        <div className="account-card" onClick={() => onClick(name)}>
            <div className="card-text">
                {name && <h3>{name}</h3>}
                {!name && <h3>Account</h3>}
                {balance && <p>${balance}</p>}
                {!balance && <p>$0.00</p>}
            </div>
        </div>
    );
}

export default AccountCard;