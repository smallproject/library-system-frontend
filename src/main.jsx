import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import LanguageContextProvider from "./context/LanguageContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <LanguageContextProvider>
              <ThemeContextProvider>
                  <AuthContextProvider>
                    <App />
                  </AuthContextProvider>
              </ThemeContextProvider>
          </LanguageContextProvider>
      </Router>
  </StrictMode>,
)
