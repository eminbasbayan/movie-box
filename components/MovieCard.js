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
import { useRouter } from 'expo-router';
import { IMAGE_SIZES } from '../constants/api';

export default function MovieCard({ movie, horizontal = false, mediaType }) {
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const cardWidth = horizontal ? 150 : (width - 48) / 2;
  const posterHeight = horizontal ? 225 : cardWidth * 1.5;

  const posterUrl = movie?.poster_path
    ? `${IMAGE_SIZES.poster.medium}${movie.poster_path}`
    : null;

  const type =
    movie?.media_type || mediaType || (movie?.title ? 'movie' : 'tv');

  const handlePress = () => {
    router.push(`/movie/${movie?.id}?type=${type}`);
  };

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
      {posterUrl ? (
        <Image
          source={{
            uri: posterUrl,
          }}
          style={[styles.poster, { height: posterHeight }]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[
            styles.poster,
            styles.noPoster,
            { height: posterHeight, backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.noPosterText, { color: colors.textMuted }]}>
            Görsel Yok
          </Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {movie?.title || movie?.name}
        </Text>
        <View style={styles.raingRow}>
          <View
            style={[styles.ratingBadge, { backgroundColor: colors.rating }]}
          >
            <Text style={styles.ratingText}>
              {movie?.vote_average?.toFixed(2)}
            </Text>
          </View>
          <Text style={[styles.year, { color: colors.textSecondary }]}>
            {(movie?.release_data || movie?.first_air_date || '').split('-')[0]}
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
  noPoster: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterText: {
    fontSize: Fonts.sizes.sm,
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
