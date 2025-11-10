
const express = require('express');
const router = express.Router();
const buildControlador = require('../controladores/buildControlador');

// Rotas públicas 
router.get('/', buildControlador.getAllBuilds);
router.get('/:id', buildControlador.getBuildById);
router.post('/', buildControlador.createBuild);
router.patch('/:id', buildControlador.updateBuild);
router.delete('/:id', buildControlador.deleteBuild);

module.exports = router;