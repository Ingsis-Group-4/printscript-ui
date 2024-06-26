import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/auth0/LoginButton";
import { useNavigate } from "react-router-dom";
import {Container, Typography, CircularProgress, Box, Paper, Avatar, Button} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const LoginScreen = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

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
                        <Button id='go-home' variant="contained" color="primary" onClick={() => navigate("/")}>
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
