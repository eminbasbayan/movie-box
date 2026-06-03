import {
  Text,
  View,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';

export default function MovieCard({ horizontal }) {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  const cardWidth = horizontal ? 150 : (width - 48) / 2;
  const posterHeight = horizontal ? 225 : cardWidth * 1.5;

  const handlePress = () => {};

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          width: cardWidth,
          backgroundColor: colors.card,
          opacity: pressed ? 0.8 : 1,
        },
        horizontal && styles.horizontalCard,
      ]}
    >
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w600_and_h900_face/dQgIcW6Th08kMRf2HBoYWoFE6OD.jpg',
        }}
        style={[styles.poster, { height: posterHeight }]}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]}>Saplantı</Text>
        <View style={styles.raingRow}>
          <View
            style={[styles.ratingBadge, { backgroundColor: colors.rating }]}
          >
            <Text style={styles.ratingText}>7.5</Text>
          </View>
          <Text style={[styles.year, { color: colors.textSecondary }]}>
            2025
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBlock: 16,
  },
  horizontalCard: {
    marginRight: 12,
    marginBottom: 0,
  },
  poster: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  info: {
    padding: 8,
  },
  title: {
    fontSize: Fonts.sizes.md,
    fontWeight: Fonts.weights.semibold,
    marginBottom: 4,
  },
  raingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ratingBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: '#000',
  },
  year: {
    fontSize: Fonts.sizes.sm,
  },
});
