// produtoController.js
import UsuarioModel from '../models/usuarioModel.mjs'

const salvarUsuario = (req, res) => {
  const { nome, preco, qtd } = req.body;

  // Chame o método salvarUsuario do modelo
  UsuarioModel.salvarUsuario(nome, preco, qtd, (err, resultado) => {
    if (err) {
      console.error('Erro ao salvar o usuário:', err);
      return res.status(500).json({ error: 'Erro ao salvar o usuário' });
    }
    res.status(200).json({ message: 'Usuário salvo com sucesso', resultado });
  });
  console.log(`SalvaUsuario`)
};

const listarUsuario = (req, res) => {
  UsuarioModel.listarUsuario((err, resultados) => {
    if (err) {
      console.error('Erro ao listar os usuários:', err);
      return res.status(500).json({ error: 'Erro ao listar os usuários' });
    }
    res.status(200).json(resultados);
  });
  console.log(`listarUsuario`)
};

export default { salvarUsuario, listarUsuario }

