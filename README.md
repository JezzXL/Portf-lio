# 🚀 Portfolio Pessoal - Davyd Willian

<div align="center">

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Portfolio moderno e responsivo construído com as tecnologias mais recentes**

[🌐 Ver Demo](https://davydwillian.vercel.app/) • [📧 Contato](mailto:davydsantos.gt@gmail.com) • [💼 LinkedIn](https://www.linkedin.com/in/davydwillianp/)

</div>

## 📸 Screenshots

### Desktop
![Desktop](./src/assets/screenshot.png)

### Mobile
![Mobile](./src/assets/mobilescr.png)

---

## ✨ Features

- 🎨 **Design Moderno** - Interface limpa e profissional
- 🌓 **Dark/Light Mode** - Tema escuro e claro com persistência
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em todos os dispositivos
- ⚡ **Performance Otimizada** - Build rápido e carregamento instantâneo
- 🎭 **Animações Suaves** - Transições elegantes com Framer Motion
- 📧 **Formulário de Contato** - Integração com EmailJS para envio de mensagens
- 🎯 **Single Page App** - Navegação suave entre seções
- ♿ **Acessível** - Seguindo as melhores práticas de acessibilidade

## 🛠️ Tecnologias

### Frontend
- **React 19.1** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9** - Superset JavaScript com tipagem estática
- **Tailwind CSS 4.1** - Framework CSS utility-first moderno
- **Vite 7.1** - Build tool extremamente rápida

### Bibliotecas
- **Framer Motion** - Animações fluidas e interativas
- **Lucide React** - Ícones SVG modernos e customizáveis
- **EmailJS** - Envio de emails sem backend

### Dev Tools
- **ESLint** - Linting e análise de código
- **TypeScript ESLint** - Regras específicas para TypeScript

## 📁 Estrutura do Projeto

```
portfolio/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Header.tsx    # Cabeçalho com navegação
│   │   ├── Hero.tsx      # Seção principal
│   │   ├── About.tsx     # Sobre mim
│   │   ├── Projects.tsx  # Portfolio de projetos
│   │   └── Contact.tsx   # Formulário de contato
│   ├── types/            # Definições TypeScript
│   │   └── index.ts      # Interfaces e tipos
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globais + Tailwind
├── public/               # Arquivos estáticos
├── index.html           # HTML base
├── package.json         # Dependências
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
└── tailwind.config.js   # Configuração Tailwind (opcional)
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JezzXL/seu-repositorio.git

# Entre no diretório
cd seu-repositorio

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### Build para Produção

```bash
# Gera build otimizado
npm run build

# Preview do build
npm run preview
```

## 🎨 Personalização

### Cores e Tema

As cores podem ser personalizadas no arquivo `src/index.css`:

```css
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
}
```

### Conteúdo

Edite os seguintes arquivos para personalizar o conteúdo:

- `Hero.tsx` - Nome, título e descrição principal
- `About.tsx` - Informações sobre você e habilidades
- `Projects.tsx` - Seus projetos e portfolio
- `Contact.tsx` - Links de contato e redes sociais

### Configuração EmailJS

1. Crie uma conta em [EmailJS.com](https://www.emailjs.com/)
2. Configure um Email Service
3. Crie um Email Template
4. Adicione suas credenciais em `Contact.tsx`:

```typescript
await emailjs.send(
  'YOUR_SERVICE_ID',
  'YOUR_TEMPLATE_ID',
  formData,
  'YOUR_PUBLIC_KEY'
);
```

## 📊 Scripts Disponíveis

```bash
npm run dev       # Inicia servidor de desenvolvimento
npm run build     # Cria build de produção
npm run preview   # Preview do build
npm run lint      # Executa ESLint
```

## 🌐 Deploy

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JezzXL/seu-repositorio)

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/JezzXL/Portf-lio)

### GitHub Pages

```bash
npm run build
# Configure GitHub Pages para servir da pasta dist/
```

## 📝 Seções do Portfolio

### 🏠 Home (Hero)
Apresentação principal com nome, título e CTAs para projetos e contato.

### 👨‍💻 Sobre
Informações profissionais, educação, experiência e habilidades técnicas organizadas por nível.

### 💼 Projetos
Showcase de projetos desenvolvidos com tecnologias, descrições e links para repositório/demo.

### 📧 Contato
Formulário de contato integrado com EmailJS e links para redes sociais.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Davyd Willian**

- GitHub: [@JezzXL](https://github.com/JezzXL)
- LinkedIn: [Davyd Willian](https://www.linkedin.com/in/davydwillianp/)
- Email: davydsantos.gt@gmail.com
- Localização: São Luís, Maranhão - Brasil 🇧🇷

## 🙏 Agradecimentos

- [React](https://react.dev/) - Biblioteca base
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animações
- [Lucide Icons](https://lucide.dev/) - Ícones
- [EmailJS](https://www.emailjs.com/) - Serviço de email
- [Unsplash](https://unsplash.com/) - Imagens de alta qualidade

## 📈 Status do Projeto

✅ **Completo e em produção**

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Feito com ❤️ e ☕ por [Davyd Willian](https://github.com/JezzXL)

</div>
