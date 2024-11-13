interface Props {
    type?: string;                      // Input type. Text by default.
    text?: string;                      // Placeholder text. Displays inside textbox.
    value?: string;                     // Value that is displayed inside textbox. Can leave empty for most applications.
    setParam: (val: string) => void;    // Handler function that is used to set string values input through the textbox.
}

ReqTxtInput.defaultProps = {
    type: "text",
}

function ReqTxtInput({type, text, value, setParam}: Props) {
    return(
        <input
            type={type}
            placeholder={text}
            value={value}
            onChange={(e) => setParam(e.target.value)}
            required
        />
    );
}

export default ReqTxtInput;