import { Pressable, Text, StyleSheet, FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import Fonts from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';

function HomeScreen() {
  const { theme, colors, toggleTheme } = useTheme();


  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <FlatList
        data={[
          { key: 1, title: 'Movie 1' },
          { key: 2, title: 'Movie 2' },
          { key: 3, title: 'Movie 3' },
        ]}
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
              <Ionicons name={theme === "dark" ? "sunny" : "moon"} size={24} color={colors.text} />
            </Pressable>
          </View>
        }
        renderItem={({item})=>(
          <View>
            <Text> {item.title} </Text>
          </View>
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
    padding: 8
  }
});

export default HomeScreen;
