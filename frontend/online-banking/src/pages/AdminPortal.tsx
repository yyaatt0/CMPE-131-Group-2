import { useState, useRef, useEffect } from 'react';
import { Search, LogOut } from 'lucide-react';
import '../styles.css';
import './AdminPortal.css';
import ReqTextInput from '../components/ReqTextInput';
import TextInput from '../components/TextInput';
import ListCard from '../components/ListCard';
import ScrollBox from '../components/ScrollBox';
import PageButtons from '../components/PageButtons';
import { setTextRange } from 'typescript';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Basic user type definition. Will add more fields later (contact info, ssn, etc.)
type user = {id: number, firstName: string, lastName: string, email: string, username: string, pwd: string};

// Basic employee type definition.
//type employee = {info: user, admin: boolean};
type employee = {
    info: {
        id: number,
        username: string;
        firstName: string;
        lastName: string;
        password: string;
        email: string;
    };
    admin: boolean;
};


// Basic account type definition.
type account = {userID: number, id: number, name: string, balance: number};
type transaction = {userID: number, accountID: number, accountType: string, transactionType: boolean, amount: number, timeCreate: string};

function AdminPortal() {

    // Used to navigate between admin tabs
    const [activeTab, setActiveTab] = useState(0);
    const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    // HARDCODED DATA
    // BACKEND WILL IMPORT THIS
    //const adminName = "John Doe"; 
    const [admin, setUser] = useState({
        firstName: "",
        lastName: "",
    })
    
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/Homepage');
    };

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

    const [userList, setUserList] = useState<user[]>([]);
    const [accountsList, setAccountsList] = useState<account[]>([]);
    const [transactionsList, setTransactionsList] = useState<transaction[]>([]);
    const [employeeList, setEmployeeList] = useState<employee[]>([]);

    

    useEffect(() => {
        // Fetch employee list from the backend
        const fetchEmployeeList = async () => {
            try {
                const response = await axios.get('http://localhost:3001/auth/admin/cemployees', {
                    withCredentials: true, // Include session cookies if necessary
                });

                if (response.data && Array.isArray(response.data.employees)) {
                    const fetchedUsers: employee[] = response.data.employees.map((userData: { adminID: number, fname: string, lname: string, email: string, username: string, password: string }) => ({
                            info: {
                                id: userData.adminID,
                                username: userData.username,
                                firstName: userData.fname,
                                lastName: userData.lname,
                                password: userData.password,
                                email: userData.email,
                            },
                            admin: true,  // Assuming default value of false; change if needed
                        }));
                    console.log(fetchedUsers)
                    setEmployeeList(fetchedUsers); // Update the state with the fetched users
                } else {
                    throw new Error("Failed to fetch users. Data format is incorrect.");
                }
            } catch (err) {
                console.error('Error fetching employee list:', err);
            }
        };

        fetchEmployeeList();
    }, []);

    
    useEffect(() => {
        const fetchUserDetails = async () => {
        try {
            const res = await axios.get("http://localhost:3001/auth/admin/details", {
            withCredentials: true, // Include session cookies in the request
            });
            const { firstName, lastName } = res.data;
            setUser({ firstName, lastName });
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
        };
        fetchUserDetails();
    }, []);  

    useEffect(() => {
        // Fetch users from the backend
        const fetchAccounts= async () => {
            try {
                const res = await axios.get("http://localhost:3001/auth/accountsList", {
                    withCredentials: true,
                }); // Adjust this URL to your backend route

                if (res.data && Array.isArray(res.data.accounts)) {
                    const fetchedAccounts: account[] = res.data.accounts.map((accountData: {userID: number, accountID: number, type: string, balance: number,}) => ({ // Include transaction of format of type list
                        userID: accountData.userID,
                        id: accountData.accountID,
                        name: accountData.type,
                        balance: accountData.balance,
                    }));
                    setAccountsList(fetchedAccounts); // Update the state with the fetched users

                    // add fetchTransaction 
                } else {
                    throw new Error("Failed to fetch Accounts. Data format is incorrect.");
                }
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        // Fetch users from the backend
        const fetchUsers = async () => {
            try {
                const res = await axios.get("http://localhost:3001/auth/usersList", {
                    withCredentials: true,
                }); // Adjust this URL to your backend route

                if (res.data && Array.isArray(res.data.users)) {
                    const fetchedUsers: user[] = res.data.users.map((userData: { userID: number, fname: string, lname: string, email: string, username: string, password: string}) => ({
                        id: userData.userID,
                        firstName: userData.fname,
                        lastName: userData.lname,
                        email: userData.email,
                        username: userData.username,
                        pwd: userData.password,
                    }));

                    setUserList(fetchedUsers); // Update the state with the fetched users
                } else {
                    throw new Error("Failed to fetch users. Data format is incorrect.");
                }
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []); // Empty


    //type transaction = {userID: number, admin id: number, name: string, transactionType: boolean, amount: number, timeCreate: string};
    //const [transactionsList, setTransactionsList] = useState<transaction[]>([]);
    // type transaction = {userID: number, accountID: number, accountType: string, transactionType: boolean, amount: number, timeCreate: string};

    useEffect(() => {
        // Fetch users from the backend
        const fetchAccounts= async () => {
            try {
                const res = await axios.get("http://localhost:3001/auth/transactionList", {
                    withCredentials: true,
                }); // Adjust this URL to your backend route

                if (res.data && Array.isArray(res.data.transactions)) {
                    const fetchedAccounts: transaction[] = res.data.transactions.map((accountData: {userID: number, accountID: number, transactionType: number, amount: number, timeCreate: string, type: string}) => ({
                        userID: accountData.userID,
                        accountID: accountData.accountID,
                        accountType: accountData.type,
                        transactionType: accountData.transactionType,
                        amount: accountData.amount,
                    }));
                    console.log(res.data.transactions)
                    setTransactionsList(fetchedAccounts); // Update the state with the fetched users
                } else {
                    throw new Error("Failed to fetch Accounts. Data format is incorrect.");
                }
            } catch (err) {
                console.error("Error fetching accounts:", err);
            }
        };

        fetchAccounts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const newEmployeeData = {
            firstName: newEmpFirst,
            lastName: newEmpLast,
            email: newEmpEmail,
            username: newEmpUsername,
            password: newEmpPassword,
        };
    
        try {
            const response = await axios.post("http://localhost:3001/auth/admin/employee", newEmployeeData, {
                withCredentials: true, // Include session cookies if necessary
            });
            
            if (response.data.success) {
                alert("New employee added successfully!");
            } else {
                alert("Failed to add employee.");
            }
        } catch (error) {
            console.error("Error adding employee:", error);
            alert("There was an error adding the employee.");
        }
    };
    

    // Used to display both user and employee lists
    //const [maxListItems, setMaxListItems] = useState(20);
    //const [listStartIndex, setListStartIndex] = useState(0);
    //const shownUserList = users.slice(listStartIndex, listStartIndex + maxListItems);   // Only show [maxListItems] number of users per page
    //const shownEmployeeList = employees.slice(listStartIndex, listStartIndex + maxListItems); // Only show [maxListItems] number of employees per page

    //const [selectedUser, setSelectedUser] = useState(0);

    const handleUserSelect = (index: number) => {
        setSelectedUser(index);
    }

    const [filterEmployee, setFilterEmployee] = useState<employee[]>([]);


    const [filterUserEmpty, setFilterUserEmpty] = useState(false);
    const [filterEmployeeEmpty, setFilterEmployeeEmpty] = useState(false);

    const [maxListItems, setMaxListItems] = useState(20);

    const [filterUser, setFilterUser] = useState<user[]>([]); // Initialize as an empty array
    // const [selectedUser, setSelectedUser] = useState(0);
    // const [listStartIndex, setListStartIndex] = useState(0);
    const [selectedUser, setSelectedUser] = useState<number>(0); // Index of selected user
    const [listStartIndex, setListStartIndex] = useState<number>(0);
    /*

    Need to add new user verification & new bank account verification
    
    */

    // Data value declarations for new employee creation
    // const newEmpId = employees.length;
    // const [newEmpFirst, setNewEmpFirst] = useState("");
    // const [newEmpLast, setNewEmpLast] = useState("");
    // const [newEmpCPhone, setNewEmpCPhone] = useState("");
    // const [newEmpHPhone, setNewEmpHPhone] = useState("");
    // const [newEmpEmail, setNewEmpEmail] = useState("");
    // const [newEmpBdate, setNewEmpBdate] = useState("");
    // const [newEmpSSN, setNewEmpSSN] = useState("");

    const [newEmpUsername, setNewEmpUsername] = useState("");
    const [newEmpPassword, setNewEmpPassword] = useState("");
    const [newEmpFirst, setNewEmpFirst] = useState("");
    const [newEmpLast, setNewEmpLast] = useState("");
    const [newEmpEmail, setNewEmpEmail] = useState("");
    

    // Admin access management
    const [isAdmin, setIsAdmin] = useState(false);
    const handleToggleAdmin = (emp: employee, event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
        console.log("Admin status toggled.");
    }

    // Sync filterUser with userList when userList changes
    useEffect(() => {
        setFilterUser(userList);
    }, [userList]);

    useEffect(() => {
        setFilterEmployee(employeeList);
    }, [employeeList]);

    // Handle search term change
    const onSearchChanged = (searchTerm: string) => {
        const filteredUsers = userList.filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilterUser(filteredUsers); 
        //setSelectedUser(0); // Reset selected user when search changes
        if (filteredUsers.length === 0) {
            setSelectedUser(0); // No users, reset selection
        } else {
            // If the selected user is out of bounds, reset it to 0
            setSelectedUser(prevSelectedUser => 
                prevSelectedUser >= filteredUsers.length ? 0 : prevSelectedUser
            );
        }
    };
    const onSearchChange = (value: string) => {
        switch (activeTab) {
            case 2: {
                // Perform the search on employee data
                const filteredData = employeeList.filter((emp) =>
                    emp.info.firstName.toLowerCase().includes(value.toLowerCase()) || 
                    emp.info.lastName.toLowerCase().includes(value.toLowerCase()) || 
                    emp.info.id.toString().includes(value) // Search by employee ID
                );
                setFilterEmployee(filteredData);  // Update the filtered employee list
                break;
            }
            // Handle other cases if necessary
            default:
                break;
        }
    };

    // const onSearchChange = (value: string) => {
    //     switch(activeTab) {
    //         case 2: {
    //             // do something
    //             const newData = employees.filter( (emp)=>
    //                 emp.info.firstName.toLocaleLowerCase().includes(value.toLowerCase()) || 
    //                 emp.info.lastName.toLocaleLowerCase().includes(value.toLowerCase()) || 
    //                 emp.info.id.toString().includes(value)
    //                 );
    //             setFilterEmployee(newData);
    //             break;
    //         }
    //     }
    // };
   console.log(accountsList[0]);
    
    return(
        <>
            <div className='header-wrapper'>
                <h1 className='section-header'>Admin Portal | Welcome, {admin.firstName} {admin.lastName}</h1> {/* Will need to get name of current admin */}
                <button className='logout-button' onClick={handleClick}>
                    <LogOut/> Logout
                </button>
            </div>
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
                                <form className='form-container' onSubmit={handleSubmit}>
                                    <label className="form-label">*Name</label>
                                    <div className='input-line'>
                                        {/* ReqTxtInput Component requrires setParam, which takes a handler function that sets a given value. */}
                                        {/* Handler function can only set string values. See ReqTxtInput component for details. */}
                                        <ReqTextInput text="First" value={newEmpFirst} setParam={setNewEmpFirst}/>
                                        <ReqTextInput text="Last" value={newEmpLast} setParam={setNewEmpLast}/>
                                    </div>
                                    <label className="form-label">*Email</label>
                                    <ReqTextInput value={newEmpEmail} setParam={setNewEmpEmail}/>
                                    <label className="form-label">*Username</label>
                                    <ReqTextInput value={newEmpUsername} setParam={setNewEmpUsername}/>
                                    
                                    <label className="form-label">*Password</label>
                                    <ReqTextInput type="password" value={newEmpPassword} setParam={setNewEmpPassword}/>
                
                                    {/* <label className="form-label">*Phone</label>
                                    <div className='input-line'>
                                        <ReqTextInput text="Cell" value={newEmpCPhone} setParam={setNewEmpCPhone}/>
                                        <TextInput text="Home (Optional)" value={newEmpHPhone} setParam={setNewEmpHPhone}/>
                                    </div>
                                    <div className='input-line'>
                                        <ReqTextInput label="*Birthdate" type="date" value={newEmpBdate} setParam={setNewEmpBdate}/>
                                        <ReqTextInput label="*SSN" value={newEmpSSN} setParam={setNewEmpSSN}/>
                                    </div> */}
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
                                            {/* {filterEmployee.length > 0 ? (
                                                filterEmployee.map((employee, index) => (
                                                    <ListCard
                                                        key={employee.info.id}  // Ensure each ListCard has a unique key for better rendering performance
                                                        className={selectedUser === index ? 'selected' : ''}
                                                        onClick={() => handleUserSelect(index)}  // Function to handle user selection
                                                    >
                                                        <label className='list-content'> ID: {employee.info.id} </label>
                                                        <label className='list-content'>
                                                            Name: {employee.info.lastName}, {employee.info.firstName}
                                                        </label>
                                                    </ListCard>
                                                ))
                                            ) : (
                                                <p>No employees found matching your search criteria.</p>  // Message when no employees are found
                                            )} */}
                                            {employeeList.map((employee, index) => (
                                                // User info display
                                                <ListCard className={selectedUser === index ? 'selected' : ''} onClick={() => handleUserSelect(index)}>
                                                    <label className='list-content'> ID: {employee.info.id} </label>
                                                    <label className='list-content'> Name: {employee.info.lastName}, {employee.info.firstName} </label>
                                                </ListCard>
                                            ))}
                                            {/* {filterEmployee.map((emp, index) => (
                                                <>
                                                    {/* Employee info display */}
                                                    {/* <ListCard className={selectedUser === index ? 'selected': ''} onClick={() => handleUserSelect(index)}>
                                                        <label className='list-content'> ID: {emp.info.id} </label>
                                                        <label className='list-content'> Name: {emp.info.lastName}, {emp.info.firstName} </label>
                                                    </ListCard>
                                                </>
                                            ))} */} 
                                        </ScrollBox>
                                    </div>
                                    {filterEmployee.length === 0 ? 
                                    (<>
                                    <div className='info-area'>
                                        <h2>No results!</h2>
                                    </div>
                                    </>) : (<>
                                    {selectedUser !== null && selectedUser < filterEmployee.length && (
                                    <div className='info-area'>
                                        <h2>ID: {filterEmployee[selectedUser].info.id}</h2>
                                        <h2>Name: {filterEmployee[selectedUser].info.lastName}, {filterEmployee[selectedUser].info.firstName}</h2>
                                        <h2>Email: {filterEmployee[selectedUser].info.email}</h2>
                                        <h2>Username: {filterEmployee[selectedUser].info.username}</h2>
                                        <h2>Password: {filterEmployee[selectedUser].info.password}</h2>
                                        <label className='section-subheader'> Admin? </label>
                                        {/* Employees with admin perms will have their checkbox marked. Functionality to modify perms needs to be added. */}
                                        <input type="checkbox" checked={filterEmployee[selectedUser].admin}/>
                                    </div>
                                    )}
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
                                                onChange={(e) => onSearchChanged(e.target.value)}
                                            />
                                        </div>       
                                            {userList.map((user, index) => (
                                                // User info display
                                                <ListCard className={selectedUser === index ? 'selected' : ''} onClick={() => handleUserSelect(index)}>
                                                    <label className='list-content'> ID: {user.id} </label>
                                                    <label className='list-content'> Name: {user.lastName}, {user.firstName} </label>
                                                </ListCard>
                                            ))}
                                            
                                        </ScrollBox>
                                    </div>
                                    
                                        {filterUser.length === 0 ? (
                                            <div className='info-area'>
                                                <h2>No results!</h2>
                                            </div>
                                        ) : (<>
                                            {/* Show user details and accounts if a user is selected */}
                                            {/* {selectedUser !== null && (
                                                <div className='info-area'>
                                                    <h2>ID: {filterUser[selectedUser + listStartIndex].id}</h2>
                                                    <h2>Name: {filterUser[selectedUser + listStartIndex].lastName}, {filterUser[selectedUser + listStartIndex].firstName}</h2>
                                                    <h2>Email: {filterUser[selectedUser + listStartIndex].email}</h2>
                                                    <h2>Username: {filterUser[selectedUser + listStartIndex].username}</h2>
                                                    <h2>Password: {filterUser[selectedUser + listStartIndex].pwd}</h2>

                                                    <h3 className='section-subheader'>Accounts</h3>
                                                    <div className='info-list-area'>
                                                    <ScrollBox className='list-container'>
                                                        {accountsList
                                                            .filter((account) => account.userID === filterUser[selectedUser + listStartIndex].id) // Filter accounts by userID
                                                            .map((acc) => (
                                                                <div className='list-card' key={acc.id}>
                                                                    <label className="list-content">ID: {acc.id}</label>
                                                                    <label className="list-content">Name: {acc.name}</label>
                                                                    <label className="list-content">Balance: ${acc.balance.toFixed(2)}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </ScrollBox>
                                                    </div>
                                                </div>
                                            )} */}
                                            {/* Show user details and accounts if a user is selected */}
                                            {selectedUser !== null && selectedUser < filterUser.length && (
                                                <div className="info-area">
                                                    <h2>ID: {filterUser[selectedUser].id}</h2>
                                                    <h2>Name: {filterUser[selectedUser].lastName}, {filterUser[selectedUser].firstName}</h2>
                                                    <h2>Email: {filterUser[selectedUser].email}</h2>
                                                    <h2>Username: {filterUser[selectedUser].username}</h2>
                                                    <h2>Password: {filterUser[selectedUser].pwd}</h2>

                                                    <h3 className="section-subheader">Transactions</h3>
                                                    <div className="info-list-area">
                                                        <ScrollBox className="list-container">
                                                            {transactionsList
                                                                .filter((transaction) => transaction.userID === filterUser[selectedUser + listStartIndex].id) // Filter accounts by userID
                                                                .map((acc) => (
                                                                    // console.log(filterUser[selectedUser].id);
                                                                    <div className="list-card" key={acc.accountID}>
                                                                        <label className="list-content">ID: {acc.accountID}</label>
                                                                        <label className="list-content">Account Type: {acc.accountType}</label>
                                                                        <label className="list-content">Transaction Type: {acc.transactionType ? "Withdraw" : "Deposit"}</label>
                                                                        <label className="list-content">Amount: ${acc.amount}</label>
                                                                    </div>
                                                                ))}
                                                        </ScrollBox>
                                                    </div>
                                                </div>
                                            )}

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