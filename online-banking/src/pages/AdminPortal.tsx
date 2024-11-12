import { useState } from 'react';
import '../styles.css';
import './AdminPortal.css';
import ReqTxtInput from '../components/ReqTxtInput';

let userCount = 50;
let employeeCount = 25;

// Temp registered user list
type user = {id: number, firstName: string, lastName: string}
let users: user[] = []
for(var i = 0; i < userCount; i++){
    users.push(
        {id: i, firstName: `John`, lastName: `Doe ${i}`}
    )
}

// Temp employee list
type employee = {info: user, admin: boolean}
let employees: employee[] = [];
for(var i = 0; i < employeeCount; i++){
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

    // List displays
    const [maxListItems, setMaxListItems] = useState(5);
    const [listStartIndex, setListStartIndex] = useState(10);
    const shownUserList = users.slice(listStartIndex, listStartIndex + maxListItems);
    const shownEmployeeList = employees.slice(listStartIndex, listStartIndex + maxListItems);

    // Data value declarations for new employee creation
    const newEmpId = employees.length;
    const [newEmpFirst, setNewEmpFirst] = useState("");
    const [newEmpLast, setNewEmpLast] = useState("");
    const [newEmpPhone, setNewEmpPhone] = useState("");
    const [newEmpEmail, setNewEmpEmail] = useState("");

    // Admin access management
    const [isAdmin, setIsAdmin] = useState(false);
    const handleToggleAdmin = (emp: employee, event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
        console.log("Admin status toggled.");
    }

    return(
        <>
            <h1>Admin Portal</h1>
            <h2>Welcome! [Admin Name]</h2>
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
                    /* Enter new employees into the employee database */
                    case 1:
                        return(
                            <form>
                                <div>
                                    <h3>Name</h3>                                
                                    <ReqTxtInput text="First" setParam={setNewEmpFirst}/>
                                    <ReqTxtInput text="Last" setParam={setNewEmpLast}/>
                                </div>
                                <div>
                                    <h3>Phone</h3>
                                    <ReqTxtInput setParam={setNewEmpPhone}/>
                                    <h3>Email</h3>
                                    <ReqTxtInput setParam={setNewEmpEmail}/>
                                </div>
                            </form>
                        );
                    /* Manage which employees have admin access */
                    case 2:
                        return(
                            <div>
                                <h3>Manage admin access here.</h3>
                                <ol>
                                    {shownEmployeeList.map((emp) => (
                                        <div>
                                            <li key={emp.info.id}>
                                                ID: {emp.info.id} | Name: {emp.info.firstName} {emp.info.lastName}
                                            </li>
                                            <label>Admin? </label>
                                            <input type="checkbox" checked={emp.admin}/>
                                        </div>
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
                    /* Admins can view list of all registered users and lookup their data */
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