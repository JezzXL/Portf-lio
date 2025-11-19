import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsAppButton';

const Footer = () => (
  <footer className="bg-[#292929] dark:bg-[#000000] text-white py-8 border-t border-[#535353] dark:border-[#292929]">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <p className="text-[#a5a5a5]">&copy; {new Date().getFullYear()} Davyd Developer. Todos os direitos reservados.</p>
      <p className="mt-2 text-sm text-[#7c7c7c]">
        Feito com ❤️ usando React, TypeScript e Tailwind CSS
      </p>
    </div>
  </footer>
);

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Carrega tema salvo
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
    <div className="min-h-screen bg-[#a5a5a5]/10 dark:bg-[#000000] transition-colors">
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