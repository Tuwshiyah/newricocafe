import { View, Text, StyleSheet, Modal, Pressable, ScrollView } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { X, Star, Check, AlertCircle } from 'lucide-react-native';
import { colors, spacing } from '@/constants/theme';
import { MenuItem } from '@/lib/supabase';
import { BlurView } from 'expo-blur';

interface ItemDetailModalProps {
  item: MenuItem | null;
  visible: boolean;
  onClose: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ItemDetailModal({ item, visible, onClose }: ItemDetailModalProps) {
  if (!item) return null;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} F`;
  };

  const isUnavailable = item.is_available === false;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
          style={StyleSheet.absoluteFill}
        >
          <Pressable style={styles.backdrop} onPress={onClose}>
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          </Pressable>
        </Animated.View>

        <Animated.View
          entering={SlideInDown.springify().damping(20)}
          exiting={SlideOutDown.springify().damping(20)}
          style={styles.modalContainer}
        >
          <View style={styles.handle} />

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Fermer"
          >
            <X size={24} color={colors.text} />
          </Pressable>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.header}>
              {item.is_featured && (
                <View style={styles.featuredBadge}>
                  <Star size={14} color={colors.background} fill={colors.background} />
                  <Text style={styles.featuredText}>Recommande</Text>
                </View>
              )}

              {isUnavailable && (
                <View style={styles.unavailableBadge}>
                  <AlertCircle size={14} color={colors.text} />
                  <Text style={styles.unavailableText}>Indisponible</Text>
                </View>
              )}

              <Text style={[styles.name, isUnavailable && styles.nameUnavailable]}>
                {item.name}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={[styles.price, isUnavailable && styles.priceUnavailable]}>
                  {formatPrice(item.price)}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>
                {item.description || 'Aucune description disponible.'}
              </Text>
            </View>

            {!isUnavailable && (
              <View style={styles.availabilitySection}>
                <View style={styles.availabilityBadge}>
                  <Check size={16} color={colors.success} />
                  <Text style={styles.availabilityText}>Disponible</Text>
                </View>
              </View>
            )}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    minHeight: 300,
    borderWidth: 1,
    borderColor: colors.border,
    borderBottomWidth: 0,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.textMuted,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.sm,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: spacing.md,
  },
  featuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  featuredText: {
    color: colors.background,
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
  },
  unavailableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  unavailableText: {
    color: colors.text,
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontFamily: 'Raleway-Bold',
    marginBottom: spacing.sm,
  },
  nameUnavailable: {
    opacity: 0.5,
    textDecorationLine: 'line-through',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.accent,
    fontSize: 28,
    fontFamily: 'Raleway-Bold',
  },
  priceUnavailable: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
  descriptionSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: 'Raleway-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    lineHeight: 24,
  },
  availabilitySection: {
    marginBottom: spacing.xl,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  availabilityText: {
    color: colors.success,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
  },
});
