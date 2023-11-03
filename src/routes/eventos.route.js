const express = require('express');
const { verificarJWT } = require('../middlewares/auth.middleware');
const eventosController = require('../controllers/eventos.controller');

const router = express.Router();

router.get('/', verificarJWT, eventosController.obtenerTodos);
router.get('/:id', verificarJWT, eventosController.obtenerEventoPorId);
router.post('/', verificarJWT, eventosController.crearEvento);
router.put('/:id', verificarJWT, eventosController.actualizarEvento);
router.patch('/borrado/:id', verificarJWT, eventosController.eliminadoLogico);
router.delete('/:id', verificarJWT, eventosController.eliminarEvento);
router.get('/no-pasados', verificarJWT,eventosController.obtenerEventosNoPasados);
router.get('/2-semanas',verificarJWT, eventosController.obtenerEventos2Semanas);
router.get('/no-terminados', verificarJWT,eventosController.obtenerEventosNoTerminados);
router.get('/terminados',verificarJWT, eventosController.obtenerEventosTerminados);


module.exports = router;