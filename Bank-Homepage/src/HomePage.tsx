import AccountList from "./components/AccountList";
import CoverCard from "./components/CoverCard";
import FooterCard from "./components/FooterCard";

/*

    Account data reqs:

    id:         Specific number viewable only in database
    name:       Name of account
    balance:    Integer or decimal value representing balance stored in account
    link:       String holding link to the account's separate page

*/

// Temp hardcoded data
let accounts = [
    { id: 0, name: "Personal Checking", balance: 1000, link: "https://github.com/yyaatt0/CMPE-131-Group-2" },
    { id: 1, name: "Personal Savings", balance: 10000, link: "https://docs.google.com/spreadsheets/d/1WRvQJEyPjevrso0SVSZM8QDFeyPlFV4ibF0aKqr-gvQ/edit?gid=0#gid=0" },
    { id: 2, name: "Business Checking", balance: 93758, link: "https://sjsu.edu/" },
    { id: 3, name: "Business Savings", balance: 500782, link: "https://www.youtube.com/"}
];

function HomePage() {

  // Handle account selection
  const handleSelectItem = (accLink: string) => {
    window.location.href = accLink; // Redirect to page specified by account
  };

  return (
    <div>
      <CoverCard />
      <AccountList
        accounts={accounts}
        heading="Accounts"
        onSelectItem={handleSelectItem}
      />
      <FooterCard />
    </div>
  );
}

export default HomePage;
