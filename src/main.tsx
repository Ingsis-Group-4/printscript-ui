import React from 'react';
import App from './App.tsx';
import './index.css';
import { createRoot } from "react-dom/client";
import { PaginationProvider } from "./contexts/paginationProvider.tsx";
import { SnackbarProvider } from "./contexts/snackbarProvider.tsx";
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_AUDIENCE, AUTH0_CLIENT_ID, AUTH0_DOMAIN, AUTH0_SCOPE, FRONTEND_URL } from "./utils/constants.ts";


createRoot(document.getElementById('root')!).render(
    <Auth0Provider
        domain={AUTH0_DOMAIN}
        clientId={AUTH0_CLIENT_ID}
        authorizationParams={{
            redirect_uri: FRONTEND_URL,
            audience: AUTH0_AUDIENCE,
            scope: AUTH0_SCOPE
        }}
    >
        <React.StrictMode>
            <PaginationProvider>
                <SnackbarProvider>
                    <App />
                </SnackbarProvider>
            </PaginationProvider>
        </React.StrictMode>
    </Auth0Provider>
);
