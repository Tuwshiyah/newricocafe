import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions, TouchableOpacity, RefreshControl } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, Pattern, Circle, Rect } from 'react-native-svg';
import { colors, spacing } from '@/constants/theme';
import { supabase, Category, MenuItem } from '@/lib/supabase';
import MenuHeader from '@/components/MenuHeader';
import CategoryTab from '@/components/CategoryTab';
import MenuItemCard from '@/components/MenuItemCard';
import MenuSkeleton from '@/components/MenuSkeleton';
import ItemDetailModal from '@/components/ItemDetailModal';

const CATEGORY_ITEM_WIDTH = 90;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MenuScreen() {
  const router = useRouter();
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();
  const categoriesScrollRef = useRef<ScrollView>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesResult, itemsResult] = await Promise.all([
        supabase
          .from('menu_categories')
          .select('id, name, display_order, image_url')
          .order('display_order'),
        supabase
          .from('menu_items')
          .select('id, category_id, name, description, price, is_featured, is_available, display_order')
          .order('display_order')
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (itemsResult.error) throw itemsResult.error;

      const cats = (categoriesResult.data || []).map(c => ({ ...c, created_at: '' })) as Category[];
      const items = (itemsResult.data || []).map(i => ({ ...i, image_url: '', created_at: '' })) as MenuItem[];

      setCategories(cats);
      setMenuItems(items);

      if (cats.length > 0 && !selectedCategory) {
        setSelectedCategory(categoryId || cats[0].id);
      }
    } catch (err) {
      setError('Impossible de charger le menu. Veuillez reessayer.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }, [fetchData]);

  const handleItemPress = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const scrollToCategory = useCallback((catId: string) => {
    const index = categories.findIndex(c => c.id === catId);
    if (index >= 0 && categoriesScrollRef.current) {
      const itemPosition = index * CATEGORY_ITEM_WIDTH;
      const centerOffset = (SCREEN_WIDTH - CATEGORY_ITEM_WIDTH) / 2 - spacing.lg;
      const scrollX = Math.max(0, itemPosition - centerOffset);
      categoriesScrollRef.current.scrollTo({ x: scrollX, animated: true });
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory && categories.length > 0 && !loading) {
      setTimeout(() => scrollToCategory(selectedCategory), 300);
    }
  }, [selectedCategory, categories, loading, scrollToCategory]);

  const filteredItems = useMemo(() =>
    menuItems.filter(item => item.category_id === selectedCategory),
    [menuItems, selectedCategory]
  );

  const { selectedCategoryName, itemCount } = useMemo(() => {
    const cat = categories.find(c => c.id === selectedCategory);
    return { selectedCategoryName: cat?.name || '', itemCount: filteredItems.length };
  }, [categories, selectedCategory, filteredItems.length]);

  if (loading && !refreshing) {
    return <MenuSkeleton />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.backgroundGradientStart, colors.backgroundGradientEnd]}
        style={StyleSheet.absoluteFill}
      />

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

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
        ListHeaderComponent={
          <>
            <MenuHeader />

            <Animated.View
              entering={FadeInDown.duration(400).delay(100)}
              style={styles.categoriesSection}
            >
                <View style={styles.categoriesHeader}>
                  <View style={styles.categoriesLine} />
                  <Text style={styles.categoriesTitle}>Categories</Text>
                  <View style={styles.categoriesLine} />
                </View>

                <ScrollView
                  ref={categoriesScrollRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesScroll}
                >
                  <View style={styles.categoriesGrid}>
                    {categories.map((category, index) => (
                      <Animated.View
                        key={category.id}
                        entering={FadeInDown.duration(300).delay(150 + index * 50)}
                        style={styles.categoryGridItem}
                      >
                        <CategoryTab
                          category={category}
                          isActive={selectedCategory === category.id}
                          onPress={() => setSelectedCategory(category.id)}
                        />
                      </Animated.View>
                    ))}
                  </View>
                </ScrollView>
            </Animated.View>

            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Animated.View
              key={selectedCategory}
              style={styles.sectionHeader}
              entering={FadeIn.duration(300)}
            >
              <View style={styles.sectionTitleContainer}>
                <View style={styles.sectionLineLeft}>
                  <LinearGradient
                    colors={['transparent', colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientLine}
                  />
                </View>
                <View style={styles.sectionTitleWrapper}>
                  <Text style={styles.sectionTitle}>{selectedCategoryName}</Text>
                  <Text style={styles.itemCount}>{itemCount} {itemCount > 1 ? 'Plats' : 'Plat'}</Text>
                </View>
                <View style={styles.sectionLineRight}>
                  <LinearGradient
                    colors={[colors.accent, 'transparent']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientLine}
                  />
                </View>
              </View>
            </Animated.View>
          </>
        }
        renderItem={({ item, index }) => (
          <MenuItemCard item={item} index={index} onPress={handleItemPress} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Text style={styles.emptyIcon}>~</Text>
            </View>
            <Text style={styles.emptyTitle}>Aucun article</Text>
            <Text style={styles.emptyText}>Cette categorie est vide pour le moment</Text>
          </View>
        }
        ListFooterComponent={
          <>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.push('/categories')}
              activeOpacity={0.7}
            >
              <ArrowLeft size={20} color={colors.text} />
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
            <View style={styles.footer} />
          </>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
        initialNumToRender={6}
      />

      <ItemDetailModal
        item={selectedItem}
        visible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
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
  categoriesSection: {
    paddingBottom: spacing.sm,
    marginTop: -spacing.md,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  categoriesLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  categoriesTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: 'Raleway-SemiBold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginHorizontal: spacing.md,
  },
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxHeight: 200,
    gap: 0,
  },
  categoryGridItem: {
    width: 90,
  },
  sectionHeader: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionLineLeft: {
    flex: 1,
    height: 1,
  },
  sectionLineRight: {
    flex: 1,
    height: 1,
  },
  gradientLine: {
    flex: 1,
    height: 1,
  },
  sectionTitleWrapper: {
    alignItems: 'center',
    marginHorizontal: spacing.lg,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    textTransform: 'uppercase',
    letterSpacing: 3,
    textAlign: 'center',
  },
  itemCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    marginTop: spacing.xs,
  },
  row: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  footer: {
    height: spacing.xxl,
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
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  emptyIcon: {
    fontSize: 32,
    color: colors.accent,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    fontFamily: 'Raleway-Regular',
  },
});
