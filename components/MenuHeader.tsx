import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '@/constants/theme';

export default function MenuHeader() {
  return (
    <LinearGradient
      colors={[colors.surfaceLight, 'transparent']}
      style={styles.container}
    >
      <Animated.View
        entering={FadeInDown.duration(500).delay(50)}
        style={styles.logoContainer}
      >
        <Image
          source={{ uri: 'https://5t9xqak19k.ucarecd.net/b58957ef-ec04-4833-91ab-55ad28816b2a/159165430_1741559956025769_4054588071265487430_ncopie.webp' }}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(100)}>
        <Text style={styles.subtitle}>Notre Selection</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(500).delay(150)}>
        <Text style={styles.title}>MENU</Text>
      </Animated.View>

      <Animated.View
        style={styles.decorLine}
        entering={FadeInDown.duration(500).delay(200)}
      >
        <LinearGradient
          colors={['transparent', colors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.lineGradient}
        />
        <View style={styles.diamondOuter}>
          <View style={styles.diamond} />
        </View>
        <LinearGradient
          colors={[colors.accent, 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.lineGradient}
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: -spacing.md,
  },
  logo: {
    width: 120,
    height: 120,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontFamily: 'PlayfairDisplay-Bold',
    letterSpacing: 2,
    textShadowColor: 'rgba(201, 168, 108, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  decorLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    width: '60%',
  },
  lineGradient: {
    flex: 1,
    height: 1,
  },
  diamondOuter: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: spacing.sm,
  },
  diamond: {
    width: 6,
    height: 6,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
  },
  });
