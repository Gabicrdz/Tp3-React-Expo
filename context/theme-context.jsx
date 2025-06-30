import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [modoOscuro, setModoOscuro] = useState(false);

    const toggleTema = () => setModoOscuro(prev => !prev);

    return (
        <ThemeContext.Provider value={{modoOscuro, toggleTema}}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext)
}