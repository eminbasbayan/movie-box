import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Counter from '../../components/Counter';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

function HomeScreen() {
  const router = useRouter();
  const { theme, colors, toggleTheme } = useTheme();

  function handlePress() {
    router.push('/movie/456');
    /* console.log("Tıklandı!"); */
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          color: colors.text,
        }}
      >
        Home Screen
      </Text>
      <Pressable onPress={handlePress}>
        <Text
          style={{
            color: colors.text,
          }}
        >
          Film Detayına Git
        </Text>
      </Pressable>

      <Pressable onPress={toggleTheme}>
        <Text
          style={{
            color: colors.text,
            padding: 10,
            marginTop: 10,
          }}
        >
          {theme === 'dark' ? 'light' : 'dark'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default HomeScreen;
