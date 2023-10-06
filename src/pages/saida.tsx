import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonItem,
  IonLabel,
  IonItemGroup,
  IonList,
  IonTabButton,
  IonIcon,
  IonFooter,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import { arrowBackCircleOutline } from "ionicons/icons";
import MenuLateral from "../components/MenuLateral/MenuLateral";
import Header from "../components/HeaderHome/HeaderHome";
import BotaoMais from "../components/BotaoMais/BotaoMais";
import BarraInferior from "../components/BarraInferior/BarraInferior";

type SQLItem = {
  id_despesa: number;
  descricao_despesa: string;
  valor_despesa: string;
  destino_despesa: number;
  usuario_despesa: number;
  status_despesa: number;
  timestamp_despesa: string;
  dia_despesa: number;
  mes_despesa: number;
  ano_despesa: number;
  categoria_despesa: number;
};

const Saida: React.FC = () => {
  const [items, setItems] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados

  //////INICIALIZA O BD///////

  // Hook para o banco de dados SQLite
  const { performSQLAction, initialized } = useSQLiteDB();


  //////CARREGA OS DADOS///////

  useEffect(() => {
    loadData(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
  }, [initialized]);

  const loadData = async () => {
    try {
      // Consulta a base de dados
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM despesa`);
        setItems(respSelect?.values);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItems([]);
    }
  };


  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='SAIDA' />
        </IonHeader>

        <IonContent>
          {items?.map((item) => (
            <IonList>
              <IonItemGroup>
                <IonItem>
                  <IonLabel>ID: {item.id_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Descricao: {item.descricao_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Valor: {item.valor_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Destino: {item.destino_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Usuário: {item.usuario_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Status: {item.status_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>TimeStamp: {item.timestamp_despesa}</IonLabel>
                </IonItem>

                <IonItem>
                  <IonLabel>Categoria: {item.categoria_despesa}</IonLabel>
                </IonItem>
              </IonItemGroup>
            </IonList>


          ))}

          <BotaoMais />
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Saida;
