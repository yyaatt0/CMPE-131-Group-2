
import { user, employee, account } from '../types'

interface Props {
    className?: string;
    children?: React.ReactNode;
    onClick?: () => void;
}

function ListCard({className, children, onClick}: Props) {
    const classes: string = `list-card ${className}`;
    return(
        <div className={classes} onClick={onClick}>
            {children}
        </div>
);
}

export default ListCard;