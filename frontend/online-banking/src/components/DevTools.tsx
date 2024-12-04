import { useState } from "react";

interface DevToolsProps {
    loggedIn: number;
    onSelectOption: (setStatus: number) => void;
}

interface DisplayOptionsProps {
    loggedIn: number;
    onSelectOption: (setStatus: number) => void;
}

interface DevToolProps {
    text: String;
    onClick?: () => void;
}

function DevTool({text, onClick}: DevToolProps){
    return(
        <div 
            className="dev-tool"
            onClick={onClick}
            >
            {text}
        </div>
    )
}

function DisplayOptions({loggedIn, onSelectOption}: DisplayOptionsProps) {

    if(loggedIn) {
        return (
            <>
                <DevTool 
                    text="Toggle Accounts" 
                    onClick={() => onSelectOption(0)} 
                />
            </>
        )
    }

    return (
        <>
            <DevTool 
                text="Toggle Accounts" 
                onClick={() => onSelectOption(1)} 
            />
        </>
    );
}

function DevTools({loggedIn, onSelectOption}: DevToolsProps) {

    const [clicked, setClicked] = useState(0);

    return (
        <div className="dev-tab">
            <DevTool 
                text="Dev Tools" 
                onClick={() => 
                    clicked ? setClicked(0) : setClicked(1)}
            />
            {clicked === 1 && <DisplayOptions loggedIn={loggedIn} onSelectOption={onSelectOption} />}
        </div>
    );
}

export default DevTools;