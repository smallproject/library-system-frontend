import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from "react-router-dom";
import LanguageContextProvider from "./context/LanguageContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router>
          <LanguageContextProvider>
            <App />
          </LanguageContextProvider>
      </Router>
  </StrictMode>,
)
