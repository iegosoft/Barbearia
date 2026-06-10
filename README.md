# 💈 BarberShop

Sistema Web para gerenciamento de agendamentos em barbearias, com foco em usabilidade, segurança e escalabilidade. Desenvolvido como projeto final da disciplina de **Gestão da Qualidade de Software**, no curso de Engenharia de Software da UFAM – ICET.

---

## 📌 Objetivo

O BarberShop tem como principal propósito **otimizar a rotina de barbearias**, permitindo:
- Que clientes agendem serviços de forma autônoma.
- Que administradores tenham total controle sobre os agendamentos, horários e usuários.
- Redução de conflitos de agenda e aumento da produtividade.

---

## 🏗️ Arquitetura — Monorepo (Frontend + Backend separados)

A partir desta versão, o projeto foi reestruturado em **monorepo**, separando completamente o frontend do backend:

```
barbearia/
├── backend/          ← API REST (Node.js + Express)
│   ├── app.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/         ← Interface (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── pages/    (Home, Login, Admin, Editar)
│   │   └── components/
│   └── public/img/
└── cypress/          ← Testes E2E
```

---

## 👨‍💻 Tecnologias Utilizadas

### Backend
- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **bcrypt** — hash de senha
- **express-session** + **connect-mongo** — autenticação por sessão
- **cors** — liberação de origem para o frontend

### Frontend
- **React 18**
- **Vite** — bundler e dev server
- **Tailwind CSS** — estilização responsiva
- **React Router DOM v6** — roteamento client-side

### Testes
- **Cypress 14** — testes E2E

---

## ⚙️ Como rodar o projeto

### Pré-requisitos
- Node.js instalado
- MongoDB rodando localmente (`localhost:27017`)

### 1. Instalar dependências
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 2. Configurar variáveis de ambiente
Crie o arquivo `backend/.env` com o conteúdo:
```
MONGO_URI=mongodb://localhost:27017/barbearia
SESSION_SECRET=segredo_super_secreto
FRONTEND_URL=http://localhost:5173
PORT=3000
```

### 3. Rodar (dois terminais)
```bash
# Terminal 1 — Backend (porta 3000)
cd backend && npm run dev

# Terminal 2 — Frontend (porta 5173)
cd frontend && npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🔐 Acesso Administrativo

| Usuário | Senha |
|---------|-------|
| admin   | 1234  |

Painel: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)

---

## 🛠 Funcionalidades

- Agendamento de serviços (nome, telefone, data, hora, serviço)
- Painel administrativo protegido por sessão
- Edição e remoção de agendamentos
- Exibição de horários disponíveis por semana
- Design responsivo (mobile, tablet, desktop)

---

## 📈 Futuras Implementações

- Validação de conflito de horário no backend
- Filtros avançados por nome / serviço / data
- Controle de horários por barbeiro
- Novos testes E2E adaptados à nova arquitetura

---

## 🧑‍💼 Desenvolvedor

| Nome          | Função        |
|---------------|---------------|
| Iêgo Sérgio   | Desenvolvedor |

---

## 📍 Instituição

Projeto desenvolvido no Instituto de Ciências Exatas e Tecnologia (ICET) – **UFAM**, sob orientação da **Profª Drª Anacilia Maria Palmeira Vieira**.

📍 Itacoatiara - AM
