import { useRouter } from 'expo-router';
import { Pressable, Text, StyleSheet } from 'react-native';
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

      <Text style={styles.redText}>Hi!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  redText: {
    color: 'red',
    padding: 10,
    backgroundColor: "blue"
  },
});

export default HomeScreen;
