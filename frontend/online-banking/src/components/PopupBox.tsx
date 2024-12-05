interface Props {
    children?: (React.ReactElement | string)[];
}

export default function PopupBox({children}: Props) {

    return(
        <div className="background-dim">
            <div className="popup">
                {children}
            </div>
        </div>
    );
}