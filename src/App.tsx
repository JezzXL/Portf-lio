import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';

const Footer = () => (
  <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 border-t border-gray-700">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Davyd Developer. Todos os direitos reservados.</p>
      <p className="mt-2 text-sm text-gray-400">
        Feito com ❤️ usando React, TypeScript e Tailwind CSS
      </p>
    </div>
  </footer>
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Carrega tema salvo ou detecta preferência do sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header currentTheme={theme} onThemeToggle={toggleTheme} />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default App;