import { createContext, useContext, useState } from 'react';
import Colors from '../constants/colors';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  console.log(systemScheme);
  
  const [theme, setTheme] = useState(systemScheme || 'dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);
  };

  const colors = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme, ThemeProvider içinde kullanılmalıdır!');
  }

  return context;
}
