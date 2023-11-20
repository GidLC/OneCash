// produtoModel.js
import { connection } from "../config.mjs";

class usuarioModel  {
  static salvarUsuario = (nome, preco, qtd, callback) => {
    /*const query = 'INSERT INTO usuario (nome_usuario, preco, qtd) VALUES (?, ?, ?)';
    connection.query(query, [nome, preco, qtd], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });*/
    //console.log(`Função de salvar Usuário`)
  }

  static listarUsuario = (callback) => {
    const query = 'SELECT * FROM usuario';
    connection.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
      console.log(`Usuarios Listados: ${JSON.stringify(results)}`)
    });
  }
}

export default usuarioModel
