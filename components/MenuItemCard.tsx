import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeInUp,
} from 'react-native-reanimated';
import { colors, spacing } from '@/constants/theme';
import { MenuItem } from '@/lib/supabase';
import { Star } from 'lucide-react-native';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onPress?: (item: MenuItem) => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function MenuItemCard({ item, index, onPress }: MenuItemCardProps) {
  const scale = useSharedValue(1);
  const isUnavailable = item.is_available === false;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!isUnavailable) {
      scale.value = withSpring(0.98, { damping: 15 });
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const handlePress = () => {
    if (!isUnavailable && onPress) {
      onPress(item);
    }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} F`;
  };

  return (
    <Animated.View
      style={styles.wrapper}
      entering={FadeInUp.delay(index * 40).duration(300).springify()}
    >
      <AnimatedPressable
        style={[styles.container, animatedStyle, isUnavailable && styles.unavailableContainer]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${formatPrice(item.price)}${isUnavailable ? ', indisponible' : ''}`}
        accessibilityHint={isUnavailable ? 'Cet article est actuellement indisponible' : 'Appuyez pour voir les details'}
      >
        {isUnavailable && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Indisponible</Text>
          </View>
        )}
        <View style={[styles.content, isUnavailable && styles.unavailableContent]}>
          <View style={styles.header}>
            <Text style={[styles.name, isUnavailable && styles.unavailableName]} numberOfLines={1}>{item.name}</Text>
            {item.is_featured && !isUnavailable && (
              <View style={styles.featuredBadge}>
                <Star size={10} color={colors.background} fill={colors.background} />
              </View>
            )}
          </View>
          <Text style={[styles.description, isUnavailable && styles.unavailableDescription]} numberOfLines={2}>
            {item.description}
          </Text>
        </View>
        <View style={styles.priceSection}>
          <View style={styles.dots} />
          <Text style={[styles.price, isUnavailable && styles.unavailablePrice]}>{formatPrice(item.price)}</Text>
        </View>
      </AnimatedPressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxWidth: '50%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 10,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  content: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 4,
  },
  name: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 0.2,
    flex: 1,
  },
  featuredBadge: {
    backgroundColor: colors.accent,
    padding: 4,
    borderRadius: 10,
  },
  description: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: 'Raleway-Regular',
    lineHeight: 15,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dots: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.border,
  },
  price: {
    color: colors.accent,
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    letterSpacing: 0.3,
  },
  unavailableContainer: {
    opacity: 0.6,
    borderColor: colors.border,
  },
  unavailableBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  unavailableText: {
    color: colors.text,
    fontSize: 9,
    fontFamily: 'Raleway-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unavailableContent: {
    opacity: 0.7,
  },
  unavailableName: {
    textDecorationLine: 'line-through',
  },
  unavailableDescription: {
    opacity: 0.6,
  },
  unavailablePrice: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
