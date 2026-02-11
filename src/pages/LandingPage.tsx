import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { colors, spacing } from '@/constants/theme';
import VideoBackground from '@/components/VideoBackground';

const VIDEO_URL = 'https://res.cloudinary.com/dmeochivw/video/upload/v1769199614/man-enjoying-a-delicious-hamburger-with-fresh-ingr-2026-01-20-16-40-57-utc_pqsjaq.mp4';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleViewMenu = () => {
    navigate('/categories');
  };

  return (
    <VideoBackground source={VIDEO_URL}>
      <div style={styles.darkOverlay} />
      <div className="dot-pattern-dark" style={{ zIndex: 2 }} />
      <div style={styles.darkLayer} />

      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={styles.logoContainer}
        >
          <img
            src="https://5t9xqak19k.ucarecd.net/b58957ef-ec04-4833-91ab-55ad28816b2a/159165430_1741559956025769_4054588071265487430_ncopie.webp"
            alt="Rico Cafe Logo"
            style={styles.logo}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={styles.menuTitle}
        >
          MENU
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={styles.tagline}
        >
          Manger avec amour
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={styles.imageContainer}
        >
          <motion.img
            src="https://tuwshiyah.b-cdn.net/ricocafe/neww.webp"
            alt="Food"
            style={styles.foodImage}
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }}
          />
          <div style={styles.badgeContainer}>
            <motion.button
              onClick={handleViewMenu}
              style={styles.badge}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <div style={styles.shimmer} />
              <span style={styles.badgeText}>Voir le menu</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </VideoBackground>
  );
}

const styles: Record<string, React.CSSProperties> = {
  darkOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    zIndex: 2,
  },
  darkLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 2,
  },
  content: {
    position: 'relative',
    zIndex: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    padding: spacing.lg,
  },
  logoContainer: {
    marginBottom: -40,
  },
  logo: {
    width: 240,
    height: 240,
    objectFit: 'contain',
  },
  menuTitle: {
    color: colors.text,
    fontSize: 64,
    fontFamily: "'Playfair Display', serif",
    fontWeight: 900,
    letterSpacing: 1,
    marginBottom: spacing.xs,
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  },
  tagline: {
    color: '#E5E5E5',
    fontSize: 28,
    letterSpacing: 0,
    marginTop: -spacing.xs,
    marginBottom: spacing.lg,
    fontFamily: "'Dancing Script', cursive",
    fontWeight: 700,
  },
  imageContainer: {
    width: 'min(80vw, 500px)',
    height: 'min(60vw, 375px)',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    position: 'relative',
    background: 'transparent',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: colors.accent,
    paddingLeft: spacing.xxl,
    paddingRight: spacing.xxl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: 30,
    transform: 'rotate(-3deg)',
    overflow: 'hidden',
    position: 'relative',
    border: 'none',
    cursor: 'pointer',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    animation: 'shimmer 2s linear infinite',
  },
  badgeText: {
    color: colors.background,
    fontSize: 18,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    letterSpacing: 2,
    textAlign: 'center',
    textTransform: 'uppercase',
    position: 'relative',
    zIndex: 1,
  },
};
