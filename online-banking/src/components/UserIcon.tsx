/*
    Component Description:

    Takes any image and converts it to an appropriate user icon size 
    This will be primarly used for the AccountPage and the AdminPage if we get the time

*/

interface UserIconProps {
    src: string; 
    children?: React.ReactElement | string;
}

const height = '100px';
const width = '100px';

function UserIcon({src, children}: UserIconProps) {
    return (
        <>
        <div style={{position: 'relative', height: height, width: width}}>
            <img
                src={src}
                alt={src}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '55px',
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.1)',
                }}
            />
            {children}
        </div>
        </>
    );
}

export default UserIcon;