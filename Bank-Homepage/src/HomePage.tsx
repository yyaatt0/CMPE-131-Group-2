import AccountList from "./components/AccountList";
import CoverCard from "./components/CoverCard";
import FooterCard from "./components/FooterCard";

let items = [
    "Personal Checking",
    "Personal Savings",
    "Business Checking",
    "Business Savings",
  ];

function HomePage() {

    const handleSelectItem = (item: string) => {
        console.log(item);
        // Temp redirect to the GitHub for now. Will redirect to specified account later.W
        window.location.href = "https://github.com/yyaatt0/CMPE-131-Group-2";
    }

    return (
        <div>
            <CoverCard/>
            <AccountList items={items} heading="Accounts" onSelectItem={handleSelectItem}/>
            <FooterCard/>
        </div>
    );
}


export default HomePage;
