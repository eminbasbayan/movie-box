import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Counter from '../../components/Counter';

function HomeScreen() {
  const router = useRouter();

  function handlePress() {
    router.push('/movie/456');
    /* console.log("Tıklandı!"); */
  }

  return (
    <>
      <Text>Home Screen</Text>
      <Pressable onPress={handlePress}>
        <Text>Film Detayına Git</Text>
      </Pressable>
      <Counter />
    </>
  );
}

export default HomeScreen;
