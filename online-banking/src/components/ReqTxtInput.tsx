interface Props {
    type?: string;
    text?: string;
    value?: string;
    setParam: (val: string) => void;
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