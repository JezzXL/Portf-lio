import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // EMAILJS
      await emailjs.send(
        'service_mq5f41t',      // Service ID
        'template_g614yim',     // Template ID
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'davydsantos.gt@gmail.com', // email
        },
        'LY3V6hJicNfrgxqFq'       // Public Key
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
    { icon: Mail, label: 'davydsantos.gt@gmail.com', href: 'mailto:davydsantos.gt@gmail.com', isDownload: false },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/davydwillianp/', isDownload: false },
    { icon: Github, label: 'GitHub', href: 'https://github.com/JezzXL', isDownload: false },
    { icon: FileText, label: 'Baixar Currículo (PDF)', href: '/Davyd-WebDeveloper.pdf', isDownload: true },
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-[#000000]">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#000000] dark:text-white mb-4">
            Entre em Contato
          </h2>
          <div className="w-20 h-1 bg-[#535353] dark:bg-[#7c7c7c] mx-auto rounded-full mb-4"></div>
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
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white dark:bg-[#292929] text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#535353] dark:focus:ring-[#7c7c7c] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353]"
            />
            <input
              type="email"
              name="email"
              placeholder="Seu Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white dark:bg-[#292929] text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#535353] dark:focus:ring-[#7c7c7c] disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353]"
            />
            <textarea
              name="message"
              placeholder="Sua Mensagem"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full p-3 border border-[#a5a5a5] dark:border-[#535353] rounded-lg bg-white dark:bg-[#292929] text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#535353] dark:focus:ring-[#7c7c7c] resize-none disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-[#7c7c7c] dark:placeholder:text-[#535353]"
            />
            
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-[#000000] dark:bg-[#535353] text-white py-3 rounded-lg hover:bg-[#292929] dark:hover:bg-[#7c7c7c] transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#535353]/20 dark:bg-[#535353]/30 border border-[#535353] dark:border-[#7c7c7c] rounded-lg flex items-center gap-3"
              >
                <CheckCircle className="w-5 h-5 text-[#000000] dark:text-[#a5a5a5] flex-shrink-0" />
                <p className="text-[#000000] dark:text-[#a5a5a5] font-medium text-sm">
                  Mensagem enviada com sucesso! Responderei em breve.
                </p>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-[#7c7c7c]/20 dark:bg-[#7c7c7c]/30 border border-[#7c7c7c] dark:border-[#a5a5a5] rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-[#292929] dark:text-[#a5a5a5] flex-shrink-0" />
                <p className="text-[#292929] dark:text-[#a5a5a5] font-medium text-sm">
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
                    target={link.isDownload ? undefined : "_blank"}
                    rel={link.isDownload ? undefined : "noopener noreferrer"}
                    download={link.isDownload ? "DavydWillian-WebDeveloper.pdf" : undefined}
                    className={`flex items-center space-x-3 text-[#535353] dark:text-[#a5a5a5] hover:text-[#000000] dark:hover:text-white transition-colors p-3 rounded-lg hover:bg-[#a5a5a5]/10 dark:hover:bg-[#292929] ${
                      link.isDownload ? 'font-semibold border-2 border-dashed border-[#7c7c7c] dark:border-[#535353] bg-[#a5a5a5]/10 dark:bg-[#292929]/50' : ''
                    }`}
                  >
                    <Icon size={20} className={link.isDownload ? "text-[#292929] dark:text-[#7c7c7c]" : "text-[#535353] dark:text-[#7c7c7c]"} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 p-6 bg-[#535353]/10 dark:bg-[#292929] rounded-lg border border-[#7c7c7c]/30 dark:border-[#535353]">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-[#535353] dark:bg-[#7c7c7c] rounded-full mt-1 animate-pulse" />
                <div>
                  <h4 className="font-semibold text-[#000000] dark:text-white mb-2">
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
    </section>
  );
};

export default Contact;