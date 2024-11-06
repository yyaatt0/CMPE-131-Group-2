import {House, UserRound, DollarSign} from 'lucide-react'

import '../styles.css'

interface NavTabProps {
    name: string;
    path: string;
}

function NavTab({name, path}: NavTabProps) {
    return (
        <div
            className="nav-tab"
            onClick={() => 
                window.location.href=path
            }
        >
            <div
                style={{
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    transform: 'translate(15%, 5%)'
                }}
            >
                {(() => {
                    switch (name) {
                        case "Home":
                            return <House/>
                        case "ATM":
                            return <DollarSign/>
                        case "Login":
                            return <UserRound/>
                        default:
                            return
                    }
                })()}
            </div>
            <p 
                style={{
                    display: 'table-cell', 
                    verticalAlign: 'middle',
                    width: '100px'
                }}
            >
            {name}
            </p>

        </div>
    );
}

function NavBar() {
    return(
        <nav>
            <NavTab name="Home" path="/homepage"/>
            <NavTab name="ATM" path="/atmlogin"/>
            <NavTab name="Login" path="/userlogin"/>
        </nav>
    );
}

export default NavBar;