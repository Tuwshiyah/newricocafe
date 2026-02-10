import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { colors, spacing } from '@/constants/theme';
import { supabase, Category, MenuItem } from '@/lib/supabase';
import MenuHeader from '@/components/MenuHeader';
import CategoryTab from '@/components/CategoryTab';
import MenuItemCard from '@/components/MenuItemCard';
import MenuSkeleton from '@/components/MenuSkeleton';
import ItemDetailModal from '@/components/ItemDetailModal';

export default function MenuPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('categoryId') || undefined;
  const categoriesScrollRef = useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryId || null);
  const [loading, setLoading] = useState(true);
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
          .order('display_order'),
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (itemsResult.error) throw itemsResult.error;

      const cats = (categoriesResult.data || []).map((c) => ({ ...c, created_at: '' })) as Category[];
      const items = (itemsResult.data || []).map((i) => ({
        ...i,
        image_url: '',
        created_at: '',
      })) as MenuItem[];

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

  useEffect(() => {
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
  }, [categoryId]);

  const scrollToCategory = useCallback(
    (catId: string) => {
      const index = categories.findIndex((c) => c.id === catId);
      if (index >= 0 && categoriesScrollRef.current) {
        const itemPosition = index * 90;
        const containerWidth = categoriesScrollRef.current.offsetWidth;
        const centerOffset = (containerWidth - 90) / 2 - spacing.lg;
        const scrollX = Math.max(0, itemPosition - centerOffset);
        categoriesScrollRef.current.scrollTo({ left: scrollX, behavior: 'smooth' });
      }
    },
    [categories]
  );

  useEffect(() => {
    if (selectedCategory && categories.length > 0 && !loading) {
      setTimeout(() => scrollToCategory(selectedCategory), 300);
    }
  }, [selectedCategory, categories, loading, scrollToCategory]);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category_id === selectedCategory),
    [menuItems, selectedCategory]
  );

  const { selectedCategoryName, itemCount } = useMemo(() => {
    const cat = categories.find((c) => c.id === selectedCategory);
    return { selectedCategoryName: cat?.name || '', itemCount: filteredItems.length };
  }, [categories, selectedCategory, filteredItems.length]);

  const handleItemPress = useCallback((item: MenuItem) => {
    setSelectedItem(item);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  if (loading) {
    return <MenuSkeleton />;
  }

  return (
    <div className="page">
      <div className="gradient-bg" />
      <div className="dot-pattern" />

      <div style={styles.scrollContent}>
        <MenuHeader />

        {/* Categories section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={styles.categoriesSection}
        >
          <div style={styles.categoriesHeader}>
            <div style={styles.categoriesLine} />
            <span style={styles.categoriesTitle}>Categories</span>
            <div style={styles.categoriesLine} />
          </div>

          <div ref={categoriesScrollRef} style={styles.categoriesScroll}>
            <div style={styles.categoriesGrid}>
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                  style={styles.categoryGridItem}
                >
                  <CategoryTab
                    category={category}
                    isActive={selectedCategory === category.id}
                    onPress={() => setSelectedCategory(category.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        {/* Section header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={styles.sectionHeader}
          >
            <div style={styles.sectionTitleContainer}>
              <div className="gradient-line-left" />
              <div style={styles.sectionTitleWrapper}>
                <h2 style={styles.sectionTitle}>{selectedCategoryName}</h2>
                <p style={styles.itemCountText}>
                  {itemCount} {itemCount > 1 ? 'Plats' : 'Plat'}
                </p>
              </div>
              <div className="gradient-line-right" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Items grid */}
        {filteredItems.length > 0 ? (
          <div style={styles.itemsGrid}>
            {filteredItems.map((item, index) => (
              <MenuItemCard key={item.id} item={item} index={index} onPress={handleItemPress} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyContainer}>
            <div style={styles.emptyIconContainer}>
              <span style={styles.emptyIcon}>~</span>
            </div>
            <p style={styles.emptyTitle}>Aucun article</p>
            <p style={styles.emptyText}>Cette categorie est vide pour le moment</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing.xl }}>
          <button style={styles.backButton} onClick={() => navigate('/categories')}>
            <ArrowLeft size={20} color={colors.text} />
            <span style={styles.backButtonText}>Retour</span>
          </button>
        </div>
        <div style={{ height: spacing.xxl }} />
      </div>

      <ItemDetailModal item={selectedItem} visible={modalVisible} onClose={handleCloseModal} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  scrollContent: {
    position: 'relative',
    zIndex: 2,
    paddingBottom: spacing.xl,
  },
  categoriesSection: {
    paddingBottom: spacing.sm,
    marginTop: -spacing.md,
  },
  categoriesHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: `0 ${spacing.lg}px`,
    marginBottom: spacing.md,
  },
  categoriesLine: {
    flex: 1,
    height: 1,
    background: colors.border,
  },
  categoriesTitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 2,
    margin: `0 ${spacing.md}px`,
  },
  categoriesScroll: {
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: `${spacing.xs}px ${spacing.lg}px`,
    scrollbarWidth: 'none',
  },
  categoriesGrid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 0,
  },
  categoryGridItem: {
    width: 90,
    flexShrink: 0,
  },
  sectionHeader: {
    padding: `${spacing.lg}px ${spacing.lg}px`,
  },
  sectionTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleWrapper: {
    textAlign: 'center',
    margin: `0 ${spacing.lg}px`,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: 22,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 3,
  },
  itemCountText: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
    marginTop: spacing.xs,
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    padding: `0 ${spacing.md}px`,
    gap: spacing.sm,
    alignItems: 'stretch',
  },
  errorContainer: {
    margin: spacing.lg,
    padding: spacing.md,
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 12,
    border: `1px solid ${colors.error}`,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing.xxl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    display: 'flex',
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
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 400,
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: `${spacing.sm}px ${spacing.md}px`,
    background: colors.surface,
    borderRadius: 20,
    border: `1px solid ${colors.border}`,
    cursor: 'pointer',
    color: 'inherit',
    fontFamily: 'inherit',
  },
  backButtonText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  },
};
