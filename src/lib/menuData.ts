import menuData from '../../data/menu_restaurant.json';
import { Category, MenuItem } from './supabase';

const menu = menuData.menu as Record<string, { label: string; items: any[] }>;

const CATEGORY_ORDER = [
  'entrees_froides',
  'entrees_chaudes',
  'nos_sandwichs',
  'burgers',
  'nos_pates',
  'pizza',
  'nos_plats',
  'nos_combos',
  'desserts',
  'milkshake',
  'cocktails',
  'jus_frais',
  'boissons_chaudes',
  'boissons_froides',
  'shisha'
];

const CATEGORY_IMAGES: Record<string, string> = {
  entrees_froides: 'https://tuwshiyah.b-cdn.net/ricocafe/preparez-des-entrees-froides-irresistibles-a-l26rsquo3Bavance.jpg',
  entrees_chaudes: 'https://tuwshiyah.b-cdn.net/ricocafe/entree-chaude.jpg',
  nos_sandwichs: 'https://tuwshiyah.b-cdn.net/ricocafe/i225930-sandwich-au-thon-facile-et-rapide.jpg',
  burgers: 'https://tuwshiyah.b-cdn.net/ricocafe/mega-burgers-a-la-biere-cheddar-fort-et-bacon.jpeg',
  nos_pates: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
  pizza: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
  nos_plats: 'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg',
  nos_combos: 'https://tuwshiyah.b-cdn.net/ricocafe/plateau-fruits-de-mer.jpg',
  desserts: 'https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg',
  milkshake: 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg',
  cocktails: 'https://images.pexels.com/photos/338713/pexels-photo-338713.jpeg',
  jus_frais: 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg',
  boissons_chaudes: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
  boissons_froides: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg',
  shisha: 'https://tuwshiyah.b-cdn.net/ricocafe/depositphotos_222137430-stock-photo-hookah-shisha-smoke-purple-glass.jpg'
};

export const getLocalCategories = (): Category[] => {
  const categories = Object.entries(menu).map(([key, value]) => ({
    id: key,
    name: value.label,
    display_order: 0, // Will be set by sort
    image_url: CATEGORY_IMAGES[key] || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    created_at: new Date().toISOString(),
  }));

  return categories.sort((a, b) => {
    const indexA = CATEGORY_ORDER.indexOf(a.id);
    const indexB = CATEGORY_ORDER.indexOf(b.id);
    // If not found in order list, put at the end
    const valA = indexA === -1 ? 999 : indexA;
    const valB = indexB === -1 ? 999 : indexB;
    return valA - valB;
  }).map((cat, index) => ({
    ...cat,
    display_order: index
  }));
};

export const getLocalMenuItems = (): MenuItem[] => {
  const items: MenuItem[] = [];
  
  Object.entries(menu).forEach(([catKey, catValue]) => {
    catValue.items.forEach((item: any, index: number) => {
      items.push({
        id: item.id,
        category_id: catKey,
        name: item.name,
        description: item.description || '',
        price: item.price,
        image_url: '', // Default empty
        is_featured: false,
        is_available: true,
        display_order: index,
        created_at: new Date().toISOString(),
      });
    });
  });

  return items;
};
