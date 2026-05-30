import { Stack } from 'expo-router';

function RootLayoutContent() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

function RootLayout() {
  return <RootLayoutContent />;
}

export default RootLayout;
