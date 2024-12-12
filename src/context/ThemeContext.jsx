import {createContext, useState} from 'react';

export const ThemeContext = createContext();

function ThemeContextProvider({children}) {

    const storedTheme = localStorage.getItem('theme');
    const [theme, setTheme] = useState(storedTheme || 'light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem("theme", theme === 'light' ? 'dark' : 'light');
    };

    const contextValue = {
        theme,
        toggleTheme
    };

    return (
      <ThemeContext.Provider value={contextValue}>
            {children}
      </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;