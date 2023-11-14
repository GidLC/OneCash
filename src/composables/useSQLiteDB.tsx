import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite";

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection>(); // Referência para a conexão com o banco de dados
  const sqlite = useRef<SQLiteConnection>(); // Referência para a conexão SQLite
  const [initialized, setInitialized] = useState<boolean>(false); // Estado que indica se o banco de dados foi inicializado

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return; // Se já houver uma conexão SQLite, não inicializamos novamente

      sqlite.current = new SQLiteConnection(CapacitorSQLite); // Criamos uma nova conexão SQLite
      const ret = await sqlite.current.checkConnectionsConsistency(); // Verificamos a consistência das conexões
      const isConn = (await sqlite.current.isConnection("db_onecash", false)).result; // Verificamos se a conexão "db_vite" existe

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection("db_onecash", false); // Se a conexão existir, recuperamos a referência
      } else {
        db.current = await sqlite.current.createConnection(
          "db_onecash",
          false,
          "no-encryption",
          1,
          false
        ); // Se não existir, criamos uma nova conexão com os parâmetros fornecidos
      }
    };

    initializeDB().then(() => {
      initializeTables(); // Inicializamos as tabelas após a inicialização do banco de dados
      setInitialized(true); // Indicamos que o banco de dados foi inicializado
    });
  }, []);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    cleanup?: () => Promise<void>
  ) => {
    try {
      await db.current?.open(); // Abrimos a conexão com o banco de dados
      await action(db.current); // Executamos a ação fornecida (uma operação SQL)
    } catch (error) {
      alert((error as Error).message); // Em caso de erro, mostramos um alerta com a mensagem de erro
    } finally {
      try {
        (await db.current?.isDBOpen())?.result && (await db.current?.close()); // Verificamos se o banco de dados está aberto e, se sim, o fechamos
        cleanup && (await cleanup()); // Se houver uma função de limpeza fornecida, executamos
      } catch { }
    }
  };


  /**
   * Aqui é onde você pode verificar e atualizar a estrutura da tabela
   */
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTableBanco = `
      CREATE TABLE IF NOT EXISTS banco(
        "id_banco"	INTEGER NOT NULL,
        "nome_banco"	TEXT NOT NULL,
        "saldo_real_banco"	INTEGER,
        "saldo_centavos_banco"	INTEGER,
        PRIMARY KEY("id_banco" AUTOINCREMENT)
      )`
      await db?.execute(queryCreateTableBanco);

      const queryCreateTableCategoriaDespesa = `
      CREATE TABLE IF NOT EXISTS categoria_despesa(
        "id_categoria_despesa"	INTEGER NOT NULL,
        "nome_categoria_despesa"	TEXT NOT NULL,
        "descricao_categoria_despesa"	TEXT,
        "cor_categoria_despesa"	TEXT NOT NULL,
        PRIMARY KEY("id_categoria_despesa" AUTOINCREMENT)
      )`
      await db?.execute(queryCreateTableCategoriaDespesa);

      const queryCreateTableCategoriaReceita = `
      CREATE TABLE IF NOT EXISTS categoria_receita(
        "id_categoria_receita"	INTEGER NOT NULL,
        "nome_categoria_receita"	TEXT NOT NULL,
        "descricao_categoria_receita"	TEXT,
        "cor_categoria_receita"	TEXT,
        PRIMARY KEY("id_categoria_receita" AUTOINCREMENT)
      )`
      await db?.execute(queryCreateTableCategoriaReceita);

      const queryCreateTableDespesa = `
      CREATE TABLE IF NOT EXISTS despesa(
        "id_despesa"	INTEGER NOT NULL,
        "descricao_despesa"	TEXT NOT NULL,
        "valor_despesa"	REAL NOT NULL,
        "origem_despesa"	INTEGER,
        "categoria_despesa"	INTEGER,
        "usuario_despesa"	INTEGER,
        "status_despesa"	INTEGER NOT NULL,
        "timestamp_despesa"	TEXT NOT NULL,
        "dia_despesa"	INTEGER NOT NULL,
        "mes_despesa"	INTEGER NOT NULL,
        "ano_despesa"	INTEGER NOT NULL,
        PRIMARY KEY("id_despesa" AUTOINCREMENT)
      )`
      await db?.execute(queryCreateTableDespesa);

      const queryCreateTableReceita = `
      CREATE TABLE IF NOT EXISTS receita(
        "id_receita"	INTEGER NOT NULL,
        "descricao_receita"	TEXT NOT NULL,
        "valor_receita"	REAL NOT NULL,
        "destino_receita"	INTEGER,
        "usuario_receita"	INTEGER,
        "status_receita"	INTEGER NOT NULL,
        "timestamp_receita"	TEXT NOT NULL,
        "dia_receita"	INTEGER NOT NULL,
        "mes_receita"	INTEGER NOT NULL,
        "ano_receita"	INTEGER NOT NULL,
        "categoria_receita"	INTEGER,
        PRIMARY KEY("id_receita" AUTOINCREMENT)
      )`
      await db?.execute(queryCreateTableReceita);


      const queryCreateTableUsuario = `
      CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER NOT NULL,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      senha TEXT,
      PRIMARY KEY("id" AUTOINCREMENT)
      );
    `;
      await db?.execute(queryCreateTableUsuario);

      const queryCreateTableCor = `
      CREATE TABLE IF NOT EXISTS "cor" (
        "id_cor"	INTEGER NOT NULL,
        "nome_cor"	TEXT NOT NULL,
        "codigo_cor"	TEXT NOT NULL,
        PRIMARY KEY("id_cor" AUTOINCREMENT)
      )
    `;
      await db?.execute(queryCreateTableCor);
    });
  };

  return { performSQLAction, initialized };
};

export default useSQLiteDB;