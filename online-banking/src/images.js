
// > import [image name] from '[filepath to image (keep images in image folder)]'; <
import home_cover from './images/cover-img.jpg';
import home_signing from './images/home_signing.jpg';
import checking from './images/checking.jpg';
import saving from './images/saving.jpg';
import user_icon from './images/user_icon.jpg'

// Add [image name] here one imported
const images = {
    home_cover,
    home_signing,
    checking,
    saving,
    user_icon
}

// > import images from '../images'; < to access images
// Access image using > {image.[image name]} <
export default images;