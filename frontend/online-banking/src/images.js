
// > import [image name] from '[filepath to image (keep images in image folder)]'; <
import home_cover from './images/cover-img.jpg';
import home_signing from './images/home_signing.jpg';

// Add [image name] here one imported
const images = {
    home_cover,
    home_signing
}

// > import images from '../images'; < to access images
// Access image using > {image.[image name]} <
export default images;