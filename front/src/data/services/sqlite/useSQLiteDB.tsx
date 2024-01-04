import { useEffect, useRef, useState } from "react";
import {
  SQLiteDBConnection,
  SQLiteConnection,
  CapacitorSQLite,
} from "@capacitor-community/sqlite"

const useSQLiteDB = () => {
  const db = useRef<SQLiteDBConnection>();
  const sqlite = useRef<SQLiteConnection>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initializeDB = async () => {
      if (sqlite.current) return;

      sqlite.current = new SQLiteConnection(CapacitorSQLite);
      const ret = await sqlite.current.checkConnectionsConsistency();
      const isConn = (await sqlite.current.isConnection("db_onecash", false))
        .result;

      if (ret.result && isConn) {
        db.current = await sqlite.current.retrieveConnection("db_onecash", false);
      } else {
        db.current = await sqlite.current.createConnection(
          "db_onecash",
          false,
          "no-encryption",
          1,
          false
        );
      }
    };

    initializeDB().then(() => {
      initializeTables();
      setInitialized(true);
    });
  }, []);

  const performSQLAction = async (
    action: (db: SQLiteDBConnection | undefined) => Promise<void>,
    cleanup?: () => Promise<void>
  ) => {
    try {
      await db.current?.open();
      await action(db.current);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      try {
        (await db.current?.isDBOpen())?.result && (await db.current?.close());
        cleanup && (await cleanup());
      } catch {}
    }
  };


  /**
   * Aqui é onde você pode verificar e atualizar a estrutura da tabela
   */
  const initializeTables = async () => {
    performSQLAction(async (db: SQLiteDBConnection | undefined) => {
      const queryCreateTableAutenticacao = `
      CREATE TABLE IF NOT EXISTS autenticacao(
        "id_usuario"	INTEGER ,
        "nome_usuario"	TEXT ,
        "cod_casal"	TEXT ,
        "autenticacao" INTEGER 
      )`
      const respCT = await db?.execute(queryCreateTableAutenticacao);
      console.log(`res: ${JSON.stringify(respCT)}`);
    });
  };

  return { performSQLAction, initialized };
};

export default useSQLiteDB;