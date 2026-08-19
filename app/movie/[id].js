import { useLocalSearchParams } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Image,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import ActorCard from '../../components/ActorCard';
import MovieCard from '../../components/MovieCard';
import { buildUrl, ENDPOINTS, IMAGE_SIZES } from '../../constants/api';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorState from '../../components/ErrorState';

async function fetchMovieBundle(id, type) {
  const isTV = type === 'tv';
  const detailEndpoint = isTV
    ? ENDPOINTS.TV_DETAIL(id)
    : ENDPOINTS.MOVIE_DETAIL(id);
  const creditsEndpoint = isTV
    ? ENDPOINTS.TV_CREDITS(id)
    : ENDPOINTS.MOVIE_CREDITS(id);
  const similarEndpoint = isTV
    ? ENDPOINTS.TV_SIMILAR(id)
    : ENDPOINTS.MOVIE_SIMILAR(id);

  const [movieRes, creditsRes, similarRes] = await Promise.all([
    fetch(buildUrl(detailEndpoint)),
    fetch(buildUrl(creditsEndpoint)),
    fetch(buildUrl(similarEndpoint)),
  ]);

  const movieData = await movieRes.json();

  if (!movieRes.ok || movieData.success === false) {
    throw new Error(movieData.status_message || 'Film bilgileri alınamadı!');
  }

  const creditsData = creditsRes.ok ? await creditsRes.json() : { cast: [] };
  const similarData = similarRes.ok ? await similarRes.json() : { results: [] };

  return {
    movieData,
    creditsData,
    similarData,
  };
}

function MovieDetailScreen() {
  const { id, type = 'movie' } = useLocalSearchParams();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);

  console.log(movie);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isTV = type === 'tv';

  useEffect(() => {
    const loadMovieData = async () => {
      setLoading(true);
      setError(null);

      try {
        const { movieData, creditsData, similarData } = await fetchMovieBundle(
          id,
          type,
        );

        setMovie(movieData);
        setCredits(creditsData);
        setSimilar(similarData?.results || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadMovieData();
  }, [id, type]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const backdropUrl = movie?.backdrop_path
    ? `${IMAGE_SIZES.backdrop.large}${movie.backdrop_path}`
    : null;

  const posterUrl = movie?.poster_path
    ? `${IMAGE_SIZES.poster.large}${movie.poster_path}`
    : null;

  const title = isTV ? movie.name : movie.title;

  const releaseDate = isTV ? movie.first_air_date : movie.release_date;

  const runtime = isTV ? movie.episode_run_time?.[0] : movie.runtime;

  const formatRuntime = (minutes) => {
    if (!minutes) return '';

    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;

    return `${hour}s ${minute}dk`;
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={[
          styles.backdropContainer,
          !backdropUrl && { backgroundColor: colors.surface },
        ]}
      >
        {backdropUrl ? (
          <>
            <Image
              source={{
                uri: backdropUrl,
              }}
              style={[styles.backdrop, { width }]}
              resizeMode="cover"
            />
            <View style={styles.backdropOverlay} />
          </>
        ) : (
          <View style={[styles.backdrop, styles.backdropFallback, { width }]}>
            <Ionicons name="film-outline" size={52} color={colors.textMuted} />
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.posterRow}>
          {posterUrl ? (
            <Image
              source={{
                uri: posterUrl,
              }}
              style={styles.poster}
              resizeMode="cover"
            />
          ) : (
            <View
              style={[
                styles.poster,
                styles.posterFallback,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Ionicons
                name="image-outline"
                size={34}
                color={colors.textMuted}
              />
              <Text
                style={[styles.posterFallbackText, { color: colors.textMuted }]}
              >
                Görsel Yok
              </Text>
            </View>
          )}

          <View style={styles.infoColumn}>
            <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            <View style={styles.metaRow}>
              <View
                style={[styles.ratingBadge, { backgroundColor: colors.rating }]}
              >
                <Ionicons name="star" size={14} color="#000" />
                <Text style={styles.ratingText}>
                  {movie.vote_average?.toFixed(1)}
                </Text>
              </View>
              {isTV && movie.number_of_seasons && (
                <Text
                  style={[
                    styles.detailText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {movie.number_of_seasons} Sezon
                </Text>
              )}
            </View>
            <View style={styles.detailsRow}>
              {releaseDate && (
                <Text
                  style={[styles.detailText, { color: colors.textSecondary }]}
                >
                  {releaseDate.split('-')[0]}
                </Text>
              )}

              {runtime && (
                <Text
                  style={[styles.detailText, { color: colors.textSecondary }]}
                >
                  {formatRuntime(runtime)}
                  {isTV ? ' / bölüm' : ''}
                </Text>
              )}
            </View>
            <View style={styles.genreRow}>
              {movie.genres?.slice(0, 3).map((genre) => (
                <View
                  style={[styles.genreTag, { backgroundColor: colors.surface }]}
                  key={genre.id}
                >
                  <Text
                    style={[styles.genreText, { color: colors.textSecondary }]}
                  >
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
            <Pressable
              style={[
                styles.favoriteButton,
                { backgroundColor: colors.primary },
              ]}
            >
              <Ionicons name="heart" size={20} color="#fff" />
              <Text style={styles.favoriteButtonText}>Favorilere Ekle</Text>
            </Pressable>
          </View>
        </View>
        {movie.overview && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Özet
            </Text>
            <Text style={[styles.overview, { color: colors.textSecondary }]}>
              {movie.overview}
            </Text>
          </View>
        )}
        {credits?.cast?.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Oyuncu Kadrosu
            </Text>
            <FlatList
              data={credits.cast.slice(0, 15)}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => <ActorCard  actor={item} />}
            />
          </View>
        )}

        <View style={[styles.section, { marginBottom: 40 }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Benzer Filmler
          </Text>
          <FlatList
            data={[
              { id: 1, name: 'Movie 1' },
              { id: 2, name: 'Movie 2' },
              { id: 3, name: 'Movie 3' },
            ]}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <MovieCard horizontal />}
          />
        </View>
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
  backdropFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  backdropOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    padding: 16,
    marginTop: -30,
  },
  posterRow: {
    flexDirection: 'row',
    gap: 16,
  },
  poster: {
    width: 130,
    height: 195,
    borderRadius: 12,
  },
  posterFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  },
  posterFallbackText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
  },
  infoColumn: {
    paddingTop: 30,
    flex: 1,
  },
  title: {
    fontSize: Fonts.sizes.xxl,
    fontWeight: Fonts.weights.bold,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: '#000',
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 8,
  },
  detailText: {
    fontSize: Fonts.sizes.sm,
  },
  genreRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  genreTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    fontSize: Fonts.sizes.xs,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    marginBottom: 12,
  },
  overview: {
    fontSize: Fonts.sizes.md,
    lineHeight: 20,
  },
});

export default MovieDetailScreen;
