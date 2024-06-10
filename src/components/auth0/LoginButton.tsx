import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@mui/material";

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <Button
            onClick={() => loginWithRedirect()}
            sx={{
                my: 2,
                color: 'white',
                display: 'flex',
                justifyContent: "center",
                gap: "4px",
                backgroundColor: 'primary.light',
                "&:hover": {
                    backgroundColor: 'primary.dark'
                }
            }}
        >
            Log In
        </Button>
    );
};

export default LoginButton;