import { colors, spacing } from '@/constants/theme';

function SkeletonBox({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        ...styles.skeleton,
        ...style,
        animation: 'shimmerPulse 1.2s ease-in-out infinite',
      }}
    />
  );
}

export default function MenuSkeleton() {
  return (
    <div style={styles.container}>
      <div className="gradient-bg" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={styles.header}>
          <SkeletonBox style={styles.logoSkeleton} />
          <SkeletonBox style={styles.titleSkeleton} />
        </div>

        <div style={styles.categoriesSection}>
          <div style={styles.categoriesRow}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonBox key={i} style={styles.categorySkeleton} />
            ))}
          </div>
        </div>

        <div style={styles.sectionHeader}>
          <SkeletonBox style={styles.sectionTitleSkeleton} />
        </div>

        <div style={styles.itemsGrid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} style={styles.itemWrapper}>
              <SkeletonBox style={styles.itemSkeleton} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    height: '100%',
    background: colors.background,
    position: 'relative',
    overflow: 'hidden',
  },
  skeleton: {
    background: colors.surfaceLight,
    borderRadius: 8,
  },
  header: {
    paddingTop: 60,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoSkeleton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  titleSkeleton: {
    width: 200,
    height: 30,
    borderRadius: 8,
  },
  categoriesSection: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  categoriesRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  categorySkeleton: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  sectionTitleSkeleton: {
    width: 150,
    height: 28,
    borderRadius: 8,
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    paddingLeft: spacing.md,
    paddingRight: spacing.md,
    gap: spacing.sm,
  },
  itemWrapper: {},
  itemSkeleton: {
    height: 120,
    borderRadius: 10,
  },
};
