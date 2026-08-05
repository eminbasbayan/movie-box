import { Pressable, Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import MovieCard from '../../components/MovieCard';
import { buildUrl, ENDPOINTS } from '../../constants/api';
import useMovies from '../../hooks/useMovies';

function MovieSection({ title, movies, loading, error }) {
  const { colors } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      <FlatList
        data={movies.slice(0, 10)}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => <MovieCard horizontal movie={item} />}
      />
    </View>
  );
}

function HomeScreen() {
  const { theme, colors, toggleTheme } = useTheme();

  const trending = useMovies(ENDPOINTS.TRENDING_MOVIES);
  const popularTV = useMovies(ENDPOINTS.POPULAR_TV);
  const topRated = useMovies(ENDPOINTS.TOP_RATED_MOVIES);
  const upcoming = useMovies(ENDPOINTS.UPCOMING_MOVIES);

  const sections = [
    {
      key: 'trending',
      title: 'Trend Filmler',
      movies: trending.movies,
      loading: trending.loading,
      error: trending.error,
    },
    {
      key: 'popular-tv',
      title: 'Popüler Diziler',
      movies: popularTV.movies,
      loading: popularTV.loading,
      error: popularTV.error,
    },
    {
      key: 'top-rated',
      title: 'En Yüksek Puanlı',
      movies: topRated.movies,
      loading: topRated.loading,
      error: topRated.error,
    },
    {
      key: 'upcoming',
      title: 'Yakında Vizyonda',
      movies: upcoming.movies,
      loading: upcoming.loading,
      error: upcoming.error,
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={sections}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.contenContainer}
        ListHeaderComponent={
          <View style={styles.header}>
            <View>
              <Text style={[styles.appTitle, { color: colors.primary }]}>
                MovieBox
              </Text>
              <Text style={[styles.subTitle, { color: colors.textSecondary }]}>
                Filmleri Keşfedin
              </Text>
            </View>
            <Pressable onPress={toggleTheme} style={styles.themeButton}>
              <Ionicons
                name={theme === 'dark' ? 'sunny' : 'moon'}
                size={24}
                color={colors.text}
              />
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <MovieSection
            title={item.title}
            movies={item.movies}
            loading={item.loading}
            error={item.error}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contenContainer: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  appTitle: {
    fontSize: Fonts.sizes.title,
    fontWeight: Fonts.weights.bold,
  },
  subTitle: {
    fontSize: Fonts.sizes.md,
    marginTop: 2,
  },
  themeButton: {
    padding: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  horizontalList: {
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
