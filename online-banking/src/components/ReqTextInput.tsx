interface Props {
    label?: string;
    type?: string;                      // Input type. Text by default.
    text?: string;                      // Placeholder text. Displays inside textbox.
    value: string;                     // Value that is displayed inside textbox. Can leave empty for most applications.
    setParam: (val: string) => void;    // Handler function that is used to set string values input through the textbox.
}

function ReqTextInput({label, type, text, value, setParam}: Props) {
    return(
        
        <>
            {label && 
                <div>
                    <label className="form-label">{label}</label>
                    <input
                        className="form-box"
                        type={type}
                        placeholder={text}
                        value={value}
                        onChange={(e) => setParam(e.target.value)}
                        required
                    />
                </div>
            }
            {!label && 
                <input
                    className="form-box"
                    type={type}
                    placeholder={text}
                    value={value}
                    onChange={(e) => setParam(e.target.value)}
                    required
                />
            }
        </>
    );
}

export default ReqTextInput;