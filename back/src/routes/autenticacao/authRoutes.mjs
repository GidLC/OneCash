import express from 'express';
const router = express.Router();
import authController from '../../controllers/autenticacao/authController.mjs';

router.post('/cadastro', authController.cadastroUsuario)
router.get('/buscaCadastro/:codigo', authController.buscaCadastro)
router.put('/vincCadastro', authController.vincCadastro)
router.post('/login', authController.loginUsuario)

export default router;