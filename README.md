# ✈️ Aerocode GUI

---

### Sistema de Gestão de Produção de Aeronaves (SPA com React)

<h1 align="center">
<a href="https://developer.mozilla.org/en-US/docs/Web/HTML"><img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white"/></a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white"/></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/></a>
</h1>

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

## ✨ Módulos e Funcionalidades

A aplicação simula um ecossistema completo de produção através dos seguintes módulos:

- **🔐 Autenticação & Cadastro:** Acesso restrito com diferenciação de cargos. Permite o auto-cadastro ou registro via administrador.
- **👥 Gestão de Equipe (/funcionarios):** Controle total (CRUD) do quadro técnico, com permissões de edição e exclusão exclusivas para administradores.
- **🏗️ Linha de Montagem (/montagem):** Visualização do progresso das aeronaves em tempo real.
- **📦 Inventário de Peças (/pecas):** Gestão de componentes, fornecedores e status de disponibilidade.
- **🧪 Controle de Qualidade (/testes):** Registro de testes críticos (Hidráulicos, Elétricos) com aprovação técnica.
- **📊 Gestão Geral (/gestao):** Dashboard central para visão macro da operação.

---

## 💻 Stack Tecnológica

O AeroCode utiliza as ferramentas mais modernas do ecossistema Frontend:

- **Core:** [React](https://reactjs.org/) (Hooks, Functional Components)
- **Tipagem:** [TypeScript](https://www.typescriptlang.org/) (Interfaces robustas)
- **Build Tool:** [Vite](https://vitejs.dev/) (Velocidade instantânea de refresh)
- **Roteamento:** [React Router Dom v6](https://reactrouter.com/)
- **Estilização:** CSS Modules (Escopo local para evitar conflitos de estilo)
- **Persistência:** LocalStorage API (Simulação de banco de dados no navegador)

---

## 📂 Arquitetura do Repositório

```
└── 📁 Av2
    ├── 📁 Docs
    │   └── 📕 Documentação Av2.pdf
    ├── 📁 front_end
    │   ├── 📁 public
    │   │   └── 📄 aerocode.ico
    │   ├── 📁 src
    │   │   ├── 📁 assets
    │   │   │   ├── 🖼️ aerocodelogo.png
    │   │   │   ├── 🖼️ aviao.png
    │   │   │   ├── 🖼️ aviao2.png
    │   │   │   └── 🖼️ aviao3.png
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
    │   │   │   ├── 📁 pages
    │   │   │   │   ├── 🎨 CadastroGeral.module.css
    │   │   │   │   ├── 🎨 CadastroUsuario.module.css
    │   │   │   │   ├── 📄 CadastroUsuario.tsx
    │   │   │   │   ├── 🎨 Controle.module.css
    │   │   │   │   ├── 📄 Controle.tsx
    │   │   │   │   ├── 📄 EditarFuncionario.tsx
    │   │   │   │   ├── 🎨 Funcionarios.module.css
    │   │   │   │   ├── 📄 Funcionarios.tsx
    │   │   │   │   ├── 🎨 Gestao.module.css
    │   │   │   │   ├── 📄 Gestao.tsx
    │   │   │   │   ├── 🎨 Login.module.css
    │   │   │   │   ├── 📄 Login.tsx
    │   │   │   │   ├── 🎨 Montagem.module.css
    │   │   │   │   ├── 📄 Montagem.tsx
    │   │   │   │   ├── 🎨 NovoAviao.module.css
    │   │   │   │   ├── 📄 NovoAviao.tsx
    │   │   │   │   ├── 📄 NovoFuncionario.tsx
    │   │   │   │   ├── 📄 NovoPeca.tsx
    │   │   │   │   ├── 📄 NovoTeste.tsx
    │   │   │   │   ├── 🎨 Pecas.module.css
    │   │   │   │   ├── 📄 Pecas.tsx
    │   │   │   │   ├── 🎨 Testes.module.css
    │   │   │   │   └── 📄 Testes.tsx
    │   │   │   └── 📄 index.ts
    │   │   ├── 📁 services
    │   │   │   └── 📄 api.ts
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
    │   │   ├── 🖼️ Cadastro Usuario.png
    │   │   ├── 🖼️ Criado Aero.png
    │   │   ├── 🖼️ EdConcuidaFunc.png
    │   │   ├── 🖼️ Editar Funcionario.png
    │   │   ├── 🖼️ Funcionario Excluido.png
    │   │   ├── 🖼️ Gestão Av2.png
    │   │   ├── 🖼️ Montagem Av2.png
    │   │   ├── 🖼️ Peca Registrada.png
    │   │   ├── 🖼️ Registrado Teste.png
    │   │   ├── 🖼️ Registrar Peca com Peca.png
    │   │   ├── 🖼️ Registrar Peca.png
    │   │   ├── 🖼️ Registrar Teste.png
    │   │   ├── 🖼️ Registro Func.png
    │   │   ├── 🖼️ Tela Aeronave Criado.png
    │   │   ├── 🖼️ Tela Funcionarios.png
    │   │   ├── 🖼️ Tela Pecas.png
    │   │   ├── 🖼️ Tela Teste.png
    │   │   ├── 🖼️ Tela de Gestao.png
    │   │   ├── 🖼️ Tela de Login AV2.png
    │   │   ├── 🖼️ Tela de Login.png
    │   │   ├── 🖼️ Tela de Montagem.png
    │   │   ├── 🖼️ Telar Criar Aeronave.png
    │   │   └── 🖼️ Teste adicionado.png
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

## 🛠️ Padrão de Desenvolvimento (Conventional Commits)

Para garantir a escalabilidade e clareza histórica do projeto, utilizamos o padrão de commits:

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

## 🚀 Guia de Instalação e Execução

Siga os passos abaixo para rodar o ambiente de desenvolvimento:

### Pré-requisitos

- Node.js (v18.x ou superior)
- NPM ou Yarn

### Passo a Passo

1. **Clonagem do projeto:**

   ```bash
   git clone https://github.com/guilhermefpo/Av2.git
   cd Av2
   ```

2. **Acesso ao diretório do Frontend:**

   ```bash
   cd front_end
   ```

3. **Instalação de dependências:**

   ```bash
   npm install
   ```

4. **Execução do servidor de desenvolvimento:**

   ```bash
   npm run dev
   ```

5. **Login ADM:**
   ```bash
   Login: admin
   Senha: 123
   ```

> 💡 **Nota Técnica:** A aplicação abrirá por padrão em `http://localhost:5173`. Os dados são persistidos no **LocalStorage** do seu navegador. Caso deseje resetar o sistema, limpe os dados de navegação ou utilize o comando `localStorage.clear()` no console do desenvolvedor.

> Para logar com outro usuário ir em {criar conta}, podendo logar como ADM, ENGENHEIRO e OPERADOR.

---

### 📝 Documentação Adicional

Os arquivos de **Wireframe** e **Estudo de Caso** estão localizados na pasta `/Docs`. Recomendo o uso da extensão **vscode-pdf** para visualização direta no editor.

```



```
