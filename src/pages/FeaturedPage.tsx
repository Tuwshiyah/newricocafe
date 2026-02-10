import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Loader } from 'lucide-react';
import { colors, spacing, typography } from '@/constants/theme';
import { supabase, MenuItem } from '@/lib/supabase';
import MenuItemCard from '@/components/MenuItemCard';

export default function FeaturedPage() {
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
      <div style={styles.loadingContainer}>
        <Loader size={40} color={colors.accent} style={{ animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={styles.iconContainer}
        >
          <Star size={40} color={colors.accent} fill={colors.accent} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.title}
        >
          OUR FAVOURITES
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={styles.decorLine}
        >
          <div style={styles.line} />
          <div style={styles.diamond} />
          <div style={styles.line} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={styles.subtitle}
        >
          Chef's special selection
        </motion.p>

        {error && (
          <div style={styles.errorContainer}>
            <p style={styles.errorText}>{error}</p>
          </div>
        )}
      </div>

      {/* Items */}
      {featuredItems.length > 0 ? (
        <div style={styles.itemsList}>
          {featuredItems.map((item, index) => (
            <div key={item.id} style={styles.itemContainer}>
              <MenuItemCard item={item} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.emptyContainer}>
          <p style={styles.emptyText}>No featured items yet</p>
          <p style={styles.emptySubtext}>Check back soon for our specials!</p>
        </div>
      )}

      <div style={{ height: spacing.xl }} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    width: '100%',
    height: '100%',
    background: colors.background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `linear-gradient(to bottom, #2a2a2a, ${colors.background})`,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: 4,
  },
  decorLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  line: {
    width: 40,
    height: 1,
    background: colors.accent,
  },
  diamond: {
    width: 8,
    height: 8,
    background: colors.accent,
    transform: 'rotate(45deg)',
    margin: `0 ${spacing.sm}px`,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    fontWeight: parseInt(typography.body.fontWeight),
    letterSpacing: 1,
  },
  itemsList: {
    padding: `0 ${spacing.lg}px`,
  },
  itemContainer: {
    paddingBottom: 0,
  },
  errorContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    background: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    border: `1px solid ${colors.error}`,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.body.fontSize,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: spacing.xxl,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.body.fontSize,
  },
  emptySubtext: {
    color: colors.textMuted,
    fontSize: typography.caption.fontSize,
    marginTop: spacing.sm,
  },
};
