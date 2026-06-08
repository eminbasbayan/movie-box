import { useLocalSearchParams } from 'expo-router';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Image } from 'expo-image';
import Fonts from '../../constants/fonts';
import { Ionicons } from '@expo/vector-icons';
import ActorCard from '../../components/ActorCard';
import MovieCard from '../../components/MovieCard';

function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  console.log(id);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[styles.backdropContainer, { backgroundColor: colors.surface }]}
      >
        <Image
          source={{
            uri: 'https://media.themoviedb.org/t/p/w533_and_h300_face/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg',
          }}
          style={[styles.backdrop, { width }]}
          resizeMode="cover"
        />
        <View style={styles.backdropOverlay} />
      </View>

      <View style={styles.content}>
        <View style={styles.posterRow}>
          <Image
            source={{
              uri: 'https://image.tmdb.org/t/p/w600_and_h900_face/gmZiGUwRyiTzGMTStgeo1a5xRpu.jpg',
            }}
            style={styles.poster}
            resizeMode="cover"
          />

          <View style={styles.infoColumn}>
            <Text style={[styles.title, { color: colors.text }]}>Matrix</Text>
            <View style={styles.metaRow}>
              <View
                style={[styles.ratingBadge, { backgroundColor: colors.rating }]}
              >
                <Ionicons name="star" size={14} color="#000" />
                <Text style={styles.ratingText}>8.2</Text>
              </View>
            </View>
            <View style={styles.detailsRow}>
              <Text
                style={[styles.detailText, { color: colors.textSecondary }]}
              >
                1999
              </Text>
              <Text
                style={[styles.detailText, { color: colors.textSecondary }]}
              >
                2s 16dk
              </Text>
            </View>
            <View style={styles.genreRow}>
              <View
                style={[styles.genreTag, { backgroundColor: colors.surface }]}
              >
                <Text
                  style={[styles.genreText, { color: colors.textSecondary }]}
                >
                  Aksiyon
                </Text>
              </View>
              <View
                style={[styles.genreTag, { backgroundColor: colors.surface }]}
              >
                <Text
                  style={[styles.genreText, { color: colors.textSecondary }]}
                >
                  Bilim-Kurgu
                </Text>
              </View>
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

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Özet
          </Text>
          <Text style={[styles.overview, { color: colors.textSecondary }]}>
            Bir bilgisayar programcısı olan Thomas Anderson aynı zamanda Neo
            takma isimli çok usta bir bilgisayar korsanıdır. Ancak siyah takım
            elbiseli ve gözlüklü adamların yakın takibindedir. Bu takibin
            nedenini ise karşılaşacağı Morpheus`dan öğrenecektir. Neo, birden
            kendini Morpheus`un anlattıklarına güvenmek zorunda kaldığı büyük
            bir komplonun içinde bulacaktır. İçinde yaşadığımızı sandığımız bu
            dünya tamamiyle aldatıcıdır. Tüm insanlık aslında uzaydan gelen
            yaratıkların köleleridir. Neo, Trinity ve Morpheus`un da yardımıyla
            kendilerini bu düzeni yıkmaya adayan bir grubun içine katılır.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Oyuncu Kadrosu
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
            renderItem={({ item }) => <ActorCard horizontal />}
          />
        </View>

        <View style={[styles.section, {marginBottom: 40}]}>
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
