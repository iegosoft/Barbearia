# BarberShop

Sistema web completo para gerenciamento de agendamentos em barbearias. Desenvolvido como projeto final da disciplina de **Gestão da Qualidade de Software** no curso de Engenharia de Software da UFAM – ICET.

---

## Índice

- [Sobre o projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Demonstração](#demonstração)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Modelo de dados](#modelo-de-dados)
- [API Reference](#api-reference)
- [Regras de negócio](#regras-de-negócio)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Como executar localmente](#como-executar-localmente)
- [Testes](#testes)
- [Deploy](#deploy)
- [Desenvolvedor](#desenvolvedor)

---

## Sobre o projeto

O BarberShop permite que **clientes agendem serviços de forma autônoma** e que **administradores gerenciem toda a agenda** via painel protegido. O sistema evita conflitos de horário, valida datas e horários de funcionamento, e sincroniza mudanças de status em tempo real com o banco de dados.

---

## Funcionalidades

### Área pública
- Agendamento de serviços com seleção de barbeiro, data, hora e serviço
- Validação de conflito de horário (mesmo barbeiro + data + hora)
- Bloqueia datas passadas, domingos e horários fora do expediente
- Galeria de fotos e apresentação dos profissionais
- Design responsivo (mobile, tablet, desktop)

### Painel administrativo (`/admin/painel`)
- Autenticação por sessão (bcrypt + express-session)
- Cards de estatísticas em tempo real: agendamentos de hoje, pendentes, concluídos
- Filtros por data, barbeiro e status
- Atualização de status inline (pendente → concluído / remarcado / cancelado)
- Edição completa de qualquer agendamento
- Remoção de agendamentos
- Estatísticas sincronizadas com banco sem recarregar página

---

## Demonstração

| Página | Rota |
|--------|------|
| Site público | `/` |
| Agendamento | `/` (formulário na página inicial) |
| Login admin | `/admin/login` |
| Painel admin | `/admin/painel` |
| Editar agendamento | `/admin/editar/:id` |

---

## Arquitetura

```mermaid
flowchart TB
    subgraph Cliente["🌐 Navegador"]
        direction TB
        UI["React 18 + Vite\n(Tailwind CSS)"]
    end

    subgraph Vercel["☁️ Vercel (Frontend)"]
        SPA["Build estático\n(SPA)"]
    end

    subgraph Render["🚀 Render (Backend)"]
        API["Express 5\nAPI REST"]
        SESSION["express-session\n+ connect-mongo"]
        AUTH["bcrypt\nAutenticação"]
        VALID["Validação\nde negócio"]
    end

    subgraph Atlas["🍃 MongoDB Atlas"]
        DB_AGE[("Agendamentos")]
        DB_USR[("Usuários")]
    end

    Cliente -->|"HTTPS / fetch()"| Vercel
    Vercel -->|"/api/* → proxy"| Render
    Render --> SESSION
    Render --> AUTH
    Render --> VALID
    Render -->|"Mongoose"| Atlas
```

### Fluxo de autenticação

```mermaid
sequenceDiagram
    participant C as Navegador
    participant B as Backend (Express)
    participant M as MongoDB

    C->>B: POST /api/admin/login { usuario, senha }
    B->>M: findOne({ usuario })
    M-->>B: documento do usuário
    B->>B: bcrypt.compare(senha, hash)
    alt Credenciais válidas
        B->>B: req.session.usuario = admin
        B-->>C: 200 { sucesso: true }
        C->>C: navigate('/admin/painel')
    else Credenciais inválidas
        B-->>C: 401 { erro: 'Senha incorreta' }
    end

    Note over C,B: Requisições subsequentes ao painel
    C->>B: GET /api/agendamentos (com cookie de sessão)
    B->>B: autenticar() — verifica req.session.usuario
    alt Sessão válida
        B->>M: Agendamento.find(filtros)
        M-->>B: lista de agendamentos
        B-->>C: 200 [ ...agendamentos ]
    else Sessão inválida
        B-->>C: 401 { erro: 'Não autorizado' }
        C->>C: navigate('/admin/login')
    end
```

---

## Tecnologias

### Backend
| Pacote | Versão | Uso |
|--------|--------|-----|
| Node.js | 18+ | Runtime |
| Express | ^5.1 | Framework HTTP |
| Mongoose | ^8.15 | ODM para MongoDB |
| bcrypt | ^6.0 | Hash de senhas |
| express-session | ^1.18 | Gerenciamento de sessão |
| connect-mongo | ^5.1 | Persistência de sessão no MongoDB |
| cors | ^2.8 | Controle de origens |
| dotenv | ^16.5 | Variáveis de ambiente |

### Frontend
| Pacote | Versão | Uso |
|--------|--------|-----|
| React | ^18.3 | Interface |
| Vite | ^6.0 | Bundler e dev server |
| Tailwind CSS | ^3.4 | Estilização utilitária |
| React Router DOM | ^6.28 | Roteamento client-side |
| lucide-react | ^1.17 | Ícones SVG |

### Testes
| Ferramenta | Versão | Uso |
|------------|--------|-----|
| Cypress | ^14 | Testes E2E (CT01–CT10) |

---

## Estrutura do projeto

```
barbearia/
├── backend/
│   ├── app.js                      # Entry point: Express, sessão, CORS, MongoDB
│   ├── config/
│   │   └── db.js                   # Conexão com MongoDB via Mongoose
│   ├── models/
│   │   ├── Agendamento.js          # Schema: nome, telefone, data, hora, servico, barbeiro, status
│   │   └── Usuario.js              # Schema: usuario, senha (bcrypt)
│   ├── routes/
│   │   ├── admin.js                # POST /login, POST /logout, GET /me
│   │   └── agendamentos.js         # CRUD + PATCH status + GET stats + GET barbeiros
│   └── utils/
│       ├── criarAdmin.js           # Cria usuário admin na primeira execução
│       ├── validarAgendamento.js   # Regras de negócio (datas, horários, conflitos)
│       └── validarEnv.js           # Valida variáveis obrigatórias na inicialização
│
├── frontend/
│   ├── public/
│   │   └── img/                    # Logo, fotos de barbeiros e galeria
│   ├── src/
│   │   ├── App.jsx                 # Rotas: /, /admin/login, /admin/painel, /admin/editar/:id
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx  # Guard: redireciona para /admin/login se não autenticado
│   │   └── pages/
│   │       ├── Home.jsx            # Landing page pública com formulário de agendamento
│   │       ├── Login.jsx           # Tela de login do admin
│   │       ├── Admin.jsx           # Dashboard com stats, filtros, tabela e ações inline
│   │       └── Editar.jsx          # Formulário de edição de agendamento
│   ├── tailwind.config.js          # Tokens customizados: gold, cream, dark-*
│   └── vite.config.js              # Proxy /api → http://localhost:3000
│
├── cypress/
│   ├── e2e/                        # Casos de teste CT01–CT10
│   ├── fixtures/
│   └── support/
│
└── cypress.config.js               # baseUrl, vídeo, screenshots
```

---

## Modelo de dados

```mermaid
erDiagram
    AGENDAMENTO {
        ObjectId _id PK
        String nome "obrigatório"
        String telefone "obrigatório"
        String data "YYYY-MM-DD"
        String hora "HH:MM"
        String servico "Corte | Barba | Corte + Barba"
        String barbeiro "um dos 5 profissionais"
        String status "pendente | concluido | remarcado | cancelado"
        Date criadoEm "default: Date.now"
    }

    USUARIO {
        ObjectId _id PK
        String usuario "único"
        String senha "hash bcrypt (10 rounds)"
    }

    SESSAO {
        String sessionId PK
        String usuario "req.session.usuario"
        Date expires
    }

    USUARIO ||--o{ SESSAO : "autentica"
    USUARIO ||--o{ AGENDAMENTO : "gerencia"
```

---

## API Reference

Base URL local: `http://localhost:3000`  
Base URL produção: configurada em `FRONTEND_URL` no backend.

> Endpoints marcados com 🔒 exigem sessão autenticada.

---

### Autenticação

#### `POST /api/admin/login`
```json
// Body
{ "usuario": "admin", "senha": "suasenha" }

// Resposta 200
{ "sucesso": true, "usuario": "admin" }

// Resposta 401
{ "erro": "Senha incorreta" }
```

#### `POST /api/admin/logout`
```json
// Resposta 200
{ "sucesso": true }
```

#### `GET /api/admin/me`
```json
// Resposta 200 (autenticado)
{ "autenticado": true, "usuario": "admin" }

// Resposta 401
{ "autenticado": false }
```

---

### Agendamentos

#### `GET /api/agendamentos/barbeiros`
Retorna a lista de barbeiros disponíveis (público).
```json
["Iego Costa", "Choze", "Margarida", "Karina", "Elizabeth"]
```

#### `GET /api/agendamentos/stats` 🔒
Estatísticas do painel.
```json
{
  "hoje": 3,
  "pendentes": 8,
  "concluidosHoje": 1,
  "pendentesHoje": 2
}
```

#### `GET /api/agendamentos` 🔒
Lista agendamentos com filtros opcionais.

| Query param | Tipo | Descrição |
|-------------|------|-----------|
| `data` | `YYYY-MM-DD` | Filtra por data |
| `barbeiro` | `string` | Filtra por nome do barbeiro |
| `status` | `string` | Filtra por status |

#### `POST /api/agendamentos`
Cria novo agendamento (público).
```json
// Body
{
  "nome": "João Silva",
  "telefone": "(92) 91234-5678",
  "data": "2026-06-20",
  "hora": "10:00",
  "servico": "Corte",
  "barbeiro": "Iego Costa"
}

// Resposta 201
{ "sucesso": true, "id": "664abc..." }

// Resposta 409 (conflito de horário)
{ "erro": "Iego Costa já possui agendamento nesse horário. Escolha outro barbeiro ou horário." }
```

#### `GET /api/agendamentos/:id` 🔒
Retorna um agendamento pelo ID.

#### `PUT /api/agendamentos/:id` 🔒
Atualiza todos os campos de um agendamento.

#### `PATCH /api/agendamentos/:id/status` 🔒
Atualiza apenas o status.
```json
// Body
{ "status": "concluido" }

// Resposta 200
{ "sucesso": true, "status": "concluido" }
```

#### `DELETE /api/agendamentos/:id` 🔒
Remove um agendamento.

---

## Regras de negócio

| Regra | Detalhe |
|-------|---------|
| Dias de atendimento | Segunda a sábado (domingos bloqueados) |
| Horário de funcionamento | 09:00 às 18:00 (segunda a sexta) |
| Horário aos sábados | 09:00 às 14:00 |
| Datas passadas | Bloqueadas no frontend e no backend |
| Conflito de horário | Mesmo barbeiro + data + hora com status ativo (`pendente` ou `concluido`) |
| Serviços disponíveis | Corte (R$ 30), Barba (R$ 20), Corte + Barba (R$ 45) |
| Status padrão | Todo agendamento novo nasce como `pendente` |
| Registros legados | Agendamentos sem campo `status` são tratados como `pendente` |

---

## Variáveis de ambiente

Crie o arquivo `backend/.env`:

```env
# Conexão com o banco de dados
MONGO_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/barbearia

# Segredo da sessão — mínimo 32 caracteres
SESSION_SECRET=minha_chave_super_secreta_com_mais_de_32_chars

# URL do frontend (para o CORS)
FRONTEND_URL=https://seu-app.vercel.app

# Porta do servidor (opcional — padrão: 3000)
PORT=3000

# Senha inicial do admin (opcional — gerada aleatoriamente se ausente)
ADMIN_SENHA=suasenhasegura
```

> **Nunca** versione o arquivo `.env`. Ele já está no `.gitignore`.

---

## Como executar localmente

### Pré-requisitos
- Node.js 18+
- MongoDB rodando em `localhost:27017` (ou MongoDB Atlas)

### 1. Clonar o repositório
```bash
git clone https://github.com/iegosoft/Barbearia.git
cd Barbearia
```

### 2. Instalar dependências
```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 3. Configurar variáveis de ambiente
```bash
# Crie backend/.env com o conteúdo da seção acima
cp backend/.env.example backend/.env  # (ou crie manualmente)
```

### 4. Iniciar os servidores
Abra dois terminais:

```bash
# Terminal 1 — Backend (porta 3000)
cd backend && npm run dev

# Terminal 2 — Frontend (porta 5178)
cd frontend && npm run dev
```

Acesse: [http://localhost:5178](http://localhost:5178)

### 5. Credenciais do painel admin
Na primeira execução o sistema cria automaticamente o usuário `admin`.
- Se `ADMIN_SENHA` estiver definida no `.env`, ela será usada.
- Se não estiver, uma senha aleatória é gerada e exibida no console do backend.

---

## Testes

O projeto inclui suite completa de testes E2E escritos em **Cypress** (CT01–CT10), cobrindo os principais fluxos do sistema.

| Caso | Descrição |
|------|-----------|
| CT01 | Agendamento válido completo |
| CT02 | Validação de campos obrigatórios |
| CT03 | Bloqueio de datas passadas |
| CT04 | Bloqueio de horários fora do expediente |
| CT05 | Bloqueio de agendamento aos domingos |
| CT06 | Login válido no painel admin |
| CT07 | Login com senha incorreta |
| CT08 | Logout do painel admin |
| CT09 | Conflito de horário entre agendamentos |
| CT10 | Proteção de rota admin sem autenticação |

### Executar os testes
```bash
# Com frontend e backend rodando:

# Modo interativo (UI do Cypress)
npm run cypress:open

# Modo headless (CI)
npm run cypress:run
```

---

## Deploy

### Frontend → Vercel

1. Acesse [vercel.com](https://vercel.com) e importe o repositório
2. Configure o **Root Directory** para `frontend`
3. O Vite é detectado automaticamente — as configurações de build padrão funcionam
4. Adicione a variável de ambiente no painel da Vercel:

| Variável | Valor |
|----------|-------|
| `VITE_API_URL` | URL do backend em produção |

5. Faça o deploy — a Vercel gera a URL `https://seu-app.vercel.app`

### Backend → Render

O backend Express com sessões e MongoDB é melhor hospedado em um serviço com servidor persistente.

1. Acesse [render.com](https://render.com) e crie um **Web Service**
2. Conecte o repositório, defina **Root Directory** como `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Adicione as variáveis de ambiente no painel do Render:

| Variável | Valor |
|----------|-------|
| `MONGO_URI` | String de conexão do MongoDB Atlas |
| `SESSION_SECRET` | Chave secreta (mínimo 32 caracteres) |
| `FRONTEND_URL` | URL da Vercel (ex: `https://seu-app.vercel.app`) |
| `ADMIN_SENHA` | Senha do painel admin |

### Banco de dados → MongoDB Atlas

1. Acesse [mongodb.com/atlas](https://www.mongodb.com/atlas) e crie um cluster gratuito (M0)
2. Em **Database Access**, crie um usuário com senha
3. Em **Network Access**, adicione `0.0.0.0/0` (ou os IPs do Render)
4. Copie a connection string e defina como `MONGO_URI`

### Diagrama de deploy

```mermaid
flowchart LR
    GH["GitHub\n(repositório)"]

    subgraph Vercel
        FE["Frontend\nReact + Vite"]
    end

    subgraph Render
        BE["Backend\nExpress 5"]
    end

    subgraph Atlas["MongoDB Atlas"]
        DB[("barbearia\ndatabase")]
    end

    GH -->|"auto-deploy\n(push main)"| Vercel
    GH -->|"auto-deploy\n(push main)"| Render
    BE -->|"Mongoose"| Atlas
    FE -->|"HTTPS /api/*"| BE
```

---

## Desenvolvedor

| Nome | GitHub | Função |
|------|--------|--------|
| Iêgo Sérgio | [@IegoCosta](https://github.com/IegoCosta) | Desenvolvedor full-stack |

---

## Instituição

Projeto desenvolvido no **Instituto de Ciências Exatas e Tecnologia (ICET) – UFAM**  
Orientação: **Profª Drª Anacilia Maria Palmeira Vieira**  
📍 Itacoatiara – AM
