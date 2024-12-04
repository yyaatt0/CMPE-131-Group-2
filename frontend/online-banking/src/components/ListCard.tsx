
type user = {id: number, firstName: string, lastName: string};

interface Props {
    className?: string;
    children?: React.ReactNode;
    info: user
    onClick?: () => void;
}

function ListCard({className, children, info, onClick}: Props) {
    const classes: string = `list-card ${className}`;
    return(
        <div className={classes} onClick={onClick}>
            <label className="list-content">ID: {info.id}</label>
            <label className="list-content">Name: {info.lastName}, {info.firstName}</label>
            {children}
        </div>
);
}

export default ListCard;