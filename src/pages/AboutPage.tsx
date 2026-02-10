import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Music, ChefHat } from 'lucide-react';
import { colors, spacing, typography } from '@/constants/theme';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
}

function InfoCard({ icon, title, content, delay }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={styles.infoCard}
    >
      <div style={styles.infoIconContainer}>{icon}</div>
      <div style={styles.infoContent}>
        <h3 style={styles.infoTitle}>{title}</h3>
        <p style={styles.infoText}>{content}</p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const handleCall = () => {
    window.open('tel:+1987654321');
  };

  return (
    <div className="page">
      {/* Header */}
      <div style={styles.header}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={styles.logoContainer}
        >
          <ChefHat size={50} color={colors.accent} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={styles.restaurantName}
        >
          YOUR STEAK
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
          style={styles.tagline}
        >
          Best Quality Restaurant
        </motion.p>
      </div>

      {/* Content */}
      <div style={styles.content}>
        <InfoCard
          icon={<MapPin size={24} color={colors.accent} />}
          title="Location"
          content="123 Uptown City, Washington Metropolis 201314"
          delay={0.5}
        />

        <InfoCard
          icon={<Clock size={24} color={colors.accent} />}
          title="Opening Hours"
          content="Monday - Sunday: 8AM - 10PM"
          delay={0.6}
        />

        <InfoCard
          icon={<Music size={24} color={colors.accent} />}
          title="Live Music"
          content="Every evening from 6PM"
          delay={0.7}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button style={styles.callButton} onClick={handleCall}>
            <Phone size={20} color={colors.background} />
            <span style={styles.callButtonText}>Call Us: +1 987 65 321</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={styles.descriptionContainer}
        >
          <h2 style={styles.descriptionTitle}>About Us</h2>
          <p style={styles.description}>
            Welcome to Your Steak, where culinary excellence meets warm hospitality. Our expert chefs
            craft each dish with passion, using only the finest ingredients to create unforgettable
            dining experiences.
          </p>
          <p style={styles.description}>
            From our signature steaks to our handcrafted pizzas, every item on our menu is prepared
            with care and attention to detail. Join us for an evening of exceptional food and live
            music.
          </p>
        </motion.div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>www.yoursteak.com</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    background: colors.surface,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    border: `2px solid ${colors.accent}`,
  },
  restaurantName: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: 6,
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
  tagline: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    letterSpacing: 2,
  },
  content: {
    padding: spacing.lg,
  },
  infoCard: {
    display: 'flex',
    flexDirection: 'row',
    background: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    border: `1px solid ${colors.border}`,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    background: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  infoTitle: {
    color: colors.accent,
    fontSize: typography.heading.fontSize,
    fontWeight: parseInt(String(typography.heading.fontWeight)),
    marginBottom: spacing.xs,
  },
  infoText: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
  },
  callButton: {
    display: 'flex',
    flexDirection: 'row',
    background: colors.accent,
    borderRadius: 12,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    gap: spacing.sm,
    fontFamily: 'inherit',
    transition: 'opacity 0.2s',
  },
  callButtonText: {
    color: colors.background,
    fontSize: typography.heading.fontSize,
    fontWeight: parseInt(String(typography.heading.fontWeight)),
  },
  descriptionContainer: {
    background: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    border: `1px solid ${colors.border}`,
  },
  descriptionTitle: {
    color: colors.accent,
    fontSize: typography.subtitle.fontSize,
    fontWeight: parseInt(String(typography.subtitle.fontWeight)),
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    fontSize: typography.body.fontSize,
    lineHeight: '22px',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xl,
    display: 'flex',
    justifyContent: 'center',
  },
  footerText: {
    color: colors.textMuted,
    fontSize: typography.caption.fontSize,
    letterSpacing: 2,
  },
};
