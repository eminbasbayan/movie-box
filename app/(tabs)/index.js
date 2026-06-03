import { Pressable, Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';

function MovieSection(props) {
  const { colors } = useTheme();
  return (
    <View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        {props.title}
      </Text>
      <FlatList
        data={[
          { id: 1, name: 'Movie 1' },
          { id: 2, name: 'Movie 2' },
          { id: 3, name: 'Movie 3' },
        ]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

function HomeScreen() {
  const { theme, colors, toggleTheme } = useTheme();

  const sections = [
    {
      key: 'trending',
      title: 'Trend Filmler',
    },
    {
      key: 'popular-tv',
      title: 'Popüler Diziler',
    },
    {
      key: 'top-rated',
      title: 'En Yüksek Puanlı',
    },
    {
      key: 'upcoming',
      title: 'Yakında Vizyonda',
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
        renderItem={({ item }) => <MovieSection title={item.title} />}
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
  sectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

export default HomeScreen;
