import { Text, View, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';

export default function ActorCard({ horizontal }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Image
        source={{
          uri: 'https://media.themoviedb.org/t/p/w138_and_h175_face/kEoUZKEG7dzbCESDjd0CKAN1r0n.jpg',
        }}
        style={styles.photo}
      />
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>Keanu Reeves</Text>
      <Text style={[styles.character, { color: colors.textSecondary }]} numberOfLines={1}>
        Neo
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8
  },
  photo: {
    width: 100,
    height: 120,
  },
  name: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    textAlign: 'center',
    marginTop: 6,
  },
  character: {
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
  },
});
