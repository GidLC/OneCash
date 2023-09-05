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
      const isConn = (await sqlite.current.isConnection("db_vite", false)).result; // Verificamos se a conexão "db_vite" existe

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection("db_vite", false); // Se a conexão existir, recuperamos a referência
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
      } catch {}
    }
  };

  /**
   * Aqui é onde você pode verificar e atualizar a estrutura da tabela
   */
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTable = `
      CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      senha TEXT NOT NULL
      );
    `;
      const respCT = await db?.execute(queryCreateTable); // Executamos a consulta SQL para criar a tabela (se não existir)
      console.log(`res: ${JSON.stringify(respCT)}`); // Exibimos a resposta da criação da tabela
    });
  };

  return { performSQLAction, initialized }; // Retornamos as funções e o estado para uso externo
};

export default useSQLiteDB;