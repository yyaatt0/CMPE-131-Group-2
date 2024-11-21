interface Props {

    heading?: string;
    children?: React.ReactElement | string;
    className?: string;

}

export default function InfoCardSmall({heading, children, className}: Props) {

    const classes = `small-info-card ${className}`;

    return(
        <div className={classes}>
            <div>
                <h1>{heading}</h1>
            </div>
            {children}
        </div>
    );
}