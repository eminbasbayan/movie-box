import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Fonts from '../constants/fonts';

const ErrorState = ({
  title = 'Bir hata oluştu!',
  message = 'Lütfen tekrar deneyin',
  containerStyle,
}) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <Ionicons name="alert-circle-outline" size={64} color={colors.error} />
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontsize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.semibold,
    marginTop: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: Fonts.sizes.md,
    marginTop: 8,
    lineHeight: 22,
    textAlign: 'center',
  },
});

export default ErrorState;
