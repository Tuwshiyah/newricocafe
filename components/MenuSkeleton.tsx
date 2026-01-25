import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '@/constants/theme';

const { width } = Dimensions.get('window');

function SkeletonBox({ style }: { style: any }) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.3 + shimmer.value * 0.3,
  }));

  return (
    <Animated.View style={[styles.skeleton, style, animatedStyle]} />
  );
}

export default function MenuSkeleton() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.header}>
        <SkeletonBox style={styles.logoSkeleton} />
        <SkeletonBox style={styles.titleSkeleton} />
      </View>

      <View style={styles.categoriesSection}>
        <View style={styles.categoriesRow}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonBox key={i} style={styles.categorySkeleton} />
          ))}
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <SkeletonBox style={styles.sectionTitleSkeleton} />
      </View>

      <View style={styles.itemsGrid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} style={styles.itemWrapper}>
            <SkeletonBox style={styles.itemSkeleton} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skeleton: {
    backgroundColor: colors.surfaceLight,
    borderRadius: 8,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.md,
  },
  logoSkeleton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  titleSkeleton: {
    width: 200,
    height: 30,
    borderRadius: 8,
  },
  categoriesSection: {
    paddingVertical: spacing.xl,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  categorySkeleton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  sectionHeader: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  sectionTitleSkeleton: {
    width: 150,
    height: 28,
    borderRadius: 8,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  itemWrapper: {
    width: (width - spacing.md * 2 - spacing.sm) / 2,
  },
  itemSkeleton: {
    height: 120,
    borderRadius: 10,
  },
});
