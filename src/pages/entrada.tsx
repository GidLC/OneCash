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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../composables/useSQLiteDB";
import { analyticsOutline, arrowBackCircleOutline } from "ionicons/icons";
import MenuLateral from "../components/MenuLateral/MenuLateral";
import Header from "../components/HeaderHome/HeaderHome";
import BotaoMais from "../components/BotaoMais/BotaoMais";
import BarraInferior from "../components/BarraInferior/BarraInferior";

type SQLItem = {
  id_receita: number;
  descricao_receita: string;
  valor_receita: string;
  destino_receita: number;
  usuario_receita: number;
  status_receita: number;
  timestamp_receita: string;
  dia_receita: number;
  mes_receita: number;
  ano_receita: number;
  categoria_receita: number;
};

const Entrada: React.FC = () => {
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
        const respSelect = await db?.query(`SELECT * FROM receita`);
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
          <Header nome='ENTRADA' />
        </IonHeader>

        <IonContent>
          {items?.map((item) => (
            <IonList>
              <IonCard>
                <IonCardHeader>
                  {/**Aqui ficará o icone da receita "ao lado da descrição" */}
                  <IonIcon icon={analyticsOutline} size="large"></IonIcon>
                  <IonCardTitle>Descrição: {item.descricao_receita}</IonCardTitle>
                  <IonCardSubtitle>
                    <IonText>Categoria: {item.categoria_receita}</IonText>
                    <IonText> | </IonText>
                    <IonText>Banco: {item.destino_receita}</IonText>
                    <IonTitle>R${item.valor_receita}</IonTitle>
                  </IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            </IonList>


          ))}
          <BotaoMais lado="center" />
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Entrada;
