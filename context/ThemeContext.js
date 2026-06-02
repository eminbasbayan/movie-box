import { createContext, useContext, useEffect, useState } from 'react';
import Colors from '../constants/colors';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = '@moviebox_theme';

export default function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme || 'dark');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.log('Tema yüklenirken hata:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    setTheme(newTheme);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.log('Tema kaydedilirken hata', error);
    }
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
