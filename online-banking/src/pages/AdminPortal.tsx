import { useState } from 'react';
import '../styles.css';
import './AdminPortal.css';

// Temp vars
var username: string;
var password: string;

// Temp registered user list
type user = {id: number, firstName: string, lastName: string}
let users: user[] = []
for(var i = 0; i < 20; i++){
    users.push(
        {id: i, firstName: `John`, lastName: `Doe ${i}`}
    )
}


function AdminPortal() {

    const [activeTab, setActiveTab] = useState(0);

    const maxListItems = 5;
    const [listStartIndex, setListStartIndex] = useState(10);
    const displayedList = users.slice(listStartIndex, listStartIndex + maxListItems);

    return(
        <>
            <header>Admin Portal</header>
            <h1>Welcome! [Admin Name]</h1>
            <span>
                <button
                    onClick={() => {
                        setActiveTab(0);
                        setListStartIndex(0);
                    }}
                >
                    View User Database
                </button>
                <button 
                    onClick={() => {
                        setActiveTab(1);
                        setListStartIndex(0);
                    }}
                >
                    Add new admin
                </button>

            </span>

            {(() => {
                switch(activeTab){

                    case 1:
                        return(
                            <form>
                                <div>
                                    <label>Username: </label>
                                    <input type="text" value={username}/>
                                </div>
                                <div>
                                    <label>Password: </label>
                                    <input type="password" value={password}/>
                                </div>
                            </form>
                        )
                    
                    default:
                        return(
                            <div>
                                <ol>
                                    {displayedList.map((user) => (
                                        <li key={user.id}>
                                            ID: {user.id} | Name: {user.firstName} {user.lastName}
                                        </li>
                                    ))}
                                </ol>
                                <span>
                                    {users.filter((_, index) => index % maxListItems === 0).map((item, index) => (
                                        <button 
                                            key={index}
                                            onClick={() =>
                                                setListStartIndex(index * maxListItems)
                                            }
                                        >
                                            {index}
                                        </button>
                                    ))}
                                </span>
                            </div>
                        );
                }
            })()}
            
        </>
    );
}

export default AdminPortal;