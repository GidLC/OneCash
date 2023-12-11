// app.js
import { app } from './config.mjs';
import router from './routes/autenticacao/authRoutes.mjs';

app.use('/api/auth', router) //autenticação (login, vinculação e cadastro)
app.use('/api/receita', router) // gerencia receita

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
