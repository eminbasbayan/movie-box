import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import GenreChip from '../../components/GenreChip';

function SearchScreen() {
  const { colors } = useTheme();

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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Ara</Text>
      <SearchBar />
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
        ListHeaderComponent={renderHeader}
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
  },
  genreList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default SearchScreen;
