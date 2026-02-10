import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { colors, spacing } from '@/constants/theme';
import { MenuItem } from '@/lib/supabase';

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onPress?: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, index, onPress }: MenuItemCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isUnavailable = item.is_available === false;

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-FR')} F`;
  };

  const handleClick = () => {
    if (!isUnavailable && onPress) {
      onPress(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      style={styles.wrapper}
    >
      <button
        style={{
          ...styles.container,
          ...(isUnavailable ? styles.unavailableContainer : {}),
          transform: isPressed ? 'scale(0.98)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        }}
        onMouseDown={() => !isUnavailable && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onClick={handleClick}
        aria-label={`${item.name}, ${formatPrice(item.price)}${isUnavailable ? ', indisponible' : ''}`}
      >
        {isUnavailable && (
          <div style={styles.unavailableBadge}>
            <span style={styles.unavailableText}>Indisponible</span>
          </div>
        )}
        <div style={{ ...(isUnavailable ? styles.unavailableContent : {}), marginBottom: spacing.xs, flex: 1 }}>
          <div style={styles.header}>
            <span
              style={{
                ...styles.name,
                ...(isUnavailable ? styles.unavailableName : {}),
              }}
            >
              {item.name}
            </span>
            {item.is_featured && !isUnavailable && (
              <div style={styles.featuredBadge}>
                <Star size={10} color={colors.background} fill={colors.background} />
              </div>
            )}
          </div>
          <p
            style={{
              ...styles.description,
              ...(isUnavailable ? styles.unavailableDescription : {}),
            }}
          >
            {item.description}
          </p>
        </div>
        <div style={styles.priceSection}>
          <span
            style={{
              ...styles.price,
              ...(isUnavailable ? styles.unavailablePrice : {}),
            }}
          >
            {formatPrice(item.price)}
          </span>
        </div>
      </button>
    </motion.div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    width: '100%',
    height: '100%',
  },
  container: {
    width: '100%',
    height: '100%',
    background: colors.surface,
    borderRadius: 12,
    padding: `${spacing.md}px ${spacing.md}px ${spacing.sm + 2}px`,
    border: `1px solid ${colors.border}`,
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'inherit',
    color: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxSizing: 'border-box',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
    marginBottom: 6,
  },
  name: {
    color: colors.text,
    fontSize: 13,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    letterSpacing: 0.2,
    flex: 1,
    lineHeight: '18px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  featuredBadge: {
    background: colors.accent,
    padding: 3,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginTop: 2,
  },
  description: {
    color: colors.textMuted,
    fontSize: 11,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 400,
    lineHeight: '15px',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    margin: 0,
  },
  priceSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 'auto',
    paddingTop: spacing.sm,
    borderTop: `1px dotted ${colors.border}`,
  },
  price: {
    color: colors.accent,
    fontSize: 14,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    letterSpacing: 0.3,
    whiteSpace: 'nowrap',
  },
  unavailableContainer: {
    opacity: 0.6,
  },
  unavailableBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    background: colors.error,
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    paddingTop: 2,
    paddingBottom: 2,
    borderRadius: 4,
    zIndex: 1,
  },
  unavailableText: {
    color: colors.text,
    fontSize: 9,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  unavailableContent: {
    opacity: 0.7,
  },
  unavailableName: {
    textDecoration: 'line-through',
  },
  unavailableDescription: {
    opacity: 0.6,
  },
  unavailablePrice: {
    color: colors.textMuted,
    textDecoration: 'line-through',
  },
};
