import express from 'express';
const compraRouter = express.Router();
import compraController from '../../controllers/transacoes/compraController.mjs';

compraRouter.get('/buscaNF', compraController.buscaNF)

export default compraRouter