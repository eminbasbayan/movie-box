import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';

export default function GenreChip({ genre }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => {}}
      style={[
        styles.chip,
        { backgroundColor: colors.primary, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.label, { color: '#fff' }]}>{genre.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
  },
});
