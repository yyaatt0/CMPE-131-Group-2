import { useState } from 'react';
import {ChevronLeft, ChevronRight, ChevronUp, ChevronDown} from 'lucide-react'

/*
    Component Description:

    Inserts a button with an arrow icon onto the page. Component requires that you
    specify a path to redirect to. Can specify the direction of the arrow but will
    point right by default. Text added to the button will be placed to the left of
    the arrow. Background color and hover color can also be specified. Default
    values are defined under .arrow-button in styles.css.
*/

interface ArrowButtonProps {
    direction?: string; // Direction of arrow ('left', 'right', 'up', 'down')
    className?: string;
    children?: React.ReactElement | string;
    onClick?: () => void;
}

function ArrowButton({direction, children, className, onClick}: ArrowButtonProps) {
    
    const [isHovered, setIsHovered] = useState(false);
    const classes: string = `arrow-button ${className}`

    return (
        <div 
            className={classes}
            onClick={onClick}
        >
            <span>{children}</span>
            {(() => {
                switch (direction) {
                    case "up":
                        return <ChevronUp/>
                    case "down":
                        return <ChevronDown/>
                    case "left":
                        return <ChevronLeft/>
                    default:
                        return <ChevronRight/>
                }
            })()}
        </div>
    );
}

export default ArrowButton;