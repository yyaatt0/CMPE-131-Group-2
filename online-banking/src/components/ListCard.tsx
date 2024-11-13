
type user = {id: number, firstName: string, lastName: string};

interface Props {
    children?: React.ReactNode;
    info: user
    onClick?: () => void;
}

function ListCard({children, info, onClick}: Props) {
    return(
        <div className="list-card" onClick={onClick}>
            <label className="list-content">ID: {info.id}</label>
            <label className="list-content">{info.lastName}, {info.firstName}</label>
            {children}
        </div>
);
}

export default ListCard;