import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce',
    description: 'Uma loja online completa com carrinho de compras, integração de pagamentos e painel administrativo.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Zustand'],
    github: 'https://github.com/JezzXL/TechStore-E-commerce',
    demo: 'https://tech-store-e-commerce-blue.vercel.app/',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Dashboard Admin',
    description: 'Painel administrativo completo com gráficos interativos, autenticação e gerenciamento de usuários.',
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    github: 'https://github.com/JezzXL/dashboard',
    demo: 'https://dashboard-woad-nu.vercel.app/',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Task Flow',
    description: 'Aplicativo para gerenciamento de tarefas com integração de calendário e notificações.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', '@dnd-kit'],
    github: 'https://github.com/JezzXL/TaskFlow',
    image: 'https://raw.githubusercontent.com/JezzXL/TaskFlow/refs/heads/main/screenshots/login.PNG',
  },
  {
    id: 4,
    title: 'App Mobile Fitness',
    description: 'Aplicativo de treinos personalizados com tracking de progresso e integração com wearables.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    github: 'https://github.com/JezzXL/fitness-app',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Sistema de Reservas',
    description: 'Plataforma de agendamento online com calendário interativo e notificações automáticas.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
    github: 'https://github.com/JezzXL/booking-system',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Marketplace NFT',
    description: 'Plataforma de compra e venda de NFTs com carteira integrada e leilões.',
    technologies: ['React', 'Web3.js', 'Solidity', 'IPFS'],
    github: 'https://github.com/JezzXL/nft-marketplace',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=500&fit=crop&q=80',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meus Projetos
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-blue-400 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Confira alguns dos projetos que desenvolvi usando tecnologias modernas
          </p>
        </motion.div>

        {/* Grid de Projetos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-200 dark:border-gray-700"
            >
              {/* Imagem do Projeto */}
              <div className="relative overflow-hidden h-48">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tecnologias */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    <Github size={18} />
                    <span className="text-sm">Código</span>
                  </a>
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
