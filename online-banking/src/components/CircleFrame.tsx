
interface CircleFrameProps {
    size: string;
    hOffset?: string;
    vOffset?: string;
    color?: string;
    children?: React.ReactNode;
}

CircleFrame.defaultProps = {
    size: '100',
    hOffset: '0',
    vOffset: '0'
}

function CircleFrame({size, hOffset, vOffset, color, children}: CircleFrameProps) {

    return(
        <div
            style={{
                flexWrap: 'wrap',
                borderRadius: '50%',
                backgroundColor: color,
                height: size,
                width: size,
                transform: `translate(${hOffset}px, ${vOffset}px)`
            }}
        >
            {children}
        </div>
    );
}

export default CircleFrame;
