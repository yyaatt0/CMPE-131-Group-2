import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import '../styles.css';
import './AdminPortal.css';
import ReqTextInput from '../components/ReqTextInput';
import TextInput from '../components/TextInput';
import ListCard from '../components/ListCard';
import ScrollBox from '../components/ScrollBox';
import PageButtons from '../components/PageButtons';
import { setTextRange } from 'typescript';

// Basic user type definition. Will add more fields later (contact info, ssn, etc.)
type user = {id: number, firstName: string, lastName: string};

// Temp registered user list
let userCount = 100;
let users: user[] = []
for(var i = 0; i < userCount; i++){
    if(i % 5 === 0 && i % 3 !== 0){
        users.push(
            {id: i + 100000, firstName: 'Barry', lastName: 'Allen'}
        )
    }
    else if(i % 5 !== 0 && i % 3 === 0){
        users.push(
            {id: i + 100000, firstName: 'Peter', lastName: 'Griffin'}
        )
    }
    else{
        users.push(
            {id: i + 100000, firstName: 'John', lastName: 'Doe'}
        )
    }
}

// Basic employee type definition.
type employee = {info: user, admin: boolean};

// Temp employee list
let employeeCount = 50;
let employees: employee[] = [];
for(var i = 0; i < employeeCount; i++){
    if(i % 3 === 0){    // Give every third employee admin access as a temp demonstration
        employees.push(
            {info: {id: i + 10000, firstName: 'Jane', lastName: 'Doe'}, admin: true}
        )
    }
    else{
        employees.push(
            {info: {id: i + 10000, firstName: 'John', lastName: 'Doe'}, admin: false}
        )
    }
}

// Basic account type definition.
type account = {id: number, name: string, balance: number};

// Temp account list
let accountCount = 12;
let accounts: account[] = [];
for(var i = 0; i < accountCount; i++){
    if(i % 3 === 0){
        accounts.push(
            {id: i, name: 'Checkings', balance: 999999}
        )
    }
    else{
        accounts.push(
            {id: i, name: 'Savings', balance: 5}
        )
    }
}


