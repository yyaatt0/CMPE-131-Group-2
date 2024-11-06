import {ChevronRight} from 'lucide-react'

interface ArrowButtonProps {
    text?: string;
    path: string;
}

function ArrowButton({text, path}: ArrowButtonProps) {
    return (
        <div 
            className="arrow-button" 
            onClick={() => window.location.href=path}
        >
        <span>{text}</span>
        <ChevronRight/>
        </div>
    );
}

export default ArrowButton;