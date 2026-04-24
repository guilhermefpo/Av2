# ✈️ Aerocode GUI

### Sistema de Gestão de Produção de Aeronaves (SPA com React)

## 📌 Sobre o Projeto

Este projeto consiste no desenvolvimento da primeira **Interface Gráfica de Usuário (GUI)** do sistema **Aerocode**, substituindo a versão anterior baseada em CLI por uma aplicação web moderna.

A aplicação será construída como uma **SPA (Single Page Application)** utilizando **React**, com foco em:

- Usabilidade
- Performance
- Escalabilidade
- Experiência do usuário (UX)

O sistema é voltado para gestão da produção de aeronaves em ambientes industriais de alta precisão.

---

## 🎯 Objetivo

- Reduzir a curva de aprendizado dos usuários
- Melhorar a visualização e controle da produção
- Permitir gestão centralizada e intuitiva
- Preparar o sistema para grandes empresas do setor aeronáutico

---

## 🏭 Público-Alvo

- Engenheiros de Produção
- Engenheiros Aeronáuticos
- Gestores industriais

### 🧠 Contexto de Uso

Ambientes industriais críticos, onde:

- Clareza visual é essencial
- Erros operacionais podem gerar impactos significativos
- Decisões precisam ser rápidas e baseadas em dados

---

## 📌 Padrão de Commits (Conventional Commits)

| Tipo         | Quando usar                           | Exemplo de mensagem                                |
| ------------ | ------------------------------------- | -------------------------------------------------- |
| **feat**     | Nova funcionalidade                   | feat: adiciona tela de login                       |
| **fix**      | Correção de bug                       | fix: corrige erro ao validar formulário            |
| **chore**    | Tarefas gerais / setup / manutenção   | chore: configura estrutura inicial do projeto      |
| **docs**     | Documentação                          | docs: adiciona README com instruções de uso        |
| **style**    | Formatação (sem alterar lógica)       | style: ajusta indentação e remove espaços extras   |
| **refactor** | Refatoração (sem mudar comportamento) | refactor: melhora organização do componente Header |
| **perf**     | Melhoria de performance               | perf: otimiza renderização da lista                |
| **test**     | Criação ou ajuste de testes           | test: adiciona testes para componente Button       |
| **build**    | Build tools / bundlers                | build: ajusta configuração do projeto              |
| **ci**       | Integração contínua (CI/CD)           | ci: adiciona workflow do GitHub Actions            |

---

## 🧠 Estrutura padrão

```bash
tipo: descrição curta e clara
```

---

## 📂 Estrutura de Pastas

```
 Av2_gerson

├── 📁 Docs
│   └── 📕 Documentação Av2.pdf
├── 📁 front_end
│   ├── 📁 public
│   │   └── 📄 aerocode.ico
│   ├── 📁 src
│   │   ├── 📁 assets
│   │   │   ├── 🖼️ aerocodelogo.png
│   │   │   └── 🖼️ aviao.png
│   │   ├── 📁 components
│   │   │   ├── 📁 layout
│   │   │   │   ├── 🎨 Cards.module.css
│   │   │   │   ├── 📄 Cards.tsx
│   │   │   │   ├── 🎨 Header.module.css
│   │   │   │   ├── 📄 Header.tsx
│   │   │   │   ├── 🎨 LinkBotao.module.css
│   │   │   │   ├── 📄 LinkBotao.tsx
│   │   │   │   ├── 🎨 TabelaAvioes.module.css
│   │   │   │   └── 📄 TabelaAvioes.tsx
│   │   │   └── 📁 pages
│   │   │       ├── 🎨 Funcionarios.module.css
│   │   │       ├── 📄 Funcionarios.tsx
│   │   │       ├── 🎨 Gestao.module.css
│   │   │       ├── 📄 Gestao.tsx
│   │   │       ├── 🎨 Login.module.css
│   │   │       ├── 📄 Login.tsx
│   │   │       ├── 🎨 Montagem.module.css
│   │   │       ├── 📄 Montagem.tsx
│   │   │       ├── 🎨 Pecas.module.css
│   │   │       ├── 📄 Pecas.tsx
│   │   │       ├── 🎨 Testes.module.css
│   │   │       └── 📄 Testes.tsx
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   └── 📄 main.tsx
│   ├── 📄 eslint.config.js
│   ├── 🌐 index.html
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   ├── ⚙️ tsconfig.app.json
│   ├── ⚙️ tsconfig.json
│   ├── ⚙️ tsconfig.node.json
│   └── 📄 vite.config.ts
├── 📁 prototype
│   ├── 📁 Logo
│   │   └── 🖼️ aerocodelogo.png
│   ├── 📁 MockFlow
│   │   ├── 🖼️ Gestão Av2.png
│   │   ├── 🖼️ Montagem Av2.png
│   │   └── 🖼️ Tela de Login AV2.png
│   ├── 📁 favicon
│   │   ├── 🖼️ android-chrome-192x192.png
│   │   ├── 🖼️ android-chrome-512x512.png
│   │   ├── 🖼️ apple-touch-icon.png
│   │   ├── 🖼️ favicon-16x16.png
│   │   ├── 🖼️ favicon-32x32.png
│   │   └── 📄 site.webmanifest
│   └── 📁 figma
│       └── 📄 Figma_Av2.txt
├── ⚙️ .gitignore
└── 📝 README.md
```

---
