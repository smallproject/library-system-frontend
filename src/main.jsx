import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import LanguageContextProvider from "./context/LanguageContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import ReservationProvider from "./context/ReservationProvider.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <LanguageContextProvider>
                <ThemeContextProvider>
                    <AuthContextProvider>
                        <ReservationProvider>
                            <App/>
                        </ReservationProvider>
                    </AuthContextProvider>
                </ThemeContextProvider>
            </LanguageContextProvider>
        </Router>
    </StrictMode>,
)
