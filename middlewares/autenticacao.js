const jwt = require('jsonwebtoken');
const segredo = 'seu_seguro_jwt'; // Em produção, use variável de ambiente

function verificarToken(req, res, next) {
  const cabecalhoAutenticacao = req.headers['authorization'];
  const token = cabecalhoAutenticacao && cabecalhoAutenticacao.split(' ')[1];
  
  if (!token) return res.status(401).json({ erro: 'Token não informado' });

  jwt.verify(token, segredo, (err, decodificado) => {
    if (err) return res.status(401).json({ erro: 'Falha na autenticação do token' });
    req.usuario = decodificado;
    next();
  });
}

module.exports = { verificarToken };
