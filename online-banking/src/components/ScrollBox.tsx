import { useRef } from "react";

interface Props {
    className?: string;
    children?: React.ReactNode;
}

function ScrollBox({className, children}: Props) {
    const scrollBoxRef = useRef<HTMLDivElement>(null);

    return (
        <div className={className} ref={scrollBoxRef} style={{overflowY: 'auto'}}>
            {children}
        </div>
    );
}

export default ScrollBox;