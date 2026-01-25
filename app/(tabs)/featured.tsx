import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '@/constants/theme';
import { supabase, MenuItem } from '@/lib/supabase';
import { Star } from 'lucide-react-native';
import MenuItemCard from '@/components/MenuItemCard';

export default function FeaturedScreen() {
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_featured', true)
        .order('display_order');

      if (fetchError) throw fetchError;

      setFeaturedItems(data || []);
    } catch (err) {
      setError('Unable to load featured items.');
      console.error('Error fetching featured items:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedItems();
  }, [fetchFeaturedItems]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={featuredItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <LinearGradient
            colors={['#2a2a2a', colors.background]}
            style={styles.header}
          >
            <Animated.View
              entering={FadeInDown.duration(600).delay(100)}
              style={styles.iconContainer}
            >
              <Star size={40} color={colors.accent} fill={colors.accent} />
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.duration(600).delay(200)}
              style={styles.title}
            >
              OUR FAVOURITES
            </Animated.Text>

            <Animated.View
              style={styles.decorLine}
              entering={FadeInDown.duration(600).delay(300)}
            >
              <View style={styles.line} />
              <View style={styles.diamond} />
              <View style={styles.line} />
            </Animated.View>

            <Animated.Text
              entering={FadeInDown.duration(600).delay(400)}
              style={styles.subtitle}
            >
              Chef's special selection
            </Animated.Text>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </LinearGradient>
        }
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <MenuItemCard item={item} index={index} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No featured items yet</Text>
            <Text style={styles.emptySubtext}>Check back soon for our specials!</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
  },
  decorLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: colors.accent,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    ...typography.body,
    letterSpacing: 1,
  },
  itemContainer: {
    paddingHorizontal: spacing.lg,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  errorContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    ...typography.body,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    ...typography.body,
  },
  emptySubtext: {
    color: colors.textMuted,
    ...typography.caption,
    marginTop: spacing.sm,
  },
});
