import React from 'react';
import Collapsible from "react-collapsible";
import '../styles.css';

interface ExpandableBtnListProps {
    trigger: string;
    buttons: string[];
    children?: React.ReactElement | string;
    onButtonClick: (label: string) => void;
}

function ExpandableBtnList({trigger, buttons, children, onButtonClick}: ExpandableBtnListProps) {
    return (
        <>
            <Collapsible trigger={trigger}>
                {buttons.map((label, index) => (
                    <button 
                        className="exp-button" 
                        key={index} 
                        onClick={() => onButtonClick(label)}
                    >
                    {label}
                    </button>
                ))}
            </Collapsible>
            {children}
        </>
    );
}

export default ExpandableBtnList;