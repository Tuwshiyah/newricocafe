import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CategoriesPage from './pages/CategoriesPage';
import MenuPage from './pages/MenuPage';
import FeaturedPage from './pages/FeaturedPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/featured" element={<FeaturedPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
}
