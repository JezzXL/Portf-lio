import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/JezzXL', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/davydwillianp/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:davydsantos.gt@gmail.com', label: 'Email' },
  ];

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a5a5a5]/20 via-[#7c7c7c]/10 to-[#535353]/20 dark:from-[#000000] dark:via-[#292929] dark:to-[#000000] pt-20 transition-colors"
    >
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-[#535353]/20 dark:bg-[#535353]/30 text-[#000000] dark:text-[#a5a5a5] rounded-full text-sm font-medium border border-[#7c7c7c]/30 dark:border-[#535353]">
              👋 Disponível para novos projetos
            </span>
          </motion.div>

          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#000000] dark:text-white leading-tight">
            Olá, eu sou{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#535353] to-[#000000] dark:from-[#7c7c7c] dark:to-[#a5a5a5]">
              Davyd Developer
            </span>
          </h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#535353] dark:text-[#a5a5a5] max-w-3xl mx-auto"
          >
            Desenvolvedor{' '}
            <span className="font-semibold text-[#000000] dark:text-[#7c7c7c]">
              Front end
            </span>{' '}
            apaixonado por criar experiências digitais incríveis com React,
            TypeScript e tecnologias modernas.
          </motion.p>

          {/* Botões de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center px-8 py-4 bg-[#000000] dark:bg-[#535353] text-white rounded-full hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-all hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              Ver Meus Projetos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a 
            href="/davyd_developer_curriculo.pdf"
            download="DavydWillian-WebDeveloper.pdf"
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#292929] to-[#535353] dark:from-[#535353] dark:to-[#7c7c7c] text-white rounded-full hover:from-[#000000] hover:to-[#292929] dark:hover:from-[#7c7c7c] dark:hover:to-[#a5a5a5] transition-all hover:scale-105 shadow-lg hover:shadow-xl font-semibold'
            >
              <FileText className="mr-2 w-5 h-5" />
              Baixar currículo
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-white dark:bg-[#292929] text-[#000000] dark:text-white border-2 border-[#535353] dark:border-[#535353] rounded-full hover:border-[#000000] dark:hover:border-[#7c7c7c] hover:bg-[#a5a5a5]/10 dark:hover:bg-[#535353] transition-all hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
            >
              Entre em Contato
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center gap-4 pt-8"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-[#292929] rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all text-[#535353] dark:text-[#a5a5a5] hover:text-[#000000] dark:hover:text-white border border-[#a5a5a5]/30 dark:border-[#535353]"
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
            className="pt-12 cursor-pointer"
            onClick={scrollToContent}
          >
            <div className="flex flex-col items-center text-[#7c7c7c] dark:text-[#535353]">
              <span className="text-sm mb-2">Scroll para descobrir mais</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <div className="w-6 h-10 border-2 border-[#7c7c7c] dark:border-[#535353] rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-[#7c7c7c] dark:bg-[#535353] rounded-full mt-2" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;