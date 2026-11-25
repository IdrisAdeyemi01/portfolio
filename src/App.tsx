import { useEffect, useState } from 'react';
import { About } from './components/About';
import { ContactFooter } from './components/ContactFooter';
import { Experience } from './components/Experience';
import { FeaturedWork } from './components/FeaturedWork';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { SpeakingAndAchievements } from './components/SpeakingAndAchievements';
import { applyTheme, getInitialTheme, type ThemeId } from './theme';

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-canvas text-ink transition-colors duration-200">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
      >
        Skip to main content
      </a>

      <Navbar theme={theme} onThemeChange={setTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <FeaturedWork />
        <SpeakingAndAchievements />
        <ContactFooter />
      </main>
    </div>
  );
}
