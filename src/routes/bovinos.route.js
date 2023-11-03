const express = require('express');
const bovinosController = require('../controllers/bovinos.controller');
const { verificarJWT } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verificarJWT, bovinosController.index);
router.get('/:id', verificarJWT, bovinosController.obtenerID);
router.post('/', verificarJWT, bovinosController.crearBovino);
router.delete('/:id', verificarJWT, bovinosController.eliminadoLinteral);
router.patch('/:id', verificarJWT, bovinosController.actualizacionParcial);

router.patch('/borrado/:id', verificarJWT, bovinosController.eliminadoLogico);

/* este el el link para poder filtrar por estados y otros activados */
router.get('/filtrados', verificarJWT, bovinosController.obtenerBovinosFiltrados);

/* para obtener todos los eventos del bovino */
router.get('/eventos/:id', verificarJWT, bovinosController.obtenerEventosDeBovino);

module.exports = router;
