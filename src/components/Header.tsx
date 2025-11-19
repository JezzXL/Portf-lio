import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  currentTheme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Header = ({ currentTheme, onThemeToggle }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'contact', label: 'Contato' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/90 dark:bg-[#292929]/90 backdrop-blur-md shadow-md z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={scrollToTop}
          className="text-2xl font-bold text-[#535353] dark:text-[#a5a5a5] hover:text-[#7c7c7c] dark:hover:text-white transition-colors"
        >
          Davyd Developer
        </button>
        
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[#535353] dark:text-[#a5a5a5] hover:text-[#000000] dark:hover:text-white transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-[#a5a5a5]/20 dark:bg-[#535353] hover:bg-[#a5a5a5]/30 dark:hover:bg-[#7c7c7c] transition-colors"
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <Sun size={20} className="text-[#a5a5a5]" />
            ) : (
              <Moon size={20} className="text-[#535353]" />
            )}
          </button>
        </nav>

        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg bg-[#a5a5a5]/20 dark:bg-[#535353] hover:bg-[#a5a5a5]/30 dark:hover:bg-[#7c7c7c] transition-colors"
            aria-label="Toggle theme"
          >
            {currentTheme === 'dark' ? (
              <Sun size={20} className="text-[#a5a5a5]" />
            ) : (
              <Moon size={20} className="text-[#535353]" />
            )}
          </button>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-[#a5a5a5]/20 dark:hover:bg-[#535353] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-[#535353] dark:text-[#a5a5a5]" />
            ) : (
              <Menu size={24} className="text-[#535353] dark:text-[#a5a5a5]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-[#292929] border-t border-[#a5a5a5] dark:border-[#535353] shadow-lg">
          <ul className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-3 px-4 rounded-lg text-[#535353] dark:text-[#a5a5a5] hover:bg-[#a5a5a5]/20 dark:hover:bg-[#535353] transition-colors"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;