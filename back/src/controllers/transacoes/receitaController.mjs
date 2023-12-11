import ReceitaModel from "../../models/transacoes/receitaModel.mjs";


const cadastroReceita = (req, res) => {
    const { descricao, valor, usuario, casal, categoria, status, data} = req.body;
  
    // Chame o método salvarUsuario do modelo
    ReceitaModel.cadastraReceita(descricao, valor, usuario, casal, categoria, status, data, (err, resultado) => {
      if (err) {
        console.error('Erro ao cadastrar receita:', err);
        return res.status(500).json({ error: 'Erro ao cadastrar receita' });
      }
      res.status(200).json({ message: 'Receita cadastrada com sucesso', resultado });
    });
  };


export default {cadastroReceita}