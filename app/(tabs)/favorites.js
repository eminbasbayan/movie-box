import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import MovieCard from '../../components/MovieCard';
import SearchBar from '../../components/SearchBar';
import GenreChip from '../../components/GenreChip';
import { useFavorites } from '../../context/FavoritesContext';

function FavoritesScreen() {
  const {favorites} = useFavorites()
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Favorilerim</Text>
      <Text style={[styles.count, { color: colors.textSecondary }]}>{favorites.length} film</Text>
      
      <FlatList
        data={favorites}
        keyExtractor={(item, index) => item.id?.toString() || `fav-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <View>
            <Text style={{color: "#fff"}}>Favorilerde hiç film yok!</Text>
          </View>
        }
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
