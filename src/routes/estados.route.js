const express = require('express');
const { verificarJWT } = require('../middlewares/auth.middleware');
const estadosController  = require ('../controllers/estados.controller');

const router = express.Router();

router.get('/', verificarJWT, estadosController.index);
router.get('/vaca/:idVaca/estados',verificarJWT, estadosController.obtenerEstadosBovino);
router.get('/titulo/:titulo', verificarJWT, estadosController.obtenerEstadosTitulo);
router.get('/:id', verificarJWT, estadosController.obtenerEstadoPorId);
router.post('/', verificarJWT, estadosController.crearEstado);
router.delete('/:id', verificarJWT, estadosController.eliminadoLinteral);



module.exports = router;