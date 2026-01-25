import { View, Text, StyleSheet, ScrollView, Linking, Pressable } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography } from '@/constants/theme';
import { MapPin, Clock, Phone, Music, ChefHat } from 'lucide-react-native';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  delay: number;
}

function InfoCard({ icon, title, content, delay }: InfoCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(500).delay(delay)}
      style={styles.infoCard}
    >
      <View style={styles.infoIconContainer}>{icon}</View>
      <View style={styles.infoContent}>
        <Text style={styles.infoTitle}>{title}</Text>
        <Text style={styles.infoText}>{content}</Text>
      </View>
    </Animated.View>
  );
}

export default function AboutScreen() {
  const handleCall = () => {
    Linking.openURL('tel:+1987654321');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={['#2a2a2a', colors.background]}
        style={styles.header}
      >
        <Animated.View
          entering={FadeInDown.duration(600).delay(100)}
          style={styles.logoContainer}
        >
          <ChefHat size={50} color={colors.accent} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(600).delay(200)}
          style={styles.restaurantName}
        >
          YOUR STEAK
        </Animated.Text>

        <Animated.View
          style={styles.decorLine}
          entering={FadeInDown.duration(600).delay(300)}
        >
          <View style={styles.line} />
          <View style={styles.diamond} />
          <View style={styles.line} />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.duration(600).delay(400)}
          style={styles.tagline}
        >
          Best Quality Restaurant
        </Animated.Text>
      </LinearGradient>

      <View style={styles.content}>
        <InfoCard
          icon={<MapPin size={24} color={colors.accent} />}
          title="Location"
          content="123 Uptown City, Washington Metropolis 201314"
          delay={500}
        />

        <InfoCard
          icon={<Clock size={24} color={colors.accent} />}
          title="Opening Hours"
          content="Monday - Sunday: 8AM - 10PM"
          delay={600}
        />

        <InfoCard
          icon={<Music size={24} color={colors.accent} />}
          title="Live Music"
          content="Every evening from 6PM"
          delay={700}
        />

        <Animated.View entering={FadeInUp.duration(500).delay(800)}>
          <Pressable style={styles.callButton} onPress={handleCall}>
            <Phone size={20} color={colors.background} />
            <Text style={styles.callButtonText}>Call Us: +1 987 65 321</Text>
          </Pressable>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.duration(500).delay(900)}
          style={styles.descriptionContainer}
        >
          <Text style={styles.descriptionTitle}>About Us</Text>
          <Text style={styles.description}>
            Welcome to Your Steak, where culinary excellence meets warm hospitality.
            Our expert chefs craft each dish with passion, using only the finest
            ingredients to create unforgettable dining experiences.
          </Text>
          <Text style={styles.description}>
            From our signature steaks to our handcrafted pizzas, every item on our
            menu is prepared with care and attention to detail. Join us for an
            evening of exceptional food and live music.
          </Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>www.yoursteak.com</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  restaurantName: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 6,
  },
  decorLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  line: {
    width: 40,
    height: 1,
    backgroundColor: colors.accent,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: colors.accent,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: spacing.sm,
  },
  tagline: {
    color: colors.textSecondary,
    ...typography.body,
    letterSpacing: 2,
  },
  content: {
    padding: spacing.lg,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoTitle: {
    color: colors.accent,
    ...typography.heading,
    marginBottom: spacing.xs,
  },
  infoText: {
    color: colors.textSecondary,
    ...typography.body,
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: 12,
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  callButtonText: {
    color: colors.background,
    ...typography.heading,
    marginLeft: spacing.sm,
  },
  descriptionContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  descriptionTitle: {
    color: colors.accent,
    ...typography.subtitle,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  description: {
    color: colors.textSecondary,
    ...typography.body,
    lineHeight: 22,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: colors.textMuted,
    ...typography.caption,
    letterSpacing: 2,
  },
});
