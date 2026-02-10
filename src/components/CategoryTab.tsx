import { colors, spacing } from '@/constants/theme';
import { Category } from '@/lib/supabase';
import {
  Utensils, Sandwich, Coffee, IceCream, Wine, Pizza, Beef, Fish,
  Salad, Soup, Cake, GlassWater, Drumstick, Shell, Citrus, CupSoda,
  Martini, Flame, Cherry, LeafyGreen, Layers, CircleDot,
} from 'lucide-react';

interface CategoryTabProps {
  category: Category;
  isActive: boolean;
  onPress: () => void;
}

const getCategoryIcon = (name: string, isActive: boolean) => {
  const iconColor = isActive ? colors.background : colors.accent;
  const iconSize = 24;
  const lowerName = name.toLowerCase();

  if (lowerName.includes('salade') || lowerName.includes('salad')) return <Salad size={iconSize} color={iconColor} />;
  if (lowerName.includes('entree') || lowerName.includes('entrée')) return <Soup size={iconSize} color={iconColor} />;
  if (lowerName.includes('burger')) return <Beef size={iconSize} color={iconColor} />;
  if (lowerName.includes('sandwich')) return <Sandwich size={iconSize} color={iconColor} />;
  if (lowerName.includes('pate') || lowerName.includes('pâte') || lowerName.includes('pasta')) return <Utensils size={iconSize} color={iconColor} />;
  if (lowerName.includes('viande') || lowerName.includes('grill')) return <Beef size={iconSize} color={iconColor} />;
  if (lowerName.includes('volaille') || lowerName.includes('poulet') || lowerName.includes('chicken')) return <Drumstick size={iconSize} color={iconColor} />;
  if ((lowerName.includes('fruit') && lowerName.includes('mer')) || lowerName.includes('seafood')) return <Shell size={iconSize} color={iconColor} />;
  if (lowerName.includes('poisson') || lowerName.includes('fish')) return <Fish size={iconSize} color={iconColor} />;
  if (lowerName.includes('africain') || lowerName.includes('plat')) return <Utensils size={iconSize} color={iconColor} />;
  if (lowerName.includes('combo')) return <Layers size={iconSize} color={iconColor} />;
  if (lowerName.includes('accompagnement') || lowerName.includes('side')) return <LeafyGreen size={iconSize} color={iconColor} />;
  if (lowerName.includes('cocktail')) return <Martini size={iconSize} color={iconColor} />;
  if (lowerName.includes('jus') || lowerName.includes('juice')) return <Citrus size={iconSize} color={iconColor} />;
  if (lowerName.includes('boisson') && lowerName.includes('froid')) return <CupSoda size={iconSize} color={iconColor} />;
  if (lowerName.includes('boisson') && lowerName.includes('chaud') || lowerName.includes('cafe') || lowerName.includes('café') || lowerName.includes('coffee')) return <Coffee size={iconSize} color={iconColor} />;
  if (lowerName.includes('boisson') || lowerName.includes('drink')) return <GlassWater size={iconSize} color={iconColor} />;
  if (lowerName.includes('dessert')) return <IceCream size={iconSize} color={iconColor} />;
  if (lowerName.includes('milkshake') || lowerName.includes('shake')) return <CupSoda size={iconSize} color={iconColor} />;
  if (lowerName.includes('shisha') || lowerName.includes('chicha') || lowerName.includes('hookah')) return <CircleDot size={iconSize} color={iconColor} />;
  if (lowerName.includes('vin') || lowerName.includes('wine') || lowerName.includes('alcool')) return <Wine size={iconSize} color={iconColor} />;
  if (lowerName.includes('pizza')) return <Pizza size={iconSize} color={iconColor} />;
  if (lowerName.includes('soupe') || lowerName.includes('soup')) return <Soup size={iconSize} color={iconColor} />;
  if (lowerName.includes('gateau') || lowerName.includes('cake') || lowerName.includes('patisserie')) return <Cake size={iconSize} color={iconColor} />;
  return <Utensils size={iconSize} color={iconColor} />;
};

export default function CategoryTab({ category, isActive, onPress }: CategoryTabProps) {
  return (
    <button
      onClick={onPress}
      style={{
        ...styles.container,
        transform: isActive ? 'scale(1)' : 'scale(0.95)',
        transition: 'transform 0.2s ease',
      }}
      aria-label={`Categorie ${category.name}`}
    >
      {isActive ? (
        <div style={styles.gradient}>
          <div style={styles.content}>
            {getCategoryIcon(category.name, true)}
            <span style={{ ...styles.text, ...styles.textActive }}>{category.name}</span>
          </div>
        </div>
      ) : (
        <div style={styles.inactive}>
          <div style={styles.content}>
            {getCategoryIcon(category.name, false)}
            <span style={styles.text}>{category.name}</span>
          </div>
        </div>
      )}
    </button>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    background: 'none',
  },
  gradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDark})`,
  },
  inactive: {
    width: 90,
    height: 90,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: 45,
  },
  content: {
    width: 90,
    height: 90,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xs,
    gap: 6,
  },
  text: {
    fontSize: 10,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    color: colors.text,
    letterSpacing: 0.2,
    textAlign: 'center',
    maxWidth: 80,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  textActive: {
    color: colors.background,
  },
};
