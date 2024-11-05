

interface WideImageProps {
    image: string;
    text?: string;
}

// Vars to control modifiable attributes
const height = '500px'
const opacity = '0.5'

function WideImage({image, text}: WideImageProps) {
    return (
        <div style={{position: 'relative', height: height, backgroundColor: '#003459'}}>
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
            <header className="wide-image-text">
                {text}
            </header>
        </div>
    );
}

export default WideImage;