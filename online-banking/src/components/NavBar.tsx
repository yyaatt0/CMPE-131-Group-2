import '../pages/styles.css'

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
            <p 
                style={{
                    display: 'table-cell', 
                    verticalAlign: 'middle'
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