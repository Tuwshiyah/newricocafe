export function getOptimizedImageUrl(url: string | null, width: number = 200): string {
  if (!url) return '';

  if (url.includes('cloudinary.com')) {
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }

  if (url.includes('pexels.com')) {
    return `${url}?auto=compress&cs=tinysrgb&w=${width}`;
  }

  return url;
}
