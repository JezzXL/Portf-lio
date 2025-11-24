import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    let isAnimating = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    rendererRef.current = renderer;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const isDark = document.documentElement.classList.contains('dark');
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      color: isDark ? 0xa5a5a5 : 0x535353,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const waveGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);
    const waveMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x292929 : 0x7c7c7c,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = -Math.PI * 0.35;
    waveMesh.position.y = -2;
    scene.add(waveMesh);

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let isMouseInside = false;

    const handleMouseMove = (event: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      targetMouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleMouseEnter = () => {
      isMouseInside = true;
    };

    const handleMouseLeave = () => {
      isMouseInside = false;
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      sectionElement.addEventListener('mousemove', handleMouseMove);
      sectionElement.addEventListener('mouseenter', handleMouseEnter);
      sectionElement.addEventListener('mouseleave', handleMouseLeave);
    }

    const handleResize = () => {
      if (!isAnimating) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const observer = new MutationObserver(() => {
      if (!isAnimating) return;
      const isDarkNow = document.documentElement.classList.contains('dark');
      particlesMaterial.color.set(isDarkNow ? 0xa5a5a5 : 0x535353);
      waveMaterial.color.set(isDarkNow ? 0x292929 : 0x7c7c7c);
    });

    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    const clock = new THREE.Clock();
    
    const animate = () => {
      if (!isAnimating) return;
      
      const elapsedTime = clock.getElapsedTime();

      if (isMouseInside) {
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
      }

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = mouseY * 0.3;
      particlesMesh.position.x = mouseX * 0.5;

      const positions = waveGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.5 + elapsedTime) * 0.3 + 
                           Math.sin(y * 0.5 + elapsedTime * 0.5) * 0.3;
      }
      waveGeometry.attributes.position.needsUpdate = true;
      waveMesh.rotation.z = elapsedTime * 0.02;

      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isAnimating = false;
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (sectionElement) {
        sectionElement.removeEventListener('mousemove', handleMouseMove);
        sectionElement.removeEventListener('mouseenter', handleMouseEnter);
        sectionElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      
      scene.remove(particlesMesh);
      scene.remove(waveMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      renderer.dispose();
      rendererRef.current = null;
    };
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/JezzXL', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/davydwillianp/', label: 'LinkedIn', color: 'hover:text-blue-500' },
    { icon: Mail, href: 'mailto:davydsantos.gt@gmail.com', label: 'Email', color: 'hover:text-red-500' },
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
    <div 
      ref={sectionRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a5a5a5]/20 via-[#7c7c7c]/10 to-[#535353]/20 dark:from-[#000000] dark:via-[#292929] dark:to-[#000000] pt-20 transition-colors overflow-hidden"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge com verde para disponibilidade */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block"
          >
            <span className="px-4 py-2 bg-emerald-500/20 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/40 backdrop-blur-sm flex items-center gap-2 mx-auto w-fit">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Disponível para novos projetos
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#000000] dark:text-white leading-tight">
            Olá, eu sou{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
              Davyd Developer
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-[#535353] dark:text-[#a5a5a5] max-w-3xl mx-auto"
          >
            Desenvolvedor{' '}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              Front end
            </span>{' '}
            apaixonado por criar experiências digitais incríveis com React,
            TypeScript e tecnologias modernas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Botão principal com azul */}
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-600 transition-all hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-semibold"
            >
              Ver Meus Projetos
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Botão currículo com roxo/violeta */}
            <a 
              href="/davyd_developer_curriculo.pdf"
              download="DavydWillian-WebDeveloper.pdf"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500 text-white rounded-full hover:from-violet-700 hover:to-purple-700 dark:hover:from-violet-600 dark:hover:to-purple-600 transition-all hover:scale-105 shadow-lg hover:shadow-violet-500/25 font-semibold"
            >
              <FileText className="mr-2 w-5 h-5" />
              Baixar Currículo
            </a>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center px-8 py-4 bg-white/80 dark:bg-[#292929]/80 backdrop-blur-sm text-[#000000] dark:text-white border-2 border-[#535353] dark:border-[#535353] rounded-full hover:border-blue-500 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105 shadow-lg font-semibold"
            >
              Entre em Contato
            </button>
          </motion.div>

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
                  className={`p-3 bg-white/80 dark:bg-[#292929]/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all text-[#535353] dark:text-[#a5a5a5] hover:text-[#000000] dark:hover:text-white border border-[#a5a5a5]/30 dark:border-[#535353] ${social.color || ''}`}
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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
    </div>
  );
};

export default Hero;  