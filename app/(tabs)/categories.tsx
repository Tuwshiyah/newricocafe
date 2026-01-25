import { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, Image } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, ArrowLeft } from 'lucide-react-native';
import Svg, { Defs, Pattern, Circle, Rect } from 'react-native-svg';
import { colors, spacing } from '@/constants/theme';
import { supabase, Category } from '@/lib/supabase';
import { getOptimizedImageUrl } from '@/lib/imageUtils';
import MenuHeader from '@/components/MenuHeader';

const { width } = Dimensions.get('window');

interface CategoryWithCount extends Category {
  itemCount: number;
  imageUrl: string | null;
}

export default function CategoriesScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesResult, countsResult] = await Promise.all([
        supabase
          .from('menu_categories')
          .select('id, name, display_order, image_url')
          .order('display_order'),
        supabase
          .from('menu_items')
          .select('category_id')
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (countsResult.error) throw countsResult.error;

      const countMap = new Map<string, number>();
      (countsResult.data || []).forEach(item => {
        countMap.set(item.category_id, (countMap.get(item.category_id) || 0) + 1);
      });

      const categoriesWithCounts: CategoryWithCount[] = (categoriesResult.data || []).map(category => ({
        ...category,
        created_at: '',
        itemCount: countMap.get(category.id) || 0,
        imageUrl: category.image_url || null,
      }));

      setCategories(categoriesWithCounts);
    } catch (err) {
      setError('Impossible de charger les categories. Veuillez reessayer.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategoryPress = (categoryId: string) => {
    router.push({ pathname: '/menu', params: { categoryId } });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
          style={StyleSheet.absoluteFill}
        />
        <ActivityIndicator size="large" color={colors.accent} />
        <Text style={styles.loadingText}>Chargement des categories...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.splitBackground}>
        <View style={styles.leftBackground} />
        <View style={styles.rightBackground} />
      </View>

      <Svg
        height="100%"
        width="100%"
        style={styles.patternOverlay}
      >
        <Defs>
          <Pattern
            id="dots"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
          >
            <Circle cx="10" cy="10" r="1" fill="rgba(201, 168, 108, 0.08)" />
          </Pattern>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#dots)" />
      </Svg>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MenuHeader />

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeInDown.duration(400).delay(100 + index * 50)}
              style={styles.categoryCardWrapper}
            >
              <TouchableOpacity
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category.id)}
                activeOpacity={0.8}
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: getOptimizedImageUrl(category.imageUrl, 200) || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                    style={styles.categoryImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.categoryName} numberOfLines={2}>{category.name}</Text>
                  <Text style={styles.itemCount}>
                    {category.itemCount} {category.itemCount > 1 ? 'plats' : 'plat'}
                  </Text>
                </View>

                <View style={styles.arrowContainer}>
                  <ChevronRight size={20} color={colors.accent} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/')}
          activeOpacity={0.7}
        >
          <ArrowLeft size={20} color={colors.text} />
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>

        <View style={styles.footer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  splitBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  leftBackground: {
    width: '35%',
    backgroundColor: colors.background,
  },
  rightBackground: {
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  backButtonText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    marginTop: spacing.sm,
  },
  errorContainer: {
    margin: spacing.lg,
    padding: spacing.md,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    textAlign: 'center',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  categoryCardWrapper: {
    width: (width - spacing.md * 3) / 2,
  },
  categoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    borderWidth: 3,
    borderColor: colors.accent,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    color: colors.text,
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  itemCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  footer: {
    height: spacing.xxl,
  },
});
