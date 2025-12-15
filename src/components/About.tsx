import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Code2, Award } from 'lucide-react';
import type { Skill } from '../types';

const skills: Skill[] = [
  { name: 'React', level: 'intermediate' },
  { name: 'Java', level: 'beginner' },
  { name: 'C#', level: 'beginner' },
  { name: 'SQL', level: 'intermediate' },
  { name: 'TypeScript', level: 'intermediate' },
  { name: 'Tailwind CSS', level: 'intermediate' },
  { name: 'Node.js', level: 'intermediate' },
  { name: 'MongoDB', level: 'intermediate' },
  { name: 'Git & GitHub', level: 'advanced' },
  { name: 'Next.js', level: 'intermediate' },
  { name: 'REST APIs', level: 'advanced' },
];

const getLevelStyle = (level: string) => {
  switch (level) {
    case 'advanced':
      return 'bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40';
    case 'intermediate':
      return 'bg-amber-500/20 dark:bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/40';
    default:
      return 'bg-[#a5a5a5]/20 dark:bg-[#292929] text-[#535353] dark:text-[#a5a5a5] border border-[#a5a5a5]/30';
  }
};

const getLevelText = (level: string) => {
  switch (level) {
    case 'advanced':
      return 'Avançado';
    case 'intermediate':
      return 'Intermediário';
    default:
      return 'Básico';
  }
};

const About = () => {
  const highlights = [
    {
      icon: Briefcase,
      title: 'Experiência',
      description: 'Designer Gráfico - Freelancer ',
      detail: '2022-2024',
    },
    {
      icon: GraduationCap,
      title: 'Educação',
      description: 'Analise e Desenvolvimento de Sistemas',
      detail: 'Uniasselvi',
    },
    {
      icon: Code2,
      title: 'Projetos',
      description: '7+ projetos concluídos',
      detail: 'Web & Mobile',
    },
    {
      icon: Award,
      title: 'Certificações',
      description: '',
      detail: 'HTML, CSS, JavaScript, React, TypeScript',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] dark:text-white mb-4">
            Sobre Mim
          </h2>
          <div className="w-20 h-1 bg-violet-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert">
              <p className="text-lg text-[#535353] dark:text-[#a5a5a5] leading-relaxed">
                Sou um{' '}
                <span className="font-semibold text-violet-600 dark:text-violet-400">
                  desenvolvedor web Full Stack.
                </span>{' '}
                apaixonado por transformar ideias em produtos digitais escaláveis, funcionais e user-friendly.
              </p>
              <p className="text-lg text-[#535353] dark:text-[#a5a5a5] leading-relaxed">
                Formado em Análise e Desenvolvimento de Sistemas, tenho base sólida em frontend, com foco em interfaces modernas e centradas no usuário, e atualmente estou expandindo minha atuação para o backend, com estudos e prática em Java, C# e SQL.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-[#a5a5a5]/10 dark:bg-[#292929] rounded-lg border border-[#a5a5a5]/30 dark:border-[#535353] hover:border-violet-500 dark:hover:border-violet-400 transition-colors"
                  >
                    <Icon className="w-8 h-8 text-violet-600 dark:text-violet-400 mb-2" />
                    <h4 className="font-semibold text-[#000000] dark:text-white text-sm mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
                      {item.description}
                    </p>
                    <p className="text-xs text-violet-600 dark:text-violet-400 font-medium mt-1">
                      {item.detail}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Code2 className="w-8 h-8 text-violet-600 dark:text-violet-400" />
              <h3 className="text-2xl font-semibold text-[#000000] dark:text-white">
                Habilidades Técnicas
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-[#292929] p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-[#a5a5a5]/30 dark:border-[#535353]"
                >
                  <div className="flex flex-col space-y-2">
                    <span className="font-semibold text-[#000000] dark:text-white text-sm">
                      {skill.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium inline-block w-fit ${getLevelStyle(
                        skill.level
                      )}`}
                    >
                      {getLevelText(skill.level)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex gap-4 text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span>Avançado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span>Intermediário</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;