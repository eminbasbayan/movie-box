import { Stack } from 'expo-router';

function RootLayoutContent() {
  return (
    <Stack>
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
  );
}

function RootLayout() {
  return <RootLayoutContent />;
}

export default RootLayout;
