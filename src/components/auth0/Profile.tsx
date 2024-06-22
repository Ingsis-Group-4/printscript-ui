import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Box, Avatar, Typography, Popover } from "@mui/material";
import { AUTH0_AUDIENCE, AUTH0_SCOPE } from "../../utils/constants.ts";
import LogoutButton from "./LogoutButton.tsx";

const Profile = () => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const getUserToken = async () => {
            if (isAuthenticated && user) {
                try {
                    const accessToken = await getAccessTokenSilently({
                        authorizationParams: {
                            audience: AUTH0_AUDIENCE,
                            scope: AUTH0_SCOPE,
                        },
                    });
                    Cookies.set("accessToken", accessToken, { expires: 1 }); // La cookie expirará en 1 día
                    console.log(accessToken);
                    // console.log(user);
                } catch (e: unknown) {
                    if (e instanceof Error) {
                        console.log(e.message);
                    } else {
                        console.log(String(e));
                    }
                }
            }
        };

        getUserToken();
    }, [getAccessTokenSilently, isAuthenticated, user]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'profile-popover' : undefined;

    if (!isAuthenticated) {
        return <Typography>Loading...</Typography>;
    }

    return (
        isAuthenticated && user && (
            <Box sx={{ display: 'inline-block', position: 'relative' }}>
                <Avatar
                    src={user.picture}
                    alt={user.name}
                    onClick={handleClick}
                    sx={{
                        width: 40,
                        height: 40,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        },
                    }}
                />
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{
                        p: 2,
                        textAlign: 'center',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: 1,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        width: 200,
                    }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>{user.name}</Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>{user.email}</Typography>
                        <LogoutButton />
                    </Box>
                </Popover>
            </Box>
        )
    );
};

export default Profile;
