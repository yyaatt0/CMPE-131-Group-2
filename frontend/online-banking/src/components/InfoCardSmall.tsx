interface Props {

    heading?: string;
    children?: React.ReactElement | string;
    className?: string;

}

export default function InfoCardSmall({heading, children, className}: Props) {

    const classes = `circle-heading ${className}`;

    return(
        <div className='small-info-card'>
            <div className={classes}>
                <h1>{heading}</h1>
            </div>
            <div className='circle-text'>{children}</div>
        </div>
    );
}