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
    path: string;       // [Required]: destination that button takes you to
                        //    * * *    setting  path="" will go to homepage
    direction?: string; // Direction of arrow ('left', 'right', 'up', 'down')
                        //    * * *    
    text?: string;      // Text displayed on button
    color?: string;     // Color of button
    hColor?: string;    // Hover Color of Button
}

function ArrowButton({path, direction, text, color, hColor}: ArrowButtonProps) {
    
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="arrow-button" 
            onClick={() => window.location.href = path}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundColor: isHovered ? hColor : color
            }}
        >
            <span>{text}</span>
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