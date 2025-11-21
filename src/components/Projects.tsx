import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useRef } from 'react';
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
    title: 'GymSchedule - Sistema de Agendamento',
    description: 'Plataforma full-stack para gestão de aulas fitness com autenticação Firebase, painel admin completo, sistema de reservas com validação de capacidade e estatísticas em tempo real.',
    technologies: ['React', 'TypeScript', 'Firebase', 'Zustand', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/JezzXL/Site-GYM',
    demo: 'https://testegymsch.firebaseapp.com',
    image: 'https://raw.githubusercontent.com/JezzXL/Site-GYM/refs/heads/main/src/assets/Home.png',
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, scale, x }}
      className="sticky top-24 mb-8"
    >
      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-white dark:bg-[#292929] rounded-2xl shadow-2xl overflow-hidden border border-[#a5a5a5]/30 dark:border-[#535353] p-6 lg:p-0`}>
        {/* Imagem do Projeto */}
        <div className="w-full lg:w-1/2 h-64 lg:h-96 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Conteúdo */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 space-y-6">
          {/* Número do projeto */}
          <span className="text-6xl lg:text-8xl font-bold text-[#a5a5a5]/30 dark:text-[#535353]/30">
            0{index + 1}
          </span>

          <h3 className="text-2xl lg:text-4xl font-bold text-[#000000] dark:text-white -mt-12 lg:-mt-16">
            {project.title}
          </h3>

          <p className="text-[#535353] dark:text-[#a5a5a5] text-base lg:text-lg leading-relaxed">
            {project.description}
          </p>

          {/* Tecnologias */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-[#535353]/10 dark:bg-[#535353]/30 text-[#000000] dark:text-[#a5a5a5] rounded-full text-sm font-medium border border-[#535353]/20 dark:border-[#535353]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-[#000000] dark:bg-[#535353] text-white rounded-full hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-all hover:scale-105 font-medium"
            >
              <Github size={20} />
              Código
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#535353] dark:border-[#7c7c7c] text-[#000000] dark:text-white rounded-full hover:bg-[#535353]/10 dark:hover:bg-[#7c7c7c]/20 transition-all hover:scale-105 font-medium"
              >
                <ExternalLink size={20} />
                Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" className="py-20 bg-[#a5a5a5]/10 dark:bg-[#050505] transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] dark:text-white mb-4">
            Meus Projetos
          </h2>
          <div className="w-20 h-1 bg-[#535353] dark:bg-[#7c7c7c] mx-auto rounded-full"></div>
          <p className="mt-4 text-[#535353] dark:text-[#a5a5a5] max-w-2xl mx-auto">
            Confira alguns dos projetos que desenvolvi usando tecnologias modernas
          </p>
        </motion.div>

        {/* Barra de progresso */}
        <div className="sticky top-20 z-20 mb-8">
          <div className="h-1 bg-[#a5a5a5]/30 dark:bg-[#535353]/30 rounded-full overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full bg-[#535353] dark:bg-[#7c7c7c] rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-[#7c7c7c] dark:text-[#a5a5a5]">
            <span>01</span>
            <span>0{projects.length}</span>
          </div>
        </div>

        {/* Container dos projetos com scroll */}
        <div ref={containerRef} className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Indicador final */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mt-20 pt-10 border-t border-[#a5a5a5]/30 dark:border-[#535353]"
        >
          <p className="text-[#7c7c7c] dark:text-[#a5a5a5] text-lg">
            Quer ver mais? Confira meu{' '}
            <a
              href="https://github.com/JezzXL"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#000000] dark:text-white font-semibold hover:underline"
            >
              GitHub
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;