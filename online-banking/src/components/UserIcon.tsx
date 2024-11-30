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

function UserIcon({src, children}: UserIconProps) {
    return (
        <>
        <div>
            <img
                src={src}
                alt={src}
                style={{
                    width: '100%',
                }}
            />
            {children}
        </div>
        </>
    );
}

export default UserIcon;