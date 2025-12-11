import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

// Adicionar estilo para esconder scrollbar
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce',
    description: 'Uma loja online completa com carrinho de compras, integração de pagamentos e painel administrativo.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    github: 'https://github.com/JezzXL/TechStore-E-commerce',
    demo: 'https://tech-store-e-commerce-blue.vercel.app/',
    image: 'https://raw.githubusercontent.com/JezzXL/TechStore-E-commerce/refs/heads/main/screenshots/home.png',
  },
  {
    id: 2,
    title: 'Dashboard Admin',
    description: 'Painel administrativo completo com gráficos interativos, autenticação e gerenciamento de usuários.',
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    github: 'https://github.com/JezzXL/dashboard',
    demo: 'https://dashboard-woad-nu.vercel.app/',
    image: 'https://raw.githubusercontent.com/JezzXL/Dashboard/refs/heads/main/screenshots/dashboard.PNG',
  },
  {
    id: 3,
    title: 'Task Flow',
    description: 'Aplicativo para gerenciamento de tarefas com integração de calendário e notificações.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', '@dnd-kit'],
    github: 'https://github.com/JezzXL/TaskFlow',
    demo: 'https://taskflow-nu-one.vercel.app/',
    image: 'https://raw.githubusercontent.com/JezzXL/TaskFlow/refs/heads/main/screenshots/login.PNG',
  },
  {
    id: 4,
    title: 'GymSchedule',
    description: 'Plataforma full-stack para gestão de aulas fitness com autenticação Firebase, painel admin completo e estatísticas em tempo real.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Zustand', 'Tailwind'],
    github: 'https://github.com/JezzXL/Site-GYM',
    demo: 'https://testegymsch.firebaseapp.com',
    image: 'https://raw.githubusercontent.com/JezzXL/Site-GYM/refs/heads/main/src/assets/Home.png',
  },
  {
  id: 5,
  title: 'NEXUS - Tour Virtual 3D Imobiliário',
  description: 'Landing page premium com tour virtual 3D interativo. Integração de modelo Blender GLB/GLTF, navegação inteligente por scroll ou botões, transições suaves entre 7 cômodos, cidade 3D animada no Hero, iluminação realista com sombras, e cards informativos com timing personalizado.',
  technologies: ['React', 'TypeScript', 'Three.js', 'WebGL', 'Tailwind', 'Vite'],
  github: 'https://github.com/JezzXL/Landing-Page',
  demo: 'https://construtoranexus.vercel.app',
  image: 'https://raw.githubusercontent.com/JezzXL/Portf-lio/refs/heads/main/public/Nexus.png',
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    if (!section || !container) return;

    // Função para configurar a animação
    const setupAnimation = () => {
      // Limpar ScrollTriggers existentes
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // No mobile, não aplicar scroll horizontal
      if (window.innerWidth < 1024) {
        return;
      }

      const totalWidth = container.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          }
        }
      });

      tl.to(container, {
        x: () => -totalWidth,
        ease: 'none'
      });
    };

    setupAnimation();

    // Reconfigurar no resize
    window.addEventListener('resize', setupAnimation);

    return () => {
      window.removeEventListener('resize', setupAnimation);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative lg:h-screen bg-[#a5a5a5]/10 dark:bg-[#050505] py-20 lg:py-0"
    >
      {/* Header fixo */}
      <div className="relative lg:absolute top-0 left-0 right-0 z-20 pt-8 lg:pt-24 pb-6 px-4 bg-gradient-to-b from-[#a5a5a5]/10 via-[#a5a5a5]/10 to-transparent dark:from-[#050505] dark:via-[#050505] dark:to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000000] dark:text-white mb-2">
            Meus Projetos
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-2"></div>
          <p className="text-[#535353] dark:text-[#a5a5a5] mb-4 text-sm md:text-base">
            {window.innerWidth >= 1024 ? 'Role para explorar meus trabalhos' : 'Arraste para ver mais projetos'}
          </p>

          {/* Barra de progresso */}
          <div className="max-w-md mx-auto">
            <div className="h-1 bg-[#a5a5a5]/30 dark:bg-[#535353]/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
              <span>01</span>
              <span>0{projects.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Container horizontal para desktop / scroll horizontal no mobile */}
      <div className="h-full flex items-center mt-0 lg:mt-0">
        <div 
          ref={containerRef}
          className="flex lg:flex-row gap-8 lg:gap-8 px-4 lg:px-[50vw] w-full lg:w-auto overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
          onScroll={(e) => {
            if (window.innerWidth < 1024) {
              const scrollLeft = e.currentTarget.scrollLeft;
              const newProgress = scrollLeft / (e.currentTarget.scrollWidth - e.currentTarget.clientWidth);
              setProgress(newProgress);
            }
          }}
        >
          {projects.map((project, index) => {
            const colors = [
              'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
              'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
              'bg-violet-500/20 text-violet-700 dark:text-violet-400 border-violet-500/30',
              'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30',
            ];

            return (
              <div
                key={project.id}
                className="flex-shrink-0 w-[85vw] sm:w-[75vw] lg:w-[80vw] max-w-full lg:max-w-5xl snap-center"
              >
                <div className="bg-white dark:bg-[#292929] rounded-3xl overflow-hidden shadow-2xl border border-[#a5a5a5]/30 dark:border-[#535353] h-full flex flex-col">
                  {/* Imagem */}
                  <div className="w-full h-48 sm:h-56 md:h-64 lg:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="w-full p-4 sm:p-6 lg:p-8 flex flex-col justify-center space-y-3 lg:space-y-4">
                    {/* Número */}
                    <span className="text-4xl sm:text-5xl lg:text-7xl font-bold text-blue-500/20 leading-none">
                      0{index + 1}
                    </span>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#000000] dark:text-white -mt-6 sm:-mt-8 lg:-mt-10">
                      {project.title}
                    </h3>

                    <p className="text-[#535353] dark:text-[#a5a5a5] text-xs sm:text-sm lg:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border ${colors[techIndex % colors.length]}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#000000] dark:bg-[#535353] text-white rounded-full hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-all hover:scale-105 text-xs sm:text-sm font-medium"
                      >
                        <Github size={16} />
                        Código
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-105 text-xs sm:text-sm font-medium shadow-lg hover:shadow-blue-500/25"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicadores */}
      <div className="relative lg:absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-3 mt-8 lg:mt-0">
        {projects.map((_, index) => {
          const isActive = progress >= index / projects.length && progress < (index + 1) / projects.length;
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-500 scale-150' 
                  : 'bg-[#a5a5a5] dark:bg-[#535353]'
              }`}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Projects;