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
}

function Home() {
  const { performSQLAction, initialized } = useSQLiteDB();

  useEffect(() => {
    carregandoReceitas();
    carregandoDespesas();
  }, [initialized]);

  const [itemsReceita, setItemsReceita] = useState<Array<SQLItem>>(); // Estado para rastrear os itens da base de dados
  const [itemsDespesa, setItemsDespesa] = useState<Array<SQLItem>>();
  const receitas: any = itemsReceita?.[0]?.['receitas'];
  const despesas: any = itemsDespesa?.[0]?.['despesas'];
  const saldo = receitas - despesas;

  /**
   * Realiza uma consulta na base de dados para carregar os itens.
   */
  const carregandoReceitas = async () => {
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
    
    if (!initialized) {
      return;
    }
  };

  const carregandoDespesas = async () => {
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
  };
  console.log(`Soma Receitas:`, itemsReceita);


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
                        <IonCardSubtitle>{` R$ ${receitas || 0.00}`}</IonCardSubtitle>
                      </IonCardHeader>
                    </IonCard>

                  </a>
                </IonCol>

                <IonCol>
                  <a href='/saida'>
                    <IonCard color="danger">
                      <IonCardHeader className='valoresHome'>
                        <IonCardTitle>DESPESAS:</IonCardTitle>
                        <IonCardSubtitle>{` R$ ${despesas || 0.00}`}</IonCardSubtitle>
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
                      <IonCardHeader>Receitas Ente 1</IonCardHeader>
                    </IonCardHeader>
                  </IonCard>
                </IonCol>

                <IonCol>
                <IonCard color="light">
                    <IonCardHeader>
                      <IonCardHeader>Receitas Ente 2</IonCardHeader>
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
