import { View, Text, StyleSheet, Pressable, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { colors, spacing } from '@/constants/theme';
import VideoBackground from '@/components/VideoBackground';
import { useEffect } from 'react';
import Svg, { Defs, Pattern, Rect, Circle } from 'react-native-svg';

const VIDEO_URL = 'https://res.cloudinary.com/dmeochivw/video/upload/v1769199614/man-enjoying-a-delicious-hamburger-with-fresh-ingr-2026-01-20-16-40-57-utc_pqsjaq.mp4';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const shimmerTranslate = useSharedValue(-300);

  useEffect(() => {
    shimmerTranslate.value = withRepeat(
      withTiming(300, {
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shimmerTranslate.value }],
    };
  });

  const handleViewMenu = () => {
    router.push('/(tabs)/categories');
  };

  return (
    <VideoBackground source={VIDEO_URL}>
      <Svg
        height="100%"
        width="100%"
        style={styles.patternOverlay}
      >
        <Defs>
          <Pattern
            id="dots"
            patternUnits="userSpaceOnUse"
            width="10"
            height="10"
          >
            <Circle cx="5" cy="5" r="1.5" fill="rgba(0, 0, 0, 0.4)" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#dots)" />
        <Rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" />
      </Svg>
      <View style={styles.content}>
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.logoContainer}
        >
            <Image
              source={{ uri: 'https://5t9xqak19k.ucarecd.net/b58957ef-ec04-4833-91ab-55ad28816b2a/159165430_1741559956025769_4054588071265487430_ncopie.webp' }}
              style={styles.logo}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.duration(800).delay(400)}
            style={styles.menuTitle}
          >
            MENU
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.duration(600).delay(500)}
            style={styles.tagline}
          >
            Manger avec amour
          </Animated.Text>

          <Animated.View
            entering={FadeInUp.duration(800).delay(600)}
            style={styles.imageContainer}
          >
            <Image
              source={{ uri: 'https://res.cloudinary.com/dmeochivw/image/upload/v1769199576/N2HMMGN-2_m2k75y.png' }}
              style={styles.foodImage}
              resizeMode="contain"
            />
            <Pressable
              style={({ pressed }) => [
                styles.badgeContainer,
                pressed && styles.badgePressed,
              ]}
              onPress={handleViewMenu}
            >
              <View style={styles.badge}>
                <Animated.View style={[styles.shimmer, shimmerStyle]} />
                <Text style={styles.badgeText}>Voir le menu</Text>
              </View>
            </Pressable>
          </Animated.View>
      </View>
    </VideoBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  patternOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  logoContainer: {
    marginBottom: -40,
  },
  logo: {
    width: 240,
    height: 240,
  },
  restaurantSubtitle: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 2,
    marginTop: -35,
    marginBottom: 4,
    fontFamily: 'Raleway-Bold',
  },
  menuTitle: {
    color: colors.text,
    fontSize: 64,
    fontFamily: 'PlayfairDisplay-Black',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    color: '#E5E5E5',
    fontSize: 28,
    letterSpacing: 0,
    marginTop: -spacing.xs,
    marginBottom: spacing.lg,
    fontFamily: 'DancingScript-Bold',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    position: 'relative',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md,
    borderRadius: 30,
    transform: [{ rotate: '-3deg' }],
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: [{ skewX: '-20deg' }],
  },
  badgeText: {
    color: colors.background,
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  badgePressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
