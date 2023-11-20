import express from 'express';
const router = express.Router();
import usuarioController from '../controllers/usuarioController.mjs';

router.post('/salvar-usuario', usuarioController.salvarUsuario);
router.get('/listar-usuario', usuarioController.listarUsuario);

export default router;