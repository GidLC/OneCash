import {
  IonHeader,
  IonPage,
  IonTitle,
  IonContent,
  IonList,
  IonTabButton,
  IonIcon,
  IonFooter,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonPopover,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import { analyticsOutline, ellipsisVerticalOutline } from "ionicons/icons";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import Header from "../../components/HeaderHome/HeaderHome";
import BotaoMais from "../../components/BotaoMais/BotaoMais";
import BarraInferior from "../../components/BarraInferior/BarraInferior";
import './readReceita.css'
import { useHistory } from "react-router";
import { Capacitor } from "@capacitor/core";

type SQLItemReceitas = {
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

type SQLItemPendentes = {
  receitasPendentes: number;
  receitasRecebidas: number;
}

const Entrada: React.FC = () => {
  const platform = Capacitor.getPlatform();
  const history = useHistory();
  const { performSQLAction, initialized } = useSQLiteDB();

  const [receitasGeral, setReceitasGeral] = useState<Array<SQLItemReceitas>>()
  const [itemsReceitasPendentes, setReceitasPendentes] = useState<Array<SQLItemPendentes>>()
  const [itemsReceitasRecebidas, setReceitasRecebidas] = useState<Array<SQLItemPendentes>>()
  const receitasPendentes: any = itemsReceitasPendentes?.[0]?.['receitasPendentes'];
  const receitasRecebidas: any = itemsReceitasRecebidas?.[0]?.['receitasRecebidas'];

  useEffect(() => {
    loadData();
  }, [initialized]);

  const loadData = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM receita`);
        setReceitasGeral(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setReceitasGeral([]);
    }
    
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_receita) as receitas FROM receita WHERE status_receita = 0`);
        setReceitasPendentes(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setReceitasPendentes([]);
    }

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_receita) as receitas FROM receita WHERE status_receita = 1`);
        setReceitasRecebidas(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setReceitasRecebidas([]);
    }
  };

  const confirmDelete = (itemId: number) => {
    if (platform == "web") {
      let confirmacao = confirm(`Deseja realmente excluir essa receita?`)
      console.log(`Executando confirm Delete`)

      if (confirmacao == true) {
        deleteReceita(itemId)
        alert(`Receita excluida`)
      }
    } else {
      showConfirmationAlert("Deseja realmente excluir essa receita?", () => {
        deleteReceita(itemId);
      });
    }
  };

  const deleteReceita = async (itemId: number) => {
    try {
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`DELETE FROM receita WHERE id_receita = ${itemId}`);
        }
      );
    } catch (error) {
      alert((error as Error).message);
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
          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard>
                    <IonCardHeader>
                      Recebidos:
                      {`R$ ${receitasRecebidas || 0.00}`}
                    </IonCardHeader>
                  </IonCard>
                </IonCol>

                <IonCol>
                  <IonCard>
                      <IonCardHeader>
                        Pendentes:
                        {`R$ ${receitasPendentes || 0.00}`}
                      </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
          {receitasGeral?.map((item) => (
            <IonList>
              <IonCard>
                <IonGrid>
                  <IonRow>
                    <IonCol size="1">
                      <IonIcon icon={analyticsOutline} size="large"></IonIcon>
                    </IonCol>

                    <a onClick={() => history.push(`/updateReceita?id=${item.id_receita}`)}>
                      <IonCol size="11">
                        <IonCardHeader>
                          <IonCardTitle>{item.descricao_receita}</IonCardTitle>
                        </IonCardHeader>
                      </IonCol>
                      <IonCardSubtitle>
                        <IonText>Categoria: {item.categoria_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Banco: {item.destino_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Usuário: {item.usuario_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Dia Receita: {item.dia_receita}</IonText>
                        <IonText> | </IonText>
                        <IonText>Dia Receita: {item.dia_receita}</IonText>
                        <IonTitle>R${item.valor_receita}</IonTitle>
                      </IonCardSubtitle>
                    </a>
                    <IonCol size="1">
                      <IonButton color="danger" onClick={() => confirmDelete(item.id_receita)}>EXCLUIR
                        {/*<IonIcon icon={ellipsisVerticalOutline} size="large"></IonIcon>*/}
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
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
function showConfirmationAlert(arg0: string, arg1: () => void) {
  throw new Error("Function not implemented.");
}

