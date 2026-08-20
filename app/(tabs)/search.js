import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import GenreChip from '../../components/GenreChip';
import useDebounce from '../../hooks/useDebounce';
import { buildUrl, ENDPOINTS } from '../../constants/api';

function SearchScreen() {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 500);

  function renderHeader() {
    return (
      <View>
        <FlatList
          data={[
            { id: 1, name: 'Aksiyon' },
            { id: 2, name: 'Macera' },
            { id: 3, name: 'Animasyon' },
          ]}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.genreList}
          renderItem={({ item }) => <GenreChip genre={item} />}
        />
      </View>
    );
  }

  useEffect(() => {
    if (debouncedQuery.length < 2) {
      setResults([]);
      return;
    }

    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = buildUrl(ENDPOINTS.SEARCH_MOVIE, { query: debouncedQuery });

        const response = await fetch(url);
        const data = await response.json();

        setResults(data.results || []);
      } catch (error) {
        setError('Arama sırasında bir hata oluştu!');
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Ara</Text>
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => <MovieCard movie={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Fonts.sizes.title,
    fontWeight: Fonts.weights.bold,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  genreList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    gap: 12
  },
});

export default SearchScreen;
