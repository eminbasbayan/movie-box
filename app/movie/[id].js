import { useLocalSearchParams } from 'expo-router';
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Image } from 'expo-image';

function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  console.log(id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[styles.backdropContainer, { backgroundColor: colors.surface }]}
      >
        <Image
          source={{
            uri: 'https://media.themoviedb.org/t/p/w533_and_h300_face/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg',
          }}
          style={[styles.backdrop, { width }]}
          resizeMode="cover"
        />
        <View style={styles.backdropOverlay} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdropContainer: {
    position: 'relative',
  },
  backdrop: {
    height: 250,
  },

  backdropOverlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});

export default MovieDetailScreen;
