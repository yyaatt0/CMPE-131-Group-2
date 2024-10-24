import './AccountList.css'

interface CACProps {
    heading: string;
    text: string;
    direction: string;
}

function CACText({heading, text}: CACProps) {
    return (
        <div className="acc-desc">
            <h2>{heading}</h2>
            <p>{text}</p>
            <div className="cac-button">
                <a href="https://github.com/yyaatt0/CMPE-131-Group-2">Create Account</a>
            </div>
        </div>
    );
}

function CreateAccountCard({heading, text, direction}: CACProps) {

    if (direction === "right"){
        return (
            <div className="no-accounts">
                <CACText heading={heading} text={text} direction=""/>
                <div className="desc-img">[Placeholder]</div>
            </div>
        );
    }
    
    return (
        <div className="no-accounts">
            <div className="desc-img">[Placeholder]</div>
            <CACText heading={heading} text={text} direction=""/>
        </div>
    );
}

export default CreateAccountCard;