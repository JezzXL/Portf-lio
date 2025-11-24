import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';
import type { Project } from '../types';

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
];

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToProject = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(newIndex);
    }
  };

  const goNext = () => {
    if (currentIndex < projects.length - 1) {
      scrollToProject(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      scrollToProject(currentIndex - 1);
    }
  };

  return (
    <section id="projects" className="min-h-screen bg-[#a5a5a5]/10 dark:bg-[#050505] py-20">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="text-center mb-8 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-[#000000] dark:text-white mb-2"
          >
            Meus Projetos
          </motion.h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-2"></div>
          <p className="text-[#535353] dark:text-[#a5a5a5]">
            Arraste ou use as setas para navegar
          </p>

          {/* Barra de progresso com azul */}
          <div className="max-w-md mx-auto mt-4">
            <div className="h-1 bg-[#a5a5a5]/30 dark:bg-[#535353]/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500 rounded-full"
                animate={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="flex justify-between mt-1 text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
              <span>01</span>
              <span>0{projects.length}</span>
            </div>
          </div>
        </div>

        {/* Container de scroll horizontal */}
        <div className="relative flex-1">
          {/* Botão Anterior com azul */}
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-[#292929] shadow-lg border border-[#a5a5a5]/30 dark:border-[#535353] transition-all ${
              currentIndex === 0 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:scale-110 hover:bg-blue-500 hover:text-white hover:border-blue-500'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Botão Próximo com azul */}
          <button
            onClick={goNext}
            disabled={currentIndex === projects.length - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white dark:bg-[#292929] shadow-lg border border-[#a5a5a5]/30 dark:border-[#535353] transition-all ${
              currentIndex === projects.length - 1 
                ? 'opacity-30 cursor-not-allowed' 
                : 'hover:scale-110 hover:bg-blue-500 hover:text-white hover:border-blue-500'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-full snap-center px-4 md:px-16 lg:px-24 flex items-center justify-center"
              >
                <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-center bg-white dark:bg-[#292929] rounded-3xl p-6 lg:p-10 shadow-2xl border border-[#a5a5a5]/30 dark:border-[#535353]">
                  {/* Imagem */}
                  <div className="w-full lg:w-3/5 h-48 md:h-64 lg:h-[350px] rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Conteúdo */}
                  <div className="w-full lg:w-2/5 space-y-4">
                    {/* Número do projeto com azul */}
                    <span className="text-6xl lg:text-8xl font-bold text-blue-500/20 leading-none block">
                      0{index + 1}
                    </span>

                    <h3 className="text-2xl lg:text-3xl font-bold text-[#000000] dark:text-white -mt-8 lg:-mt-12">
                      {project.title}
                    </h3>

                    <p className="text-[#535353] dark:text-[#a5a5a5] text-sm lg:text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tecnologias com cores variadas */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => {
                        const colors = [
                          'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30',
                          'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
                          'bg-violet-500/20 text-violet-700 dark:text-violet-400 border-violet-500/30',
                          'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500/30',
                        ];
                        return (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[techIndex % colors.length]}`}
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#000000] dark:bg-[#535353] text-white rounded-full hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-all hover:scale-105 text-sm font-medium"
                      >
                        <Github size={18} />
                        Código
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-105 text-sm font-medium shadow-lg hover:shadow-blue-500/25"
                        >
                          <ExternalLink size={18} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores com azul */}
        <div className="flex justify-center gap-3 mt-6 pb-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-[#a5a5a5] dark:bg-[#535353] hover:bg-blue-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;