

interface WideImageProps {
    image: string;
    text?: string;
}

// Vars to control modifiable attributes
const height = '500px'
const opacity = '0.5'

function WideImage({image, text}: WideImageProps) {
    return (
        <div style={{position: 'relative', height: height}}>
            <img 
                src={image} 
                alt={text} 
                style={{
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    objectPosition: '100% 20%',
                    opacity: opacity,
                }}
            />
            <header 
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                }}
            >
            {text}
            </header>
        </div>
    );
}

export default WideImage;