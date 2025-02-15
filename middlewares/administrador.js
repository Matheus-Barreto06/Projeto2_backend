function ehAdmin(req, res, next) {
    if (req.usuario && req.usuario.papel === 'admin') {
      return next();
    }
    return res.status(403).json({ erro: 'Permissão de administrador necessária' });
  }
  
  module.exports = { ehAdmin };
  