/*
    Component Description:

    Inserts an image onto the page that will cover the whole legnth of the page.
    Image is partially opaque with a blue background and 500px tall. Text can be
    added as an overlay to the image.
*/

interface WideImageProps {
    image: string;  // [Required]: path to image
    text?: string;  // Text to display centered over image
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