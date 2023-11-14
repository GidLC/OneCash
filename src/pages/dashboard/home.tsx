import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';
import './home.css';
import BotaoMais from '../../components/BotaoMais/BotaoMais';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import BarraInferior from '../../components/BarraInferior/BarraInferior';
import HeaderHome from '../../components/HeaderHome/HeaderHome';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from "../../composables/useSQLiteDB";
import { useEffect, useState } from 'react';


type SQLItem = {
  receitas: number;
  despesas: number;
  saldo: number;
  receitasEnte1: number,
  receitasEnte2: number
}

function Home() {
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    loadData(); 
  }, [initialized]);

  const [itemsReceita, setItemsReceita] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados
  const [itemsDespesa, setItemsDespesa] = useState<Array<SQLItem>>();
  const receitas: any = itemsReceita?.[0]?.['receitas'];
  const despesas: any = itemsDespesa?.[0]?.['despesas'];
  const [itemsReceitaEnte1, setItemsReceitasEnte1] = useState<Array<SQLItem>>()
  const [itemsReceitaEnte2, setItemsReceitasEnte2] = useState<Array<SQLItem>>()
  const receitasEnte1: any = itemsReceitaEnte1?.[0]?.['receitas'];
  const receitasEnte2: any = itemsReceitaEnte2?.[0]?.['receitas'];

  /**
   * Realiza uma consulta na base de dados para carregar os itens.
   */
  const loadData = async () => {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_receita) as receitas FROM receita WHERE status_receita = 1`);
        setItemsReceita(respSelect?.values);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItemsReceita([]);
    }

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_despesa) as despesas FROM despesa WHERE status_despesa = 1`);
        setItemsDespesa(respSelect?.values);
        console.log(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItemsDespesa([]);
    }

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_receita) as receitas FROM receita WHERE status_receita = 1 AND usuario_receita = 1`);
        setItemsReceitasEnte1(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItemsReceitasEnte1([]);
    }

    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT sum(valor_receita) as receitas FROM receita WHERE status_receita = 1 AND usuario_receita = 2`);
        setItemsReceitasEnte2(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setItemsReceitasEnte2([]);
    }

    if (!initialized) {
      return;
    }
  };


  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <HeaderHome nome='HOME' />
        </IonHeader>

        <IonContent>
          <IonCard>
            <IonGrid>
              {/*<IonRow>
                <IonCol>
                  <IonCard color="primary">
                    <IonCardHeader className='valoresHome'>
                      <IonCardTitle>SALDO:</IonCardTitle>
                      <IonCardSubtitle>{` R$ ${saldo || 0.00}`}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
  </IonRow>*/}

              <IonRow>
                <IonCol>
                  <a href='/entrada'>
                    <IonCard color="success">
                      <IonCardHeader className='valoresHome'>
                        <IonCardTitle>RECEITAS:</IonCardTitle>
                        <IonCardTitle>{` R$ ${receitas || 0.00}`}</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>

                  </a>
                </IonCol>

                <IonCol>
                  <a href='/saida'>
                    <IonCard color="danger">
                      <IonCardHeader className='valoresHome'>
                        <IonCardTitle>DESPESAS:</IonCardTitle>
                        <IonCardTitle>{` R$ ${despesas || 0.00}`}</IonCardTitle>
                      </IonCardHeader>
                    </IonCard>
                  </a>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>


          <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonCard color="light">
                    <IonCardHeader>
                      <IonCardHeader>Receitas Ente 1:</IonCardHeader>
                      <IonCardSubtitle>{`R$ ${receitasEnte1 || 0.00}`}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>

                <IonCol>
                  <IonCard color="light">
                    <IonCardHeader>
                      <IonCardHeader>Receitas Ente 2</IonCardHeader>
                      <IonCardSubtitle>{`R$ ${receitasEnte2 || 0.00}`}</IonCardSubtitle>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>

          <IonCard>
            <IonRow>
              <IonCol>
                <IonCard color="light">
                  <IonCardHeader>
                    <IonCardHeader>DESPESAS POR CATEGORIA</IonCardHeader>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonCard>

          <IonCard>
            <IonRow>
              <IonCol>
                <IonCard color="light">
                  <IonCardHeader>
                    <IonCardHeader>GRÁFICOS</IonCardHeader>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonCard>
          <BotaoMais lado="center" />
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Home;
