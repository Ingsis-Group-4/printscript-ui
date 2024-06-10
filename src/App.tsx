import './App.css';
import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import HomeScreen from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import RulesScreen from "./screens/Rules";

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

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
