import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '../types';

gsap.registerPlugin(ScrollTrigger);

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

    const setupAnimation = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

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
      <div className="relative lg:absolute top-0 left-0 right-0 z-20 pt-8 lg:pt-24 pb-6 px-4 bg-gradient-to-b from-[#a5a5a5]/10 via-[#a5a5a5]/10 to-transparent dark:from-[#050505] dark:via-[#050505] dark:to-transparent">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#000000] dark:text-white mb-2">
            Meus Projetos
          </h2>
          <p className="text-[#535353] dark:text-[#a5a5a5] mb-4 text-sm md:text-base">
            {window.innerWidth >= 1024 ? 'Role para explorar meus trabalhos' : 'Arraste para ver mais projetos'}
          </p>

          <div className="max-w-md mx-auto">
            <div className="h-1 bg-[#a5a5a5]/30 dark:bg-[#535353]/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
              <span>01</span>
              <span>0{projects.length + 1}</span>
            </div>
          </div>
        </div>
      </div>

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
                className="flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] max-w-4xl snap-center"
              >
                <div className="bg-white dark:bg-[#292929] rounded-3xl overflow-hidden shadow-2xl border border-[#a5a5a5]/30 dark:border-[#535353] h-full flex flex-col lg:flex-row">
                  {/* Imagem - 40% da largura no desktop */}
                  <div className="w-full lg:w-[40%] h-48 sm:h-56 lg:h-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Conteúdo - 60% da largura no desktop */}
                  <div className="w-full lg:w-[60%] p-4 sm:p-5 lg:p-6 flex flex-col justify-center space-y-3">
                    {/* Número */}
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500/20 leading-none">
                      0{index + 1}
                    </span>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#000000] dark:text-white -mt-4 sm:-mt-6 line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="text-[#535353] dark:text-[#a5a5a5] text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tecnologias */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={tech}
                          className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium border ${colors[techIndex % colors.length]}`}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-0.5 text-[#7c7c7c] dark:text-[#a5a5a5] text-xs">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#000000] dark:bg-[#535353] text-white rounded-full hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-all hover:scale-105 text-xs sm:text-sm font-medium"
                      >
                        <Github size={14} />
                        Código
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 dark:bg-emerald-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-105 text-xs sm:text-sm font-medium shadow-lg hover:shadow-blue-500/25"
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Card "Ver Mais Projetos" */}
          <div className="flex-shrink-0 w-[85vw] sm:w-[70vw] lg:w-[60vw] max-w-4xl snap-center">
            <a
              href="https://github.com/JezzXL?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full group"
            >
              <div className="bg-gradient-to-br from-blue-600/10 via-violet-600/10 to-purple-600/10 dark:from-violet-500/20 dark:via-violet-500/20 dark:to-purple-500/20 rounded-3xl overflow-hidden shadow-2xl border-2 border-dashed border-purple-500/40 dark:border-violet-400/40 h-full flex flex-col lg:flex-row items-center justify-center p-8 lg:p-12 hover:scale-[1.02] hover:border-purple-500 dark:hover:border-violet-400 transition-all duration-300 hover:shadow-violet-500/25">
                
                <div className="text-center space-y-4 lg:space-y-6">
                  {/* Ícone GitHub com animação */}
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                    <div className="relative bg-gradient-to-r from-gray-950 to-violet-600 dark:from-violet-500 dark:to-gray-950 p-6 lg:p-8 rounded-full group-hover:scale-110 transition-transform duration-300">
                      <Github className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                    </div>
                  </div>

                  {/* Número especial */}
                  <span className="block text-5xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-300 dark:from-green-400 dark:to-emeral-400">
                    +10
                  </span>

                  {/* Título */}
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#000000] dark:text-white">
                    Ver Mais Projetos
                  </h3>

                  {/* Descrição */}
                  <p className="text-[#535353] dark:text-[#a5a5a5] text-sm lg:text-base max-w-md mx-auto">
                    Explore meu repositório no GitHub para ver mais de 10 projetos desenvolvidos com diversas tecnologias
                  </p>

                  {/* Badges de tecnologias */}
                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    {['React', 'TypeScript', 'Node.js', 'Python', 'Next.js', 'Firebase'].map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-violet-500/10 dark:bg-gray-500/20 text-violet-700 dark:text-violet-400 rounded-full text-xs font-medium border border-violet-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    <span className="px-3 py-1 text-violet-600 dark:text-purple-400 text-xs font-bold">
                      e mais...
                    </span>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-950 to-violet-600 dark:from-violet-500 dark:to-gray-950 text-white rounded-full font-semibold text-sm lg:text-base shadow-lg group-hover:shadow-blue-500/50 transition-all group-hover:gap-3">
                      Visitar GitHub
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-3 mt-6 lg:absolute lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2">
        {[...projects, { id: 'more' }].map((_, index) => {
          const totalItems = projects.length + 1;
          const isActive = progress >= index / totalItems && progress < (index + 1) / totalItems;
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-violet-500 scale-150' 
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