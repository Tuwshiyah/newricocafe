import { motion } from 'framer-motion';
import { colors, spacing } from '@/constants/theme';

export default function MenuHeader() {
  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={styles.logoContainer}
      >
        <img
          src="https://5t9xqak19k.ucarecd.net/b58957ef-ec04-4833-91ab-55ad28816b2a/159165430_1741559956025769_4054588071265487430_ncopie.webp"
          alt="Rico Cafe Logo"
          style={styles.logo}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p style={styles.subtitle}>Notre Selection</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h1 style={styles.title}>MENU</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={styles.decorLine}
      >
        <div className="gradient-line-left" />
        <div style={styles.diamondOuter}>
          <div style={styles.diamond} />
        </div>
        <div className="gradient-line-right" />
      </motion.div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    paddingTop: 50,
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
  },
  logoContainer: {
    marginBottom: -spacing.sm,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    display: 'block',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 12,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    letterSpacing: 2,
    textShadow: '0 2px 8px rgba(201, 168, 108, 0.25)',
  },
  decorLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    width: '60%',
  },
  diamondOuter: {
    padding: 4,
    borderRadius: 4,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    margin: `0 ${spacing.sm}px`,
  },
  diamond: {
    width: 6,
    height: 6,
    background: colors.accent,
    transform: 'rotate(45deg)',
  },
};
