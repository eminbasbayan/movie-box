import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import GenreChip from '../../components/GenreChip';

function FavoritesScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Favoriler</Text>
      <Text style={[styles.count, { color: colors.textSecondary }]}>1 film</Text>
      
      <FlatList
        data={[
          { id: 1, name: 'Movie 1' },
          { id: 2, name: 'Movie 2' },
          { id: 3, name: 'Movie 3' },
        ]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => <MovieCard />}
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
    flexGrow: 1
  },
  row: {
    justifyContent: 'space-between',
  },
  count:{
    fontSize: Fonts.sizes.md,
    paddingHorizontal: 16,
    marginBottom: 12
  }
});

export default FavoritesScreen;
