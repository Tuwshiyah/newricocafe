import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '@/constants/theme';
import { Category } from '@/lib/supabase';
import {
  Utensils,
  Sandwich,
  Coffee,
  IceCream,
  Wine,
  Pizza,
  Beef,
  Fish,
  Salad,
  Soup,
  Cake,
  GlassWater,
  Drumstick,
  Shell,
  Citrus,
  CupSoda,
  Martini,
  Flame,
  Cherry,
  LeafyGreen,
  Ham,
  Layers,
  CircleDot
} from 'lucide-react-native';

interface CategoryTabProps {
  category: Category;
  isActive: boolean;
  onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const getCategoryIcon = (name: string, isActive: boolean) => {
  const iconColor = isActive ? colors.background : colors.accent;
  const iconSize = 24;
  const lowerName = name.toLowerCase();

  if (lowerName.includes('salade') || lowerName.includes('salad')) {
    return <Salad size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('entree') || lowerName.includes('entrée')) {
    return <Soup size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('burger')) {
    return <Ham size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('sandwich')) {
    return <Sandwich size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('pate') || lowerName.includes('pâte') || lowerName.includes('pasta')) {
    return <Utensils size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('viande') || lowerName.includes('grill')) {
    return <Beef size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('volaille') || lowerName.includes('poulet') || lowerName.includes('chicken')) {
    return <Drumstick size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('fruit') && lowerName.includes('mer') || lowerName.includes('seafood')) {
    return <Shell size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('poisson') || lowerName.includes('fish')) {
    return <Fish size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('africain') || lowerName.includes('plat')) {
    return <Utensils size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('combo')) {
    return <Layers size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('accompagnement') || lowerName.includes('side')) {
    return <LeafyGreen size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('cocktail')) {
    return <Martini size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('jus') || lowerName.includes('juice')) {
    return <Citrus size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('boisson') && lowerName.includes('froid')) {
    return <CupSoda size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('boisson') && lowerName.includes('chaud') || lowerName.includes('cafe') || lowerName.includes('café') || lowerName.includes('coffee')) {
    return <Coffee size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('boisson') || lowerName.includes('drink')) {
    return <GlassWater size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('dessert')) {
    return <IceCream size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('milkshake') || lowerName.includes('shake')) {
    return <CupSoda size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('shisha') || lowerName.includes('chicha') || lowerName.includes('hookah')) {
    return <CircleDot size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('vin') || lowerName.includes('wine') || lowerName.includes('alcool')) {
    return <Wine size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('pizza')) {
    return <Pizza size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('soupe') || lowerName.includes('soup')) {
    return <Soup size={iconSize} color={iconColor} />;
  }
  if (lowerName.includes('gateau') || lowerName.includes('cake') || lowerName.includes('patisserie')) {
    return <Cake size={iconSize} color={iconColor} />;
  }
  return <Utensils size={iconSize} color={iconColor} />;
};

export default function CategoryTab({ category, isActive, onPress }: CategoryTabProps) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isActive ? 1 : 0.95, { damping: 15 }),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={`Categorie ${category.name}`}
      accessibilityHint={isActive ? 'Categorie selectionnee' : 'Appuyez pour voir cette categorie'}
    >
      {isActive ? (
        <LinearGradient
          colors={[colors.accent, colors.accentDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.content}>
            {getCategoryIcon(category.name, true)}
            <Text style={[styles.text, styles.textActive]}>
              {category.name}
            </Text>
          </View>
        </LinearGradient>
      ) : (
        <View style={styles.inactive}>
          <View style={styles.content}>
            {getCategoryIcon(category.name, false)}
            <Text style={styles.text}>{category.name}</Text>
          </View>
        </View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    marginRight: 0,
    borderRadius: 45,
    overflow: 'hidden',
  },
  gradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  inactive: {
    width: 90,
    height: 90,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 45,
  },
  content: {
    width: 90,
    height: 90,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xs,
    gap: 6,
  },
  text: {
    fontSize: 10,
    fontFamily: 'Raleway-SemiBold',
    color: colors.text,
    letterSpacing: 0.2,
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: 80,
  },
  textActive: {
    color: colors.background,
  },
});
