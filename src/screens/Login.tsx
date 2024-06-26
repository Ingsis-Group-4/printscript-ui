import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/auth0/LoginButton";
import { useNavigate } from "react-router-dom";
import {Container, Typography, CircularProgress, Box, Paper, Avatar, Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useEffect, useState} from "react";
import {AUTH0_AUDIENCE, AUTH0_SCOPE} from "../utils/constants.ts";
import Cookies from "js-cookie";

const LoginScreen = () => {
    const { isAuthenticated, isLoading, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const [isTokenSet, setIsTokenSet] = useState(false);

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
                    setIsTokenSet(true)
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
        console.log(isAuthenticated)
        getUserToken();
    }, [getAccessTokenSilently, isAuthenticated, user]);


    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: '15px' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcome
                </Typography>
                {isAuthenticated ? (
                    <Box mt={2} textAlign="center">
                        <Typography variant="body1" gutterBottom>
                            You are already logged in
                        </Typography>
                        <Button id='go-home' variant="contained" color="primary" onClick={() => navigate("/")} disabled={!isTokenSet}>
                            Go to Home
                        </Button>
                    </Box>
                ) : (
                    <Box mt={2} textAlign="center">
                        <Typography variant="body1" gutterBottom>
                            Please click to log in
                        </Typography>
                        <Box display="flex" justifyContent="center">
                            <LoginButton />
                        </Box>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default LoginScreen;
