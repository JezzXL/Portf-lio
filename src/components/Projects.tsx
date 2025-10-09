import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';
import dashboardImg from '.src/assets/dashboard.png';

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce App',
    description: 'Uma loja online completa com carrinho e pagamentos.',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Stripe'],
    github: 'https://github.com/joao/ecommerce',
    demo: 'https://demo-ecommerce.joao.dev',
    image: 'https://via.placeholder.com/400x250/3B82F6/FFFFFF?text=E-commerce',
  },
  {
    id: 2,
    title: 'Dashboard Admin',
    description: 'Painel de administração com gráficos e autenticação.',
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind'],
    github: 'https://github.com/JezzXL/Dashboard',
    demo: 'https://dashboard-woad-nu.vercel.app/',
    image: dashboardImg,
  },
  {
    id: 3,
    title: 'Blog Pessoal',
    description: 'Blog com CMS headless e SEO otimizado.',
    technologies: ['Next.js', 'TypeScript', 'Strapi', 'Tailwind'],
    github: 'https://github.com/joao/blog',
    demo: 'https://blog.joao.dev',
    image: 'https://via.placeholder.com/400x250/EF4444/FFFFFF?text=Blog',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meus Projetos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                    <Github size={16} className="mr-1" /> GitHub
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} className="mr-1" /> Demo
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
