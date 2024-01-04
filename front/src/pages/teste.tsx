import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonItemDivider,
  IonList,
  IonTabButton,
  IonIcon,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import { arrowBackCircleOutline } from "ionicons/icons";

import useSQLiteDB from "../data/services/sqlite/useSQLiteDB";

type SQLItem = {
  id_usuario: number;
  nome_usuario: string;
  cod_casal: string;
  autenticacao: number
};

const Teste: React.FC = () => {
  const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

  //////INICIALIZA O BD///////

  // Hook para o banco de dados SQLite
  const { performSQLAction, initialized } = useSQLiteDB();
  // Hook para o diálogo de confirmação

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
        const respSelect = await db?.query(`SELECT * FROM autenticacao`);
        setItems(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems([]);
    }
  };

  // Função para renderizar a página
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTabButton href="/">
            <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
          </IonTabButton>
          <IonTitle>CADASTRO DE USUÁRIOS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h3>OS DADOS DO SQLITE</h3>

        <IonItem >
          <IonLabel className="ion-text-wrap"></IonLabel>
        </IonItem>

        {items?.map((item) => (
          <IonList>
            <IonItemGroup>
              <IonItemDivider>
                <IonLabel>{item.id_usuario || "Não encontrado"}</IonLabel>
              </IonItemDivider>

              <IonItem>
                <IonLabel>Nome: {item.nome_usuario || "Não encontrado"}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Código: {item.cod_casal || "Não encontrado"}</IonLabel>
              </IonItem>

              <IonItem>
                <IonLabel>Autenticação: {item.autenticacao || "Não encontrado"}</IonLabel>
              </IonItem>
            </IonItemGroup>
          </IonList>


        ))}
      </IonContent>
    </IonPage>
  );
};

export default Teste;