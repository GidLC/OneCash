import express from 'express';
const router = express.Router();
import receitaController from '../../controllers/transacoes/receitaController.mjs'

router.post('/cadastro', receitaController)
router.delete('/apagar', receitaController)
router.get('listarReceitas', receitaController)