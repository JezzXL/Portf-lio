import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const phoneNumber = '5598970105056';
  const message = 'Olá! Vi seu portfólio e gostaria de conversar sobre oportunidades.';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Botão Principal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 bg-[#535353] hover:bg-[#7c7c7c] dark:bg-[#292929] dark:hover:bg-[#535353] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
          aria-label="WhatsApp"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={28} />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle size={28} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Pulse Animation */}
          {!isOpen && (
            <span className="absolute inset-0 rounded-full bg-[#535353] dark:bg-[#292929] animate-ping opacity-75" />
          )}
        </button>

        {/* Tooltip */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 bg-[#292929] dark:bg-[#000000] text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap text-sm font-medium hidden md:block border border-[#535353]"
          >
            Fale comigo no WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
              <div className="border-8 border-transparent border-l-[#292929] dark:border-l-[#000000]" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Card de Mensagem */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-28 right-6 z-50 w-80 bg-white dark:bg-[#292929] rounded-2xl shadow-2xl overflow-hidden border border-[#a5a5a5]/30 dark:border-[#535353]"
          >
            {/* Header */}
            <div className="bg-[#535353] dark:bg-[#000000] p-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white dark:bg-[#292929] rounded-full flex items-center justify-center">
                <MessageCircle size={24} className="text-[#535353] dark:text-[#7c7c7c]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Davyd Developer</h3>
                <p className="text-[#a5a5a5] text-xs">Geralmente responde em minutos</p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="bg-[#a5a5a5]/20 dark:bg-[#535353]/30 rounded-lg p-3">
                <p className="text-[#000000] dark:text-[#a5a5a5] text-sm">
                  👋 Olá! Como posso ajudar você?
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[#535353] dark:text-[#a5a5a5] text-sm">
                  Envie uma mensagem para iniciar uma conversa:
                </p>
                
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-[#535353] hover:bg-[#7c7c7c] dark:bg-[#535353] dark:hover:bg-[#7c7c7c] text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Iniciar Conversa
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#7c7c7c] dark:text-[#a5a5a5]">
                <div className="w-2 h-2 bg-[#535353] dark:bg-[#7c7c7c] rounded-full animate-pulse" />
                <span>Online agora</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;