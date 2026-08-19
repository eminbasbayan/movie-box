import { Text, View, StyleSheet, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';
import { IMAGE_SIZES } from '../constants/api';

export default function ActorCard({ actor }) {
  const { colors } = useTheme();

  const profileUrl = actor.profile_path
    ? `${IMAGE_SIZES.profile.medium}${actor.profile_path}`
    : null;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {profileUrl ? (
        <Image
          source={{
            uri: profileUrl,
          }}
          style={styles.photo}
        />
      ) : (
        <View
          style={[
            styles.photo,
            styles.noPhoto,
            { backgroundColor: colors.surface },
          ]}
        >
          <Text style={[styles.noPhotoText, { color: colors.textMuted }]}>
            ?
          </Text>
        </View>
      )}
      <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
        {actor.name}
      </Text>
      <Text
        style={[styles.character, { color: colors.textSecondary }]}
        numberOfLines={1}
      >
        {actor.character}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: 8,
  },
  photo: {
    width: 100,
    height: 120,
  },
  noPhoto: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPhotoText: {
    fontSize: 28,
  },
  name: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    textAlign: 'center',
    marginTop: 6,
  },
  character: {
    fontSize: Fonts.sizes.xs,
    textAlign: 'center',
  },
});
