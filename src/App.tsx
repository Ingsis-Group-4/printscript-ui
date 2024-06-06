import './App.css';
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import RulesScreen from "./screens/Rules";
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/auth0/LoginButton';
import LogoutButton from './components/auth0/LogoutButton';
import Profile from './components/auth0/Profile';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeScreen />
    },
    {
        path: '/rules',
        element: <RulesScreen />
    }
]);

export const queryClient = new QueryClient();

const App = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <h1>Mi Aplicación</h1>
                    {isAuthenticated ? (
                        <>
                            <LogoutButton />
                            <Profile />
                        </>
                    ) : (
                        <LoginButton />
                    )}
                </header>
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
}

export default App;
