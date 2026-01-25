/*
  # Add image_url column to menu_categories

  1. Changes
    - Add image_url column to menu_categories table
    - Update existing categories with provided images

  2. Categories Updated
    - Salades, Entrees Chaudes, Burgers, Sandwichs, Pates
    - Viandes & Grillades, Volailles, Fruits de Mer, Plats Africains
*/

ALTER TABLE menu_categories ADD COLUMN IF NOT EXISTS image_url text;

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357385/garden-salad-on-white-table-cloth-2026-01-06-09-56-56-utc_mfynr2.jpg' WHERE name = 'Salades';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357384/cutlets-with-fresh-vegetables-2026-01-09-14-54-48-utc_agmyva.jpg' WHERE name = 'Entrees Chaudes';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357386/close-up-of-delicious-fresh-home-made-burger-with-2026-01-07-01-45-39-utc_kmunek.jpg' WHERE name = 'Burgers';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357385/club-sandwich-a-sandwich-with-egg-tomato-and-ha-2026-01-05-00-31-41-utc_uknyib.jpg' WHERE name = 'Sandwichs';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357384/plate-of-freshly-cooked-pasta-topped-with-deliciou-2026-01-07-23-14-08-utc_krtc7z.jpg' WHERE name = 'Pates';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357384/juicy-beef-steak-flips-in-a-barbecue-flame-life-s-2026-01-07-05-50-24-utc_qeujmw.jpg' WHERE name = 'Viandes & Grillades';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357385/cooked-chicken-for-festive-dinner-cooked-whole-ch-2026-01-06-08-44-21-utc_g4bwvo.jpg' WHERE name = 'Volailles';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357385/large-cold-and-raw-seafood-platter-to-share-2026-01-08-06-24-50-utc_g8xola.jpg' WHERE name = 'Fruits de Mer';

UPDATE menu_categories SET image_url = 'https://res.cloudinary.com/dmeochivw/image/upload/v1769357386/goulash-beef-stew-or-bogrash-soup-with-meat-vege-2026-01-07-01-44-14-utc_zbo4eq.jpg' WHERE name = 'Plats Africains';