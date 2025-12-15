import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, ShoppingCart, Calendar, CheckCircle2, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  type: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  icon: React.ElementType;
}

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Desenvolvedor Web & Designer Gráfico',
    company: 'Freelancer',
    period: 'Dez 2024 - Atual',
    type: 'Autônomo',
    description: 'Desenvolvimento de websites e aplicações web modernas combinado com design gráfico para redes sociais.',
    responsibilities: [
      'Desenvolvimento de sites e aplicações web responsivas com React, TypeScript e Tailwind CSS',
      'Criação de identidades visuais e materiais digitais para redes sociais',
      'Gestão completa de projetos digitais: do briefing ao deploy',
      'Atendimento e prospecção de clientes através das redes sociais',
      'Implementação de soluções personalizadas focadas em performance e UX'
    ],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Design Gráfico', 'UI/UX', 'Redes Sociais'],
    icon: Code2
  },
  {
    id: 2,
    title: 'Designer Gráfico',
    company: 'Freelancer',
    period: '2022 – 2024',
    type: 'Autônomo',
    description: 'Desenvolvimento de identidades visuais e materiais digitais para redes sociais.',
    responsibilities: [
      'Desenvolvimento de identidades visuais e materiais digitais para redes sociais',
      'Gestão completa de projetos: briefing, criação, revisão e entrega final',
      'Atendimento e negociação com clientes, garantindo alinhamento de requisitos e expectativas',
      'Criação de conteúdo estratégico com foco em engajamento, clareza da mensagem e consistência visual'
    ],
    skills: ['Design Gráfico', 'Gestão de Projetos', 'Atendimento ao Cliente', 'Redes Sociais'],
    icon: Briefcase
  },
  {
    id: 3,
    title: 'Vendedor e Repositor',
    company: 'Varejo',
    period: '2017 - 2020',
    type: 'CLT',
    description: 'Atendimento ao cliente, operação de caixa e organização do ambiente de vendas.',
    responsibilities: [
      'Atendimento ao cliente, operação de caixa e organização do ambiente de vendas',
      'Controle de estoque, reposição e suporte logístico',
      'Montagem de displays e vitrines (Visual Merchandising)',
      'Desenvolvimento de habilidades de comunicação, organização e trabalho em equipe'
    ],
    skills: ['Atendimento ao Cliente', 'Visual Merchandising', 'Trabalho em Equipe', 'Organização'],
    icon: ShoppingCart
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animar header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
          }
        });
      }

      // Animar linha do timeline
      if (timelineRef.current) {
        gsap.from(timelineRef.current, {
          scaleY: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
          }
        });
      }

      // Animar cada card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;
        
        gsap.from(card, {
          opacity: 0,
          x: isEven ? -100 : 100,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        });

        // Animar responsabilidades
        const responsibilities = card.querySelectorAll('.responsibility-item');
        if (responsibilities.length > 0) {
          gsap.from(responsibilities, {
            opacity: 0,
            x: -20,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
            }
          });
        }

        // Animar skills
        const skills = card.querySelectorAll('.skill-tag');
        if (skills.length > 0) {
          gsap.from(skills, {
            opacity: 0,
            scale: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
            }
          });
        }

        // Hover effect no card
        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            duration: 0.3,
            ease: 'power2.out'
          });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
      });

      // Animar summary
      if (summaryRef.current) {
        gsap.from(summaryRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.8,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: summaryRef.current,
            start: 'top 85%',
          }
        });

        // Animar o número de anos
        const yearsElement = summaryRef.current.querySelector('.years-count');
        if (yearsElement) {
          ScrollTrigger.create({
            trigger: yearsElement,
            start: 'top 80%',
            onEnter: () => {
              gsap.from(yearsElement, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                onUpdate: function() {
                  yearsElement.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                }
              });
            },
            once: true
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-[#a5a5a5]/10 dark:bg-[#000000] transition-colors">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#000000] dark:text-white mb-4">
            Experiência Profissional
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-[#535353] dark:text-[#a5a5a5] max-w-2xl mx-auto">
            Minha trajetória profissional, desde o design até o varejo
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div 
            ref={timelineRef}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-violet-500 to-blue-500 origin-top"
          ></div>

          {/* Experiências */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <div 
                      ref={(el) => {
                        cardsRef.current[index] = el;
                      }}
                      className="bg-white dark:bg-[#292929] rounded-2xl p-6 shadow-lg border border-[#a5a5a5]/30 dark:border-[#535353] transition-all duration-300"
                    >
                      {/* Header do Card */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg blur-sm opacity-50"></div>
                          <div className="relative bg-gradient-to-r from-blue-600 to-violet-600 p-3 rounded-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#000000] dark:text-white mb-1">
                            {exp.title}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {exp.company}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-[#7c7c7c] dark:text-[#a5a5a5]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {exp.period}
                            </span>
                            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-medium border border-emerald-500/40">
                              {exp.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Descrição */}
                      <p className="text-[#535353] dark:text-[#a5a5a5] mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Responsabilidades */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-[#000000] dark:text-white mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                          Principais Responsabilidades:
                        </h4>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <li 
                              key={idx}
                              className="responsibility-item text-sm text-[#535353] dark:text-[#a5a5a5] pl-6 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full"
                            >
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-[#a5a5a5]/30 dark:border-[#535353]">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="skill-tag px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium border border-blue-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Marcador central (desktop) */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full items-center justify-center shadow-lg border-4 border-white dark:border-[#000000] z-10">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Espaço vazio do outro lado (desktop) */}
                  <div className="hidden md:block w-[calc(50%-2rem)]"></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Summary */}
        <div ref={summaryRef} className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-blue-600/10 to-violet-600/10 dark:from-blue-500/20 dark:to-violet-500/20 rounded-2xl p-6 border border-blue-500/30">
            <p className="text-[#535353] dark:text-[#a5a5a5] text-sm mb-2">
              Total de experiência profissional
            </p>
            <p className="years-count text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              8+
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;  