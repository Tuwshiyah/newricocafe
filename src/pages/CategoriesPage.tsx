import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowLeft, Loader } from 'lucide-react';
import { colors, spacing } from '@/constants/theme';
import { supabase, Category } from '@/lib/supabase';
import { getOptimizedImageUrl } from '@/lib/imageUtils';
import MenuHeader from '@/components/MenuHeader';

interface CategoryWithCount extends Category {
  itemCount: number;
  imageUrl: string | null;
}

export default function CategoriesPage() {
  const navigate = useNavigate();
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
          .select('category_id'),
      ]);

      if (categoriesResult.error) throw categoriesResult.error;
      if (countsResult.error) throw countsResult.error;

      const countMap = new Map<string, number>();
      (countsResult.data || []).forEach((item) => {
        countMap.set(item.category_id, (countMap.get(item.category_id) || 0) + 1);
      });

      const categoriesWithCounts: CategoryWithCount[] = (categoriesResult.data || []).map(
        (category) => ({
          ...category,
          created_at: '',
          itemCount: countMap.get(category.id) || 0,
          imageUrl: category.image_url || null,
        })
      );

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
    navigate(`/menu?categoryId=${categoryId}`);
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div className="gradient-bg" />
        <Loader size={40} color={colors.accent} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={styles.loadingText}>Chargement des categories...</p>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="gradient-bg" />
      <div className="dot-pattern" />

      <div style={styles.scrollContent}>
        <MenuHeader />

        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}

        <div style={styles.categoriesContainer}>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              style={styles.categoryCardWrapper}
            >
              <button
                style={styles.categoryCard}
                onClick={() => handleCategoryPress(category.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.accent;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={styles.imageContainer}>
                  <img
                    src={
                      getOptimizedImageUrl(category.imageUrl, 200) ||
                      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=200'
                    }
                    alt={category.name}
                    style={styles.categoryImage}
                  />
                </div>

                <div style={styles.cardContent}>
                  <p style={styles.categoryName}>{category.name}</p>
                  <p style={styles.itemCount}>
                    {category.itemCount} {category.itemCount > 1 ? 'plats' : 'plat'}
                  </p>
                </div>

                <div style={styles.arrowContainer}>
                  <ChevronRight size={20} color={colors.accent} />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: spacing.xl }}>
          <button style={styles.backButton} onClick={() => navigate('/')}>
            <ArrowLeft size={20} color={colors.text} />
            <span style={styles.backButtonText}>Retour</span>
          </button>
        </div>

        <div style={{ height: spacing.xxl }} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    width: '100%',
    height: '100%',
    background: colors.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
    marginTop: spacing.sm,
  },
  scrollContent: {
    position: 'relative',
    zIndex: 2,
    paddingBottom: spacing.xl,
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
  categoriesContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    padding: `${spacing.xl}px ${spacing.md}px 0`,
    gap: spacing.md,
  },
  categoryCardWrapper: {},
  categoryCard: {
    width: '100%',
    background: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: `1px solid ${colors.border}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    color: 'inherit',
    fontFamily: 'inherit',
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    background: colors.surface,
    border: `3px solid ${colors.accent}`,
    overflow: 'hidden',
    marginBottom: spacing.md,
    boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  cardContent: {
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  categoryName: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    marginBottom: spacing.xs,
  },
  itemCount: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    background: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${colors.border}`,
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
    transition: 'border-color 0.2s',
  },
  backButtonText: {
    color: colors.text,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  },
};
