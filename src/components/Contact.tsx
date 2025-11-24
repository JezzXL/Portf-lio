import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, Download } from 'lucide-react';
import emailjs from '@emailjs/browser';
import * as THREE from 'three';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number | null>(null);

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
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const spheres: THREE.Mesh[] = [];
    const sphereCount = 15;
    const isDark = document.documentElement.classList.contains('dark');

    for (let i = 0; i < sphereCount; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: isDark ? 0x535353 : 0xa5a5a5,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.x = (Math.random() - 0.5) * 12;
      sphere.position.y = (Math.random() - 0.5) * 8;
      sphere.position.z = (Math.random() - 0.5) * 5;
      
      sphere.userData = {
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: (Math.random() - 0.5) * 0.01,
        rotationSpeed: Math.random() * 0.02,
      };
      
      spheres.push(sphere);
      scene.add(sphere);
    }

    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: isDark ? 0x7c7c7c : 0x535353, 
      transparent: true, 
      opacity: 0.1 
    });

    const gridGeometry = new THREE.PlaneGeometry(30, 30, 30, 30);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x292929 : 0x7c7c7c,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI * 0.4;
    grid.position.y = -3;
    grid.position.z = -2;
    scene.add(grid);

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
      spheres.forEach(sphere => {
        (sphere.material as THREE.MeshBasicMaterial).color.set(isDarkNow ? 0x535353 : 0xa5a5a5);
      });
      gridMaterial.color.set(isDarkNow ? 0x292929 : 0x7c7c7c);
      lineMaterial.color.set(isDarkNow ? 0x7c7c7c : 0x535353);
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

      spheres.forEach((sphere) => {
        sphere.position.x += sphere.userData.speedX;
        sphere.position.y += sphere.userData.speedY;
        sphere.rotation.x += sphere.userData.rotationSpeed;
        sphere.rotation.y += sphere.userData.rotationSpeed * 0.5;

        if (Math.abs(sphere.position.x) > 6) sphere.userData.speedX *= -1;
        if (Math.abs(sphere.position.y) > 4) sphere.userData.speedY *= -1;

        sphere.position.x += mouseX * 0.02;
        sphere.position.y += mouseY * 0.02;
      });

      grid.rotation.z = elapsedTime * 0.02;
      const positions = gridGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        positions[i + 2] = Math.sin(x * 0.3 + elapsedTime * 0.5) * 0.2 + 
                           Math.cos(y * 0.3 + elapsedTime * 0.3) * 0.2;
      }
      gridGeometry.attributes.position.needsUpdate = true;

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
      
      spheres.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.MeshBasicMaterial).dispose();
        scene.remove(sphere);
      });
      gridGeometry.dispose();
      gridMaterial.dispose();
      lineMaterial.dispose();
      scene.remove(grid);
      renderer.dispose();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_mq5f41t',
        'template_g614yim',
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'davydsantos.gt@gmail.com',
        },
        'LY3V6hJicNfrgxqFq'
      );

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const socialLinks = [
    { icon: Mail, label: 'davydsantos.gt@gmail.com', href: 'mailto:davydsantos.gt@gmail.com', color: 'hover:text-red-500', iconColor: 'text-red-500' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/davydwillianp/', color: 'hover:text-blue-500', iconColor: 'text-blue-500' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/JezzXL', color: 'hover:text-[#000] dark:hover:text-white', iconColor: 'text-[#535353] dark:text-[#a5a5a5]' },
  ];

  return (
    <div ref={sectionRef} id="contact" className="relative py-20 bg-white dark:bg-[#000000] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#000000] dark:text-white mb-4">
            Entre em Contato
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-[#535353] dark:text-[#a5a5a5]">
            Gostou do meu trabalho? Vamos conversar!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Seu Nome"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white/80 dark:bg-[#292929]/80 backdrop-blur-sm text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353] transition-all"
            />
            <input
              type="email"
              name="email"
              placeholder="Seu Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white/80 dark:bg-[#292929]/80 backdrop-blur-sm text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353] transition-all"
            />
            <textarea
              name="message"
              placeholder="Sua Mensagem"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white/80 dark:bg-[#292929]/80 backdrop-blur-sm text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353] transition-all"
            />
            
            {/* Botão enviar com azul */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/25"
            >
              {status === 'sending' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Enviar Mensagem
                </>
              )}
            </button>

            {/* Sucesso com verde */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-lg flex items-center gap-3 backdrop-blur-sm"
              >
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <p className="text-emerald-700 dark:text-emerald-400 font-medium text-sm">
                  Mensagem enviada com sucesso! Responderei em breve.
                </p>
              </motion.div>
            )}

            {/* Erro com vermelho */}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg flex items-center gap-3 backdrop-blur-sm"
              >
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-red-700 dark:text-red-400 font-medium text-sm">
                  Erro ao enviar. Tente novamente ou envie um email direto.
                </p>
              </motion.div>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-[#000000] dark:text-white">
              Conecte-se Comigo
            </h3>
            <div className="space-y-4">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 text-[#535353] dark:text-[#a5a5a5] ${link.color} transition-colors p-3 rounded-lg hover:bg-[#a5a5a5]/10 dark:hover:bg-[#292929] backdrop-blur-sm`}
                  >
                    <Icon size={20} className={link.iconColor} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
              
              {/* Botão currículo destacado com roxo */}
              <a
                href="/Davyd-WebDeveloper.pdf"
                download="DavydWillian-WebDeveloper.pdf"
                className="flex items-center space-x-3 p-4 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500 text-white font-semibold hover:from-violet-700 hover:to-purple-700 transition-all hover:scale-[1.02] shadow-lg hover:shadow-violet-500/25"
              >
                <Download size={20} />
                <span>Baixar Currículo (PDF)</span>
              </a>
            </div>

            {/* Card disponível com verde */}
            <div className="mt-8 p-6 bg-emerald-500/10 dark:bg-emerald-500/10 backdrop-blur-sm rounded-lg border border-emerald-500/30">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mt-1 animate-pulse shadow-lg shadow-emerald-500/50" />
                <div>
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    💼 Disponível para trabalho
                  </h4>
                  <p className="text-[#535353] dark:text-[#a5a5a5] text-sm">
                    Atualmente aceitando novos projetos. Respondo em até 24 horas!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;