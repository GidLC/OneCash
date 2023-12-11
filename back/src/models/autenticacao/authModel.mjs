// produtoModel.js
import { connection } from "../../config.mjs";
import * as crypto from 'crypto'

class AuthModel {

  static cadastroUsuario = (nome, email, senha, dt_criacao, callback) => {
    const codigoCasal = crypto.randomBytes(4).toString('hex');
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    const query = 'INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, cod_casal, dt_criacao_usuario) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, email, senhaHash, codigoCasal, dt_criacao], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      const userId = results.insertId;
      console.log(userId)

      const queryCasal = 'INSERT INTO casal (cod_casal, usuario_princ_casal) VALUES (?, ?)';
      connection.query(queryCasal, [codigoCasal, userId], (errCasal, resultsCasal) => {
        if (errCasal) {
          return callback(errCasal, null);
        }
        callback(null, resultsCasal);
      });
    });
  }

  static buscaCadastro(codigo, callback) {
    console.log(codigo)
    const query = 'SELECT nome_usuario, id_usuario FROM usuario WHERE cod_casal = ?';
    connection.query(query, [codigo], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null); // Não há usuário cadastrado com esse código de vinculação
      }
      callback(null, results[0]);
    });
  }

  static vincCadastro = (nome, email, senha, cod_casal, dt_criacao, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex');

    const query = 'INSERT INTO usuario (nome_usuario, email_usuario, senha_usuario, cod_casal, dt_criacao_usuario) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, email, senhaHash, cod_casal, dt_criacao], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      const userId = results.insertId;

      const queryCasal = 'UPDATE casal SET usuario_sec_casal = ? WHERE cod_casal = ?';
      connection.query(queryCasal, [userId, cod_casal], (errCasal, resultsCasal) => {
        if (errCasal) {
          return callback(errCasal, null);
        }
        callback(null, resultsCasal);
      });
    });
  }


  static loginUsuario = (email, senha, callback) => {
    const senhaHash = crypto.createHash('sha256').update(senha).digest('hex')
    const query = `SELECT * FROM usuario where email_usuario = ? AND senha_usuario = ?`;
    connection.query(query, [email, senhaHash], (err, results) => {
      if (err) {
        return callback(err, null);
      } else if (results.length == 0) {
        err = `Usuário não encontrado na base de dados`;
        return callback(err, null)
      } else {
        console.log(results)
        callback(null, {id_usuario: results[0].id_usuario, nome_usuario: results[0].nome_usuario, cod_casal: results[0].cod_casal});
      }
    })
  }

}

export default AuthModel;
