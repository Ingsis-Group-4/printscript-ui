import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import Cookies from "js-cookie";

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <Button
            onClick={() => {
                logout({ logoutParams: { returnTo: window.location.origin } });
                Cookies.remove("accessToken");
            }}
            variant="contained"
            color="error"
        >
            Log Out
        </Button>
    );
};

export default LogoutButton;