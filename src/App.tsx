import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import RulesScreen from "./screens/Rules";
import LoginScreen from "./screens/Login.tsx";
import ProtectedRoute from "./components/routes/ProtectedRoute.tsx";

export const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>} />
                    <Route path="/rules" element={<ProtectedRoute><RulesScreen/></ProtectedRoute>} />
                    <Route path="/login" element={<LoginScreen />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;