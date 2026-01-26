/*
  # Update Menu from Restaurant Rico JSON

  1. Changes
    - Deletes all existing menu items and categories
    - Creates 18 categories matching the JSON structure (including sub-categories)
    - Inserts all menu items with correct prices from the JSON file

  2. Categories Created
    - Entrees Froides, Entrees Chaudes
    - Sandwichs, Burgers, Pates, Pizzas
    - Viandes, Poulet, Poissons & Fruits de Mer, Autres
    - Combos
    - Cocktails, Jus Frais, Boissons Chaudes, Boissons Froides
    - Milkshakes, Desserts, Shisha

  3. Notes
    - All prices are in FCFA
    - Items maintain proper display_order for sorting
*/

DELETE FROM menu_items;
DELETE FROM menu_categories;

INSERT INTO menu_categories (id, name, display_order, image_url) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Entrees Froides', 1, 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'),
  ('11111111-1111-1111-1111-111111111102', 'Entrees Chaudes', 2, 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg'),
  ('11111111-1111-1111-1111-111111111103', 'Sandwichs', 3, 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg'),
  ('11111111-1111-1111-1111-111111111104', 'Burgers', 4, 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg'),
  ('11111111-1111-1111-1111-111111111105', 'Pates', 5, 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg'),
  ('11111111-1111-1111-1111-111111111106', 'Pizzas', 6, 'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'),
  ('11111111-1111-1111-1111-111111111107', 'Viandes', 7, 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg'),
  ('11111111-1111-1111-1111-111111111108', 'Poulet', 8, 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg'),
  ('11111111-1111-1111-1111-111111111109', 'Poissons & Fruits de Mer', 9, 'https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg'),
  ('11111111-1111-1111-1111-111111111110', 'Autres Plats', 10, 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'),
  ('11111111-1111-1111-1111-111111111111', 'Combos', 11, 'https://images.pexels.com/photos/1907228/pexels-photo-1907228.jpeg'),
  ('11111111-1111-1111-1111-111111111112', 'Cocktails', 12, 'https://images.pexels.com/photos/616836/pexels-photo-616836.jpeg'),
  ('11111111-1111-1111-1111-111111111113', 'Jus Frais', 13, 'https://images.pexels.com/photos/1337825/pexels-photo-1337825.jpeg'),
  ('11111111-1111-1111-1111-111111111114', 'Boissons Chaudes', 14, 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg'),
  ('11111111-1111-1111-1111-111111111115', 'Boissons Froides', 15, 'https://images.pexels.com/photos/1194030/pexels-photo-1194030.jpeg'),
  ('11111111-1111-1111-1111-111111111116', 'Milkshakes', 16, 'https://images.pexels.com/photos/103566/pexels-photo-103566.jpeg'),
  ('11111111-1111-1111-1111-111111111117', 'Desserts', 17, 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg'),
  ('11111111-1111-1111-1111-111111111118', 'Shisha', 18, 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg');

INSERT INTO menu_items (category_id, name, description, price, display_order, is_featured, is_available) VALUES
  ('11111111-1111-1111-1111-111111111101', 'Salade Cesar', 'Iceberg, blanc de poulet 150g, parmesan', 8000, 1, false, true),
  ('11111111-1111-1111-1111-111111111101', 'Salade Avocat Crevette', 'Sauce cocktail', 8000, 2, false, true),

  ('11111111-1111-1111-1111-111111111102', 'Frites Rico', 'Creme champignons, fromage parmesan', 5000, 1, false, true),
  ('11111111-1111-1111-1111-111111111102', 'Chicken Tender', 'Sauce Honey Master', 6000, 2, true, true),
  ('11111111-1111-1111-1111-111111111102', 'Ailes de Poulet Braise', 'Sauce barbecue', 6000, 3, false, true),

  ('11111111-1111-1111-1111-111111111103', 'Sandwich Poulet', 'Poulet braise, sauce mayo ail, salade', 6000, 1, false, true),
  ('11111111-1111-1111-1111-111111111103', 'Fahita Poulet', 'Blanc de poulet marine, poivrons vert, mais, oignons, sauce piquante', 6000, 2, false, true),
  ('11111111-1111-1111-1111-111111111103', 'Fahita Viande', 'Eminces de boeuf marine, poivrons vert, mais, oignons, sauce piquante', 6000, 3, false, true),
  ('11111111-1111-1111-1111-111111111103', 'Sandwich Steak', 'Entrecote de boeuf, sauce pesto, fromage mozzarella', 9000, 4, true, true),

  ('11111111-1111-1111-1111-111111111104', 'Classic Burger', 'Viande hachee, salade, tomates, oignons', 7000, 1, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Cheese Burger', 'Viande hachee, salade verte, salade coleslaw, cheddar, sauce maison', 8000, 2, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Burger Rico', '2 viande 100g, double fromage, champignons de Paris, sauce barbecue, salade iceberg', 9000, 3, true, true),
  ('11111111-1111-1111-1111-111111111104', 'Chicken Burger', 'Blanc de poulet, salade verte, cheddar, sauce maison', 8000, 4, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Double Mozzarella', '2 smatch viande, mozzarella pane, jambon de boeuf, cheddar, salade verte', 10000, 5, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Zinger Burger', 'Poulet crunchy, jalapeno, cheddar, salade verte', 9000, 6, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Burger Extincteur', '2 viandes 100g, 2 fromages, oignons frais, piment ++', 9000, 7, false, true),
  ('11111111-1111-1111-1111-111111111104', 'Burger Black Angus', 'Viande 150g Black Angus, salade, cornichon, fromage emmental, sauce creme champignons', 10000, 8, true, true),
  ('11111111-1111-1111-1111-111111111104', 'Burger Wagyu', 'Viande 150g Wagyu, tranche oignon, salade verte, jambon de boeuf, fromage emmental, sauce creme champignons', 15000, 9, true, true),

  ('11111111-1111-1111-1111-111111111105', 'Tagliatelles Poulet', '', 8000, 1, false, true),
  ('11111111-1111-1111-1111-111111111105', 'Spaghetti Bolognaise', '', 6000, 2, false, true),
  ('11111111-1111-1111-1111-111111111105', 'Tagliatelle aux Gambas', '', 12000, 3, true, true),
  ('11111111-1111-1111-1111-111111111105', 'Spaghetti Crevettes', '', 10000, 4, false, true),

  ('11111111-1111-1111-1111-111111111106', 'Pizza Calabraise', '', 11000, 1, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Royal', '', 8500, 2, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Reine', '', 8000, 3, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Rico', '', 9000, 4, true, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Peperoni', '', 10000, 5, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Margherita', '', 7000, 6, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Mexicaine', '', 8500, 7, false, true),
  ('11111111-1111-1111-1111-111111111106', 'Pizza Poulet', '', 9000, 8, false, true),

  ('11111111-1111-1111-1111-111111111107', 'Filet de Boeuf IMP', '250g - 300g / accompagnement au choix', 16000, 1, true, true),
  ('11111111-1111-1111-1111-111111111107', 'Entrecote Extra', '350g - 390g / accompagnement au choix', 14000, 2, false, true),
  ('11111111-1111-1111-1111-111111111107', 'Entrecote Black Angus', '300g - 300g / accompagnement au choix', 25000, 3, true, true),
  ('11111111-1111-1111-1111-111111111107', 'Entrecote Wagyu', '250g - 300g / accompagnement au choix', 40000, 4, true, true),
  ('11111111-1111-1111-1111-111111111107', 'Cotelettes d''Agneau IMP (500g)', '500g / accompagnement au choix', 25000, 5, false, true),
  ('11111111-1111-1111-1111-111111111107', 'Cotelettes d''Agneau IMP (1kg)', '1kg / accompagnement au choix', 40000, 6, false, true),
  ('11111111-1111-1111-1111-111111111107', 'Choucouya de Mouton', '250g - 300g / accompagnement au choix', 13000, 7, false, true),
  ('11111111-1111-1111-1111-111111111107', 'Chawarma a l''Ivoirienne', 'Mix d''emincer de boeuf & poulet aux epices d''Afrique', 9000, 8, false, true),
  ('11111111-1111-1111-1111-111111111107', 'Brochettes Mix', '', 12000, 9, false, true),

  ('11111111-1111-1111-1111-111111111108', 'Demi Poulet Braise', '250g - 300g / accompagnement au choix', 8000, 1, false, true),
  ('11111111-1111-1111-1111-111111111108', 'Blanc de Poulet Braise', '250g - 300g blanc de poulet, accompagnement au choix', 8000, 2, false, true),
  ('11111111-1111-1111-1111-111111111108', 'Kedjenou de Poulet', '', 7000, 3, true, true),
  ('11111111-1111-1111-1111-111111111108', 'Choukouya Poulet', '', 8000, 4, false, true),
  ('11111111-1111-1111-1111-111111111108', 'Crispy', '', 8000, 5, false, true),

  ('11111111-1111-1111-1111-111111111109', 'Gambas Braise', '', 16000, 1, true, true),
  ('11111111-1111-1111-1111-111111111109', 'Filet de Merou Pane', 'Sauce tartare', 12000, 2, false, true),
  ('11111111-1111-1111-1111-111111111109', 'Duo de Merou et Crevettes', 'Sauce maison', 18000, 3, true, true),

  ('11111111-1111-1111-1111-111111111110', 'Garba Rico', '', 7000, 1, true, true),
  ('11111111-1111-1111-1111-111111111110', 'Accompagnement', 'Frites, pommes sautees, alloco, attieke, riz blanc, legumes sautes, puree de pomme de terre', 2000, 2, false, true),

  ('11111111-1111-1111-1111-111111111111', 'Famille (5 pers)', 'Demi poulet, choucouya de mouton, filet de boeuf, entrecote, burger classique, chicken burger, poulet desosse, frite alloco', 60000, 1, true, true),
  ('11111111-1111-1111-1111-111111111111', 'Amis (3 pers)', 'Demi poulet, choucouya de mouton, filet de boeuf, entrecote, frite alloco', 40000, 2, false, true),
  ('11111111-1111-1111-1111-111111111111', 'Croquant (2 pers)', 'Chicken tender, gambas pane, ailes de poulet pane, alloco, frites', 20000, 3, false, true),
  ('11111111-1111-1111-1111-111111111111', 'Combo de Mer', 'Les choix: Langouste, gambas, calamar, filet de poisson, crabe. Vous avez droit a 2 choix, a partir du 3eme supplement 10.000F, 2 accompagnements au choix', 35000, 4, true, true),

  ('11111111-1111-1111-1111-111111111112', 'Cocktail Rico', 'Orange, ananas, passion et sirop de grenadine', 5000, 1, true, true),
  ('11111111-1111-1111-1111-111111111112', 'Mojito', '', 5000, 2, false, true),
  ('11111111-1111-1111-1111-111111111112', 'Pina Colada', '', 5000, 3, false, true),
  ('11111111-1111-1111-1111-111111111112', 'Paradise Menthole', 'Jus d''orange, tonic, menthe glaciale', 5000, 4, false, true),
  ('11111111-1111-1111-1111-111111111112', 'Coco Chanel', 'Boisson energie, tonic, sirop bleu', 5000, 5, false, true),
  ('11111111-1111-1111-1111-111111111112', 'Limonade de Ciel', 'Citron, gingembre, miel', 5000, 6, false, true),

  ('11111111-1111-1111-1111-111111111113', 'Jus de Pomme', '', 4000, 1, false, true),
  ('11111111-1111-1111-1111-111111111113', 'Jus d''Ananas', '', 4000, 2, false, true),
  ('11111111-1111-1111-1111-111111111113', 'Jus d''Orange', '', 4000, 3, false, true),
  ('11111111-1111-1111-1111-111111111113', 'Jus Passion', '', 4000, 4, false, true),
  ('11111111-1111-1111-1111-111111111113', 'Jus Carotte', '', 4000, 5, false, true),

  ('11111111-1111-1111-1111-111111111114', 'Expresso', '', 2500, 1, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Cappuccino', '', 3000, 2, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Chocolat Chaud', '', 3000, 3, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Cafe au Lait', '', 2000, 4, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Nescafe', '', 3000, 5, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Carafe de The Nature', '', 4000, 6, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Carafe de The a la Menthe', '', 4000, 7, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Carafe The au Gingembre', '', 5000, 8, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Carafe de Zhourat Melange de Fleurs', '', 5000, 9, false, true),
  ('11111111-1111-1111-1111-111111111114', 'Cafe Libanais', '', 5000, 10, true, true),
  ('11111111-1111-1111-1111-111111111114', 'Cafe Latte', '', 4000, 11, false, true),

  ('11111111-1111-1111-1111-111111111115', 'Eau Grande', '', 1500, 1, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Eau Petite', '', 1000, 2, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Soda', '', 1500, 3, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Perrier', '', 2000, 4, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Orangina', '', 2000, 5, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Boisson Energisante', '', 2000, 6, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Ice Tea Peche', '', 3000, 7, false, true),
  ('11111111-1111-1111-1111-111111111115', 'Redbull', '', 4000, 8, false, true),

  ('11111111-1111-1111-1111-111111111116', 'Chocolat', '', 5000, 1, false, true),
  ('11111111-1111-1111-1111-111111111116', 'Vanille', '', 5000, 2, false, true),
  ('11111111-1111-1111-1111-111111111116', 'Caramel', '', 5000, 3, false, true),
  ('11111111-1111-1111-1111-111111111116', 'Oreo', '', 5000, 4, true, true),
  ('11111111-1111-1111-1111-111111111116', 'Cerelac', '', 6000, 5, false, true),

  ('11111111-1111-1111-1111-111111111117', 'Crepes Nutella', '', 5000, 1, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Crepes Oreo', '', 6000, 2, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Crepes Kinder', '', 6000, 3, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Crepes 3 Chocolats', '', 5000, 4, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Crepes Sucre', '', 4000, 5, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Coupe de Glace', '3 boules', 6000, 6, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Fondant Chocolat', '', 8000, 7, true, true),
  ('11111111-1111-1111-1111-111111111117', 'Crepe Fouree', '', 7000, 8, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Pain Perdu', '', 7000, 9, false, true),
  ('11111111-1111-1111-1111-111111111117', 'Plat de Fruit Rico', '', 10000, 10, false, true),

  ('11111111-1111-1111-1111-111111111118', 'Pomme', '', 6000, 1, false, true),
  ('11111111-1111-1111-1111-111111111118', 'Raisin', '', 5000, 2, false, true),
  ('11111111-1111-1111-1111-111111111118', 'Raisin Menthe', '', 5000, 3, false, true),
  ('11111111-1111-1111-1111-111111111118', 'Citron Menthe', '', 5000, 4, false, true),
  ('11111111-1111-1111-1111-111111111118', 'Love 66', '', 7000, 5, true, true),
  ('11111111-1111-1111-1111-111111111118', 'Hawai', '', 7000, 6, false, true);
