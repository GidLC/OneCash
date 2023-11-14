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
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import { analyticsOutline} from "ionicons/icons";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Header from "../../components/HeaderHome/HeaderHome";
import BarraInferior from "../../components/BarraInferior/BarraInferior";
import './readDespesa.css'

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
            <IonCard>
              <IonCardHeader>
                {/**Aqui ficará o icone da receita "ao lado da descrição" */}
                <IonIcon icon={analyticsOutline} size="large"></IonIcon>
                <IonCardTitle>Descrição: {item.descricao_despesa}</IonCardTitle>
                <IonCardSubtitle>
                  <IonText>Categoria: {item.categoria_despesa}</IonText>
                  <IonText> | </IonText>
                  <IonText>Banco: {item.destino_despesa}</IonText>
                  <IonTitle>R${item.valor_despesa}</IonTitle>
                </IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </IonList>


          ))}
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Saida;
