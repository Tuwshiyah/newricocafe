// Override specific category images
const IMAGE_OVERRIDES: Record<string, string> = {
  'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/Fotolia_93091049_M.jpg',
  'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/entree-chaude.jpg',
  'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/preparez-des-entrees-froides-irresistibles-a-l26rsquo3Bavance.jpg',
  'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/i225930-sandwich-au-thon-facile-et-rapide.jpg',
  'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/mega-burgers-a-la-biere-cheddar-fort-et-bacon.jpeg',
  'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/plateau-fruits-de-mer.jpg',
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg':
    'https://tuwshiyah.b-cdn.net/ricocafe/depositphotos_222137430-stock-photo-hookah-shisha-smoke-purple-glass.jpg',
};

export function getOptimizedImageUrl(url: string | null, width: number = 200): string {
  if (!url) return '';

  // Check for image overrides
  for (const [original, replacement] of Object.entries(IMAGE_OVERRIDES)) {
    if (url.includes(original)) {
      return replacement;
    }
  }

  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }

  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }

  return url;
}
