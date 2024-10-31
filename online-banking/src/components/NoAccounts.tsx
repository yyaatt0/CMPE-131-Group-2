import CreateAccountCard from "./CreateAccountCard";

let tempText = 
    "This is placeholder text. Fill in later with information on the account listed above. " +
    "This is placeholder text. Fill in later with information on the account listed above. " +
    "This is placeholder text. Fill in later with information on the account listed above. " +
    "This is placeholder text. Fill in later with information on the account listed above. ";


function NoAccounts() {

    return (
        <>
        <CreateAccountCard heading="Savings" text={tempText} direction="right"/>
        <CreateAccountCard heading="Checking" text={tempText} direction="left"/>
        </>
    );
}

export default NoAccounts;