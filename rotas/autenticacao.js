const express = require('express');
const router = express.Router();
const Usuario = require('../modelos/Usuario');
const jwt = require('jsonwebtoken');
const segredo = 'seu_seguro_jwt'; // Use variável de ambiente em produção

// Cadastro de usuário
router.post('/cadastrar', async (req, res) => {
  try {
    const { nomeUsuario, senha, papel } = req.body;
    const usuario = await Usuario.create({ nomeUsuario, senha, papel });
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { nomeUsuario, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { nomeUsuario } });
    if (!usuario || usuario.senha !== senha) { // Em produção, compare senhas com hash
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: usuario.id, papel: usuario.papel }, segredo, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
});

module.exports = router;
