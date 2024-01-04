// app.js
import { app } from './config.mjs';
import authRouter from './routes/autenticacao/authRoutes.mjs';
import compraRouter from './routes/transacoes/compraRoutes.mjs';
import receitaRouter from './routes/transacoes/receitaRoutes.mjs';

app.use('/api/auth', authRouter) //autenticação (login, vinculação e cadastro)
app.use('/api/receita', receitaRouter) // gerencia receita
app.use('/api/compra', compraRouter) //Gerencia compras nos supermercados

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
