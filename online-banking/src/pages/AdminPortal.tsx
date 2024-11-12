import { useState } from 'react';
import '../styles.css';
import './AdminPortal.css';

// Temp vars
var username: string;
var password: string;

let userListSize = 50;
let employeeListSize = 25;

// Temp registered user list
type user = {id: number, firstName: string, lastName: string}
let users: user[] = []
for(var i = 0; i < userListSize; i++){
    users.push(
        {id: i, firstName: `John`, lastName: `Doe ${i}`}
    )
}

// Temp employee list
type employee = {info: user, admin: boolean}
let employees: employee[] = [];
for(var i = 0; i < employeeListSize; i++){
    if(i % 3 === 0){
        employees.push(
            {info: {id: i, firstName: 'Jane', lastName: `Doe ${i}`}, admin: true}
        )
    }
    else{
        employees.push(
            {info: {id: i, firstName: 'Jane', lastName: `Doe ${i}`}, admin: false}
        )
    }
}

function AdminPortal() {

    const [activeTab, setActiveTab] = useState(0);

    const maxListItems = 5;
    const [listStartIndex, setListStartIndex] = useState(10);
    const shownUserList = users.slice(listStartIndex, listStartIndex + maxListItems);
    const shownEmployeeList = employees.slice(listStartIndex, listStartIndex + maxListItems);

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
                    Add New Employee
                </button>
                <button
                    onClick={() => {
                        setActiveTab(2);
                        setListStartIndex(0);
                    }}
                >
                    Manage Admin Access
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
                        );
                    
                    case 2:
                        return(
                            <div>
                                <h3>Manage admin access here.</h3>
                                <ol>
                                    {shownEmployeeList.map((emp) => (
                                        <li key={emp.info.id}>
                                            ID: {emp.info.id} | Name: {emp.info.firstName} {emp.info.lastName} |
                                            {emp.admin && " Admin"}
                                        </li>
                                    ))}
                                </ol>
                                <span>
                                    {employees.filter((item, index) => index % maxListItems === 0).map((item, index) => (
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
                    
                    default:
                        return(
                            <div>
                                <ol>
                                    {shownUserList.map((user) => (
                                        <li key={user.id}>
                                            ID: {user.id} | Name: {user.firstName} {user.lastName}
                                        </li>
                                    ))}
                                </ol>
                                <span>
                                    {users.filter((item, index) => index % maxListItems === 0).map((item, index) => (
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