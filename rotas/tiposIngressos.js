const express = require('express');
const router = express.Router();
const TipoIngresso = require('../modelos/TipoIngresso');
const { verificarToken } = require('../middlewares/autenticacao');
const { ehAdmin } = require('../middlewares/administrador');


router.post('/', verificarToken, ehAdmin, async (req, res) => {
  try {
    const { nome, preco, quantidadeDisponivel } = req.body;
    const tipoIngresso = await TipoIngresso.create({ nome, preco, quantidadeDisponivel });
    res.json(tipoIngresso);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const tiposIngressos = await TipoIngresso.findAll();
    res.json(tiposIngressos);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const tipoIngresso = await TipoIngresso.findByPk(req.params.id);
    if (!tipoIngresso) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    res.json(tipoIngresso);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


router.put('/:id', verificarToken, ehAdmin, async (req, res) => {
  try {
    const { nome, preco, quantidadeDisponivel } = req.body;
    const tipoIngresso = await TipoIngresso.findByPk(req.params.id);
    if (!tipoIngresso) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    await tipoIngresso.update({ nome, preco, quantidadeDisponivel });
    res.json(tipoIngresso);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});


router.delete('/:id', verificarToken, ehAdmin, async (req, res) => {
  try {
    const tipoIngresso = await TipoIngresso.findByPk(req.params.id);
    if (!tipoIngresso) return res.status(404).json({ erro: 'Tipo de ingresso não encontrado' });
    await tipoIngresso.destroy();
    res.json({ mensagem: 'Tipo de ingresso excluído' });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;
