import { useState } from "react";

interface SettingsTapProps {
    loggedIn: number;
    onSelectOption: (setStatus: number) => void;
}

interface DOProps {
    loggedIn: number;
    onSelectOption: (setStatus: number) => void;
}

interface SOProps {
    text: String;
    onClick?: () => void;
}

function SettingsOption({text, onClick}: SOProps){
    return(
        <div 
            className="settings-option"
            onClick={onClick}
            >
            {text}
        </div>
    )
}

function DisplayOptions({loggedIn, onSelectOption}: DOProps) {

    if(loggedIn) {
        return (
            <>
                <SettingsOption 
                    text="Toggle Accounts" 
                    onClick={() => onSelectOption(0)} 
                />
            </>
        )
    }

    return (
        <>
            <SettingsOption 
                text="Toggle Accounts" 
                onClick={() => onSelectOption(1)} 
            />
        </>
    );
}

function SettingsTab({loggedIn, onSelectOption}: SettingsTapProps) {

    const [clicked, setClicked] = useState(0);

    return (
        <div className="settings-tab">
            <SettingsOption 
                text="Dev Tools" 
                onClick={() => 
                    clicked ? setClicked(0) : setClicked(1)}
            />
            {clicked === 1 && <DisplayOptions loggedIn={loggedIn} onSelectOption={onSelectOption} />}
        </div>
    );
}

export default SettingsTab;