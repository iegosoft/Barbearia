const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware para entender dados do form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir arquivos estáticos (CSS, imagens, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Configurar sessão com MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// Configurar Handlebars com helper eq
const hbs = exphbs.create({
  helpers: {
    eq: (a, b) => a === b
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); // Garantir pasta views

// Conectar ao banco (ajuste seu arquivo config/db.js para exportar uma função)
require('./config/db')();

// Rotas
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Se tiver função para criar admin automaticamente, pode chamar aqui
require('./utils/criarAdmin')();
