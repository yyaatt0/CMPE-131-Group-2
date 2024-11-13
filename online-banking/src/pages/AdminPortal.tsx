import { useState } from 'react';
import '../styles.css';
import './AdminPortal.css';
import ReqTextInput from '../components/ReqTextInput';
import TextInput from '../components/TextInput';

// Basic user type definition. Will add more fields later (contact info, ssn, etc.)
type user = {id: number, firstName: string, lastName: string}

// Temp registered user list
let userCount = 50;
let users: user[] = []
for(var i = 0; i < userCount; i++){
    users.push(
        {id: i, firstName: `John`, lastName: `Doe ${i}`}
    )
}

// Basic employee type definition.
type employee = {info: user, admin: boolean}

// Temp employee list
let employeeCount = 25;
let employees: employee[] = [];
for(var i = 0; i < employeeCount; i++){
    if(i % 3 === 0){    // Give every third employee admin access as a temp demonstration
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

    // Used to navigate between admin tabs
    const [activeTab, setActiveTab] = useState(0);

    // Used to display both user and employee lists
    const [maxListItems, setMaxListItems] = useState(5);
    const [listStartIndex, setListStartIndex] = useState(10);
    const shownUserList = users.slice(listStartIndex, listStartIndex + maxListItems);   // Only show [maxListItems] number of users per page
    const shownEmployeeList = employees.slice(listStartIndex, listStartIndex + maxListItems); // Only show [maxListItems] number of employees per page

    /*

    Need to add new user verification & new bank account verification
    
    */

    // Data value declarations for new employee creation
    const newEmpId = employees.length;
    const [newEmpFirst, setNewEmpFirst] = useState("");
    const [newEmpLast, setNewEmpLast] = useState("");
    const [newEmpCPhone, setNewEmpCPhone] = useState("");
    const [newEmpHPhone, setNewEmpHPhone] = useState("");
    const [newEmpEmail, setNewEmpEmail] = useState("");
    const [newEmpBdate, setNewEmpBdate] = useState("");
    const [newEmpSSN, setNewEmpSSN] = useState("");

    // Admin access management
    const [isAdmin, setIsAdmin] = useState(false);
    const handleToggleAdmin = (emp: employee, event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
        console.log("Admin status toggled.");
    }

    return(
        <>
            <h1 className='section-header'>Admin Portal | Welcome, (Admin)</h1> {/* Will need to get name of current admin */}
            <div className='admin-nav'>  {/* Admin navigation tabs | 0: User database, 1: Add new employwee, 2: Manage Admin Access*/}
                <button
                    onClick={() => {
                        setActiveTab(0);
                        setListStartIndex(0); // Reset list to page 0 when refreshing or switching tabs.
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
            </div>

            {(() => {
                switch(activeTab){
                    /* Enter new employees into the employee database */
                    case 1:
                        return(
                            <>
                                <h3 className='section-subheader'>New Employee</h3>
                                <form className='form-container'>
                                    <label className="form-label">*Name</label>
                                    <div className='input-line'>
                                        {/* ReqTxtInput Component requrires setParam, which takes a handler function that sets a given value. */}
                                        {/* Handler function can only set string values. See ReqTxtInput component for details. */}
                                        <ReqTextInput text="First" value={newEmpFirst} setParam={setNewEmpFirst}/>
                                        <ReqTextInput text="Last" value={newEmpLast} setParam={setNewEmpLast}/>
                                    </div>
                                    <label className="form-label">*Email</label>
                                    <ReqTextInput value={newEmpEmail} setParam={setNewEmpEmail}/>
                                    <label className="form-label">*Phone</label>
                                    <div className='input-line'>
                                        <ReqTextInput text="Cell" value={newEmpCPhone} setParam={setNewEmpCPhone}/>
                                        <TextInput text="Home (Optional)" value={newEmpHPhone} setParam={setNewEmpHPhone}/>
                                    </div>
                                    <div className='input-line'>
                                        <ReqTextInput label="*Birthdate" type="date" text="MM/DD/YYYY" value={newEmpBdate} setParam={setNewEmpBdate}/>
                                        <ReqTextInput label="*SSN" value={newEmpSSN} setParam={setNewEmpSSN}/>
                                    </div>
                                    <button type='submit'>Submit</button>
                                </form>
                            </>
                        );
                    /* Manage which employees have admin access */
                    case 2:
                        return(
                            <div>
                                <h3 className='section-subheader'>Manage admin access here.</h3>
                                <ol>
                                    {shownEmployeeList.map((emp) => (
                                        <div>
                                            {/* Employee info display */}
                                            <li key={emp.info.id}>
                                                ID: {emp.info.id} | Name: {emp.info.firstName} {emp.info.lastName}
                                            </li>
                                            <label>Admin? </label>
                                            {/* Employees with admin perms will have their checkbox marked. Functionality to modify perms needs to be added. */}
                                            <input type="checkbox" checked={emp.admin}/> 
                                        </div>
                                    ))}
                                </ol>
                                <div>
                                    {/* Places page buttons below employee list that will update which portion of the whole employee list will be displayed. */}
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
                                </div>
                            </div>
                        );
                    /* Admins can view list of all registered users and lookup their data. Displayed by default. */
                    default:
                        return(
                            <div>
                                <h3 className='section-subheader'>Registered Users</h3>
                                <ol>
                                    {shownUserList.map((user) => (
                                        // User info display
                                        <li key={user.id}>
                                            ID: {user.id} | Name: {user.firstName} {user.lastName}
                                        </li>
                                    ))}
                                </ol>
                                <div>
                                    {/* Places page buttons below user list that will updata which portion of the whole user list will be displayed. */}
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
                                </div>
                            </div>
                        );
                }
            })()}
            
        </>
    );
}

export default AdminPortal;