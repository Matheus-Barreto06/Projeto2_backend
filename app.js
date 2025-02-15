const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const sequelize = require('./config/bancoDeDados');

// Importa as rotas
const autenticacaoRotas = require('./rotas/autenticacao');
const tiposIngressosRotas = require('./rotas/tiposIngressos');
const comprasRotas = require('./rotas/compras');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração do template engine Mustache
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Rotas da API REST
app.use('/api/autenticacao', autenticacaoRotas);
app.use('/api/tipos-ingressos', tiposIngressosRotas);
app.use('/api/compras', comprasRotas);

// Rotas da interface web

// Página de login
app.get('/login', (req, res) => {
  res.render('login');
});

// Página de histórico de compras (exemplo)
app.get('/historico-compras', (req, res) => {
  // A lógica para buscar e renderizar as compras do usuário deve ser implementada
  res.render('historicoCompras');
});

// Página de detalhe do ingresso
app.get('/ingresso/:id', (req, res) => {
  // A lógica para buscar e renderizar o ingresso adquirido deve ser implementada
  res.render('detalheIngresso', { idIngresso: req.params.id });
});

// Sincroniza o banco de dados e inicia o servidor
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:3000');
  });
}).catch(err => console.error(err));