function AdminPortal() {

    // Used to navigate between admin tabs
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        const updateUnderlinePosition = () => {
            const currentTab = tabsRef.current[activeTab];
            if (currentTab) {
                setTabUnderlineLeft(currentTab.offsetLeft);
                setTabUnderlineWidth(currentTab.clientWidth);
            }
        };
        updateUnderlinePosition();
    }, [activeTab]);


    // Used to display both user and employee lists
    const [maxListItems, setMaxListItems] = useState(20);
    const [listStartIndex, setListStartIndex] = useState(0);
    const shownUserList = users.slice(listStartIndex, listStartIndex + maxListItems);   // Only show [maxListItems] number of users per page
    const shownEmployeeList = employees.slice(listStartIndex, listStartIndex + maxListItems); // Only show [maxListItems] number of employees per page

    const [selectedUser, setSelectedUser] = useState(0);

    const handleUserSelect = (index: number) => {
        setSelectedUser(index);
    }

    const [filterUser, setFilterUser] = useState(users);
    const [filterEmployee, setFilterEmployee] = useState(employees);

    const [filterUserEmpty, setFilterUserEmpty] = useState(false);
    const [filterEmployeeEmpty, setFilterEmployeeEmpty] = useState(false);

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

    const onSearchChange = (value: string) => {
        switch(activeTab) {
            case 2: {
                // do something
                const newData = employees.filter( (emp)=>
                    emp.info.firstName.toLocaleLowerCase().includes(value.toLowerCase()) || 
                    emp.info.lastName.toLocaleLowerCase().includes(value.toLowerCase()) || 
                    emp.info.id.toString().includes(value)
                    );
                setFilterEmployee(newData);
                break;
            }
            default: {
                // do something
                const newData = users.filter( (user)=>
                    user.firstName.toLocaleLowerCase().includes(value.toLowerCase()) || 
                    user.lastName.toLocaleLowerCase().includes(value.toLowerCase()) ||
                    user.id.toString().includes(value)
                );
                setFilterUser(newData);
                break;
            }
        }
    };

    return(
        <>
            <h1 className='section-header'>Admin Portal | Welcome, (Admin)</h1> {/* Will need to get name of current admin */}
            <div className='admin-nav'>  {/* Admin navigation tabs | 0: User database, 1: Add new employwee, 2: Manage Admin Access*/}

                <span
                    style={{
                        left: `${tabUnderlineLeft}px`,
                        width: `${tabUnderlineWidth}px`,
                    }}
                />
                {['View User Database', 'Add New Employee', 'Manage Admin Access'].map((tabName, index) => (
                    <button
                        key={index}
                        ref={(el) => (tabsRef.current[index] = el)}
                        onClick={() => setActiveTab(index)}
                    >
                        {tabName}
                    </button>
                ))}
                
                {/* <button
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
                </button> */}
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
                                        <ReqTextInput label="*Birthdate" type="date" value={newEmpBdate} setParam={setNewEmpBdate}/>
                                        <ReqTextInput label="*SSN" value={newEmpSSN} setParam={setNewEmpSSN}/>
                                    </div>
                                    <button type='submit'>Submit</button>
                                </form>
                            </>
                        );
                    /* Manage which employees have admin access */
                    case 2:
                        return(
                            <>
                                <h3 className='section-subheader'>Manage admin access here.</h3>
                                <div className='database-panel'>
                                    <div className='list-area'>
                                        <ScrollBox className='list-container'>
                                            {/* Adding the search bar here  */}
                                            <div className='search'>
                                                <Search className='search-bar-icon'/>
                                                <input 
                                                    className='search-bar'
                                                    type="search"
                                                    placeholder="Search for name"
                                                    onChange={(e) => onSearchChange(e.target.value)}
                                                />
                                            </div>    
                                            {filterEmployee.map((emp, index) => (
                                                <>
                                                    {/* Employee info display */}
                                                    <ListCard className={selectedUser === index ? 'selected': ''} onClick={() => handleUserSelect(index)}>
                                                        <label className='list-content'> ID: {emp.info.id} </label>
                                                        <label className='list-content'> Name: {emp.info.lastName}, {emp.info.firstName} </label>
                                                    </ListCard>
                                                </>
                                            ))}
                                        </ScrollBox>
                                    </div>
                                    {filterEmployee.length === 0 ? 
                                    (<>
                                    <div className='info-area'>
                                        <h2>No results!</h2>
                                    </div>
                                    </>) : (<>
                                    <div className='info-area'>
                                        <h2>ID: {filterEmployee[selectedUser].info.id}</h2>
                                        <h2>Name: {filterEmployee[selectedUser].info.lastName}, {filterEmployee[selectedUser].info.firstName}</h2>
                                        <h2>Phone: </h2>
                                        <h2>Email: </h2>
                                        <h2>Username: </h2>
                                        <h2>Password: </h2>
                                        <label className='section-subheader'> Admin? </label>
                                        {/* Employees with admin perms will have their checkbox marked. Functionality to modify perms needs to be added. */}
                                        <input type="checkbox" checked={filterEmployee[selectedUser].admin}/>
                                    </div>
                                    </>)}
                                </div>
                                {/* Places page buttons below employee list that will update which portion of the whole employee list will be displayed. */}
                                {/* <PageButtons array={employees} max={maxListItems} handleClick={setListStartIndex}/> */}
                            </>
                        );
                    /* Admins can view list of all registered users and lookup their data. Displayed by default. */
                    default:
                        return(
                            <>
                                <h3 className='section-subheader'>Registered Users</h3>
                                <div className='database-panel'>
                                    <div className='list-area'>
                                        <ScrollBox className='list-container'>

                                        <div className='search'>
                                            <Search className='search-bar-icon'/>
                                            <input 
                                                className='search-bar'
                                                type="search"
                                                placeholder="Search for name"
                                                onChange={(e) => onSearchChange(e.target.value)}
                                            />
                                        </div>       
                                            {filterUser.map((user, index) => (
                                                // User info display
                                                <ListCard className={selectedUser === index ? 'selected' : ''} onClick={() => handleUserSelect(index)}>
                                                    <label className='list-content'> ID: {user.id} </label>
                                                    <label className='list-content'> Name: {user.lastName}, {user.firstName} </label>
                                                </ListCard>
                                            ))}
                                        </ScrollBox>
                                    </div>

                                    {filterUser.length === 0 ? (<>
                                        <div className='info-area'>
                                            <h2>No results!</h2>
                                        </div>
                                    </>) : (<>
                                        <div className='info-area'>
                                            <h2>ID: {filterUser[selectedUser + listStartIndex].id}</h2>
                                            <h2>Name: {filterUser[selectedUser + listStartIndex].lastName}, {filterUser[selectedUser + listStartIndex].firstName}</h2>
                                            <h2>Phone: </h2>
                                            <h2>Email: </h2>
                                            <h2>Username: </h2>
                                            <h2>Password: </h2>
                                            <h3 className='section-subheader'>Accounts</h3>
                                            <div className='info-list-area'>
                                                <ScrollBox className='list-container'>
                                                    {accounts.map((acc) => (
                                                        <div className='list-card'>
                                                            <label className="list-content">ID: {acc.id} </label>
                                                            <label className="list-content">Name: {acc.name} </label>
                                                            <label className="list-content">Balance: {acc.balance} </label>
                                                        </div>
                                                    ))}
                                                </ScrollBox>
                                            </div>
                                        </div>
                                    </>)}
                                </div>
                                {/* Places page buttons below user list that will update which portion of the whole employee list will be displayed. */}
                                {/* <PageButtons className='page-num-center' array={users} max={maxListItems} handleClick={setListStartIndex}/> */}
                            </>
                        );
                }
            })()}
            
        </>
    );
}

export default AdminPortal;