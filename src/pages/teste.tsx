import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import useConfirmationAlert from "../composables/useConfirmationAlert";

type SQLItem = {
  id: number;
  name: string;
};

const Teste: React.FC = () => {
  const [editItem, setEditItem] = useState<any>(); // Estado para rastrear o item em edição
  const [inputName, setInputName] = useState(""); // Estado para rastrear o texto de entrada
  const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

  //////INICIALIZA O BD///////

  // Hook para o banco de dados SQLite
  const { performSQLAction, initialized } = useSQLiteDB();
  // Hook para o diálogo de confirmação
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();


  //////CARREGA OS DADOS///////

  useEffect(() => {
    loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
  }, [initialized]);

  /**
   * Realiza uma consulta na base de dados para carregar os itens.
   */
  const loadData = async () => {
    try {
      // Consulta a base de dados
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM test`);
        setItems(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems([]);
    }
  };



  ///////EDITA OS DADOS DA TABELA////////

  const updateItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`UPDATE test SET name=? WHERE id=?`, [
            inputName,
            editItem?.id,
          ]);

          // exibe todos os itens novamente contando já com o editado
          const respSelect = await db?.query(`SELECT * FROM test;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
          setEditItem(undefined);
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };



  ///////ADICIONANDO ITEM A TABELA////////

  const addItem = async () => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO test (id,name) values (?,?);`, [
            Date.now(),
            inputName,
          ]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM test;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };


  ///////DELETANDO ITEM//////////

  const confirmDelete = (itemId: number) => {
    showConfirmationAlert("Are You Sure You Want To Delete This Item?", () => {
      deleteItem(itemId);
    });
  };

  const deleteItem = async (itemId: number) => {
    try {
      // add test record to db
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM test WHERE id=?;`, [itemId]);

          // update ui
          const respSelect = await db?.query(`SELECT * FROM test;`);
          setItems(respSelect?.values);
        },
        async () => {
          setInputName("");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  const doEditItem = (item: SQLItem | undefined) => {
    if (item) {
      setEditItem(item);
      setInputName(item.name);
    } else {
      setEditItem(undefined);
      setInputName("");
    }
  };

  // Função para renderizar a página
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>REACT SQLITE</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        {editItem ? ( // Se um item estiver sendo editado
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton onClick={() => doEditItem(undefined)}>CANCELAR</IonButton>
            <IonButton onClick={updateItem}>ATUALIZAR</IonButton>
          </IonItem>
        ) : ( // Se nenhum item estiver sendo editado (modo de adição)
          <IonItem>
            <IonInput
              type="text"
              value={inputName}
              onIonInput={(e) => setInputName(e.target.value as string)}
            ></IonInput>
            <IonButton slot="end" onClick={addItem} disabled={inputName.trim() === ""}>
              ADICIONAR
            </IonButton>
          </IonItem>
        )}

        <h3>OS DADOS DO SQLITE</h3>

        {items?.map((item) => (
          <IonItem key={item?.id}>
            <IonLabel className="ion-text-wrap">{item.name}</IonLabel>
            <IonButton onClick={() => doEditItem(item)}>EDITAR</IonButton>
            <IonButton onClick={() => confirmDelete(item.id)}>EXCLUIR</IonButton>
          </IonItem>
        ))}

        {ConfirmationAlert}
      </IonContent>
    </IonPage>
  );
};

export default Teste;