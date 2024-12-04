interface Props {
    className?: string;
    array: Array<any>;
    max: number;
    handleClick: (n: number) => void;
}

function PageButtons({className, array, max, handleClick}: Props) {

    const classes: string = `page-select ${className}`;

    return(
        <div className={classes} >
            {/* Places page buttons below user list that will updata which portion of the whole user list will be displayed. */}
            {array.filter((item, index) => index % max === 0).map((item, index) => (
                <button 
                    key={index}
                    onClick={() =>
                        handleClick(index * max)
                    }
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
}

export default PageButtons;