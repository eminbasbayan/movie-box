import { Text, View } from 'react-native';
import { Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';

export default function MovieCard() {
  const { colors } = useTheme();
  const handlePress = () => {};

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.container,
        {
          width: 150,
          backgroundColor: colors.card,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Image
        source={{
          uri: 'https://image.tmdb.org/t/p/w600_and_h900_face/dQgIcW6Th08kMRf2HBoYWoFE6OD.jpg',
        }}
        style={[styles.poster, { height: 225 }]}
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
    width: 32,
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
