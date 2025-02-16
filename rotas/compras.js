const express = require('express');
const router = express.Router();
const Compra = require('../modelos/Compra');
const TipoIngresso = require('../modelos/TipoIngresso');
const { verificarToken } = require('../middlewares/autenticacao');


router.post('/', verificarToken, async (req, res) => {
  try {
    const { idTipoIngresso, quantidade } = req.body;
    

    const tipoIngresso = await TipoIngresso.findByPk(idTipoIngresso);
    if (!tipoIngresso) {
      return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    }
    
    // Verifica se há quantidade disponível suficiente
    if (tipoIngresso.quantidadeDisponivel < quantidade) {
      return res.status(400).json({ erro: 'Quantidade solicitada excede o estoque disponível' });
    }
    

    tipoIngresso.quantidadeDisponivel -= quantidade;
    await tipoIngresso.save();
    

    const compra = await Compra.create({
      quantidade,
      TipoIngressoId: tipoIngresso.id,
      UsuarioId: req.usuario.id // Obtido no middleware verificarToken
    });
    
    res.json(compra);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


router.get('/meus', verificarToken, async (req, res) => {
  try {
    const compras = await Compra.findAll({
      where: { UsuarioId: req.usuario.id },
      include: TipoIngresso
    });
    res.json(compras);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

router.get('/:id', verificarToken, async (req, res) => {
  try {
    const compra = await Compra.findByPk(req.params.id, { include: TipoIngresso });
    if (!compra || compra.UsuarioId !== req.usuario.id) {
      return res.status(404).json({ erro: 'Compra não encontrada ou não autorizada' });
    }
    res.json(compra);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;
