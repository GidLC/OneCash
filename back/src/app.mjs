// app.js
import { app } from './config.mjs';
import router from './routes/authRoutes.mjs';

app.use('/api/auth', router) //autenticação (login, vinculação e cadastro)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
