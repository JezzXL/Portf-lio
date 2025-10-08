import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simula envio (integre com EmailJS aqui)
    console.log('Formulário enviado:', formData);
    alert('Mensagem enviada com sucesso! (Demo)');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);
    
    // Remove mensagem de sucesso após 3 segundos
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    { icon: Mail, label: 'davydsantos.gt@gmail.com', href: 'mailto:davydsantos.gt@gmail.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/davydwillianp/' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/JezzXL' },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gostou do meu trabalho? Vamos conversar!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulário */}
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
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Seu Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              placeholder="Sua Mensagem"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Enviar Mensagem
            </button>
            {isSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-600 dark:text-green-400 text-center font-semibold"
              >
                ✓ Mensagem enviada com sucesso!
              </motion.p>
            )}
          </motion.form>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
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
                    className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Card de Disponibilidade */}
            <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                💼 Disponível para Freelance
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Atualmente aceitando novos projetos. Respondo em até 24 horas!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;