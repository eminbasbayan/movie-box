import { Stack } from 'expo-router';
import ThemeProvider, { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

function RootLayoutContent() {
  const { colors, theme } = useTheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movie/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: 'Geri',
            headerTransparent: true,
            headerTintColor: '#fff',
          }}
        />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </>
  );
}

function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}

export default RootLayout;
