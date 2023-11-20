// app.js
import { app } from './config.mjs';
import usuarioRoutes from './routes/usuarioRoutes.mjs'

app.use('/api/usuario', usuarioRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Node.js em execução na porta ${PORT}`);
});
