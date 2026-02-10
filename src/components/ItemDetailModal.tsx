import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Check, AlertCircle } from 'lucide-react';
import { colors, spacing } from '@/constants/theme';
import { MenuItem } from '@/lib/supabase';

interface ItemDetailModalProps {
  item: MenuItem | null;
  visible: boolean;
  onClose: () => void;
}

export default function ItemDetailModal({ item, visible, onClose }: ItemDetailModalProps) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [visible, onClose]);

  if (!item) return null;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} F`;
  };

  const isUnavailable = item.is_available === false;

  return (
    <AnimatePresence>
      {visible && (
        <div style={styles.overlay}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={styles.backdrop}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            style={styles.modalContainer}
          >
            <div style={styles.handle} />

            <button
              style={styles.closeButton}
              onClick={onClose}
              aria-label="Fermer"
            >
              <X size={24} color={colors.text} />
            </button>

            <div style={styles.content}>
              <div style={styles.header}>
                {item.is_featured && (
                  <div style={styles.featuredBadge}>
                    <Star size={14} color={colors.background} fill={colors.background} />
                    <span style={styles.featuredText}>Recommande</span>
                  </div>
                )}

                {isUnavailable && (
                  <div style={styles.unavailableBadge}>
                    <AlertCircle size={14} color={colors.text} />
                    <span style={styles.unavailableTextBadge}>Indisponible</span>
                  </div>
                )}

                <h2 style={{ ...styles.name, ...(isUnavailable ? styles.nameUnavailable : {}) }}>
                  {item.name}
                </h2>

                <div style={styles.priceContainer}>
                  <span style={{ ...styles.price, ...(isUnavailable ? styles.priceUnavailable : {}) }}>
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>

              <div style={styles.divider} />

              <div style={styles.descriptionSection}>
                <p style={styles.sectionTitle}>Description</p>
                <p style={styles.description}>
                  {item.description || 'Aucune description disponible.'}
                </p>
              </div>

              {!isUnavailable && (
                <div style={styles.availabilitySection}>
                  <div style={styles.availabilityBadge}>
                    <Check size={16} color={colors.success} />
                    <span style={styles.availabilityText}>Disponible</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    zIndex: 1000,
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  modalContainer: {
    position: 'relative',
    background: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    minHeight: 300,
    border: `1px solid ${colors.border}`,
    borderBottom: 'none',
    zIndex: 1,
    overflow: 'auto',
  },
  handle: {
    width: 40,
    height: 4,
    background: colors.textMuted,
    borderRadius: 2,
    margin: `${spacing.sm}px auto 0`,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 40,
    height: 40,
    borderRadius: 20,
    background: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    border: 'none',
    cursor: 'pointer',
  },
  content: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  header: {
    marginBottom: spacing.md,
  },
  featuredBadge: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: colors.accent,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    borderRadius: 16,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  featuredText: {
    color: colors.background,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
  },
  unavailableBadge: {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    background: colors.error,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
    borderRadius: 16,
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  unavailableTextBadge: {
    color: colors.text,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    marginBottom: spacing.sm,
  },
  nameUnavailable: {
    opacity: 0.5,
    textDecoration: 'line-through',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    color: colors.accent,
    fontSize: 28,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
  },
  priceUnavailable: {
    color: colors.textMuted,
    textDecoration: 'line-through',
  },
  divider: {
    height: 1,
    background: colors.border,
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  descriptionSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 400,
    lineHeight: '24px',
  },
  availabilitySection: {
    marginBottom: spacing.xl,
  },
  availabilityBadge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  availabilityText: {
    color: colors.success,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  },
};
