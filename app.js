const express = require('express');
const mustacheExpress = require('mustache-express');
const app = express();
const sequelize = require('./config/bancoDeDados');


const autenticacaoRotas = require('./rotas/autenticacao');
const tiposIngressosRotas = require('./rotas/tiposIngressos');
const comprasRotas = require('./rotas/compras');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');


app.use('/api/autenticacao', autenticacaoRotas);
app.use('/api/tipos-ingressos', tiposIngressosRotas);
app.use('/api/compras', comprasRotas);



app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/historico-compras', (req, res) => {
  
  res.render('historicoCompras');
});


app.get('/ingresso/:id', (req, res) => {
 
  res.render('detalheIngresso', { idIngresso: req.params.id });
});


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Servidor iniciado em http://localhost:3000');
  });
}).catch(err => console.error(err));
