import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow } from '@ionic/react';
import './home.css';
import BotaoMais from '../../ui/components/botoes/BotaoMais/BotaoMais';
import MenuLateral from '../../ui/components/MenuLateral/MenuLateral';
import BarraInferior from '../../ui/partials/BarraInferior/BarraInferior';
import HeaderHome from '../../ui/partials/HeaderHome/HeaderHome';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../data/contexts/autenticaLogin';


type SQLItem = {
  receitas: number;
  despesas: number;
  saldo: number;
  receitasEnte1: number,
  receitasEnte2: number
}

function Home() {
  const Auth = useContext(AuthContext)

  useEffect(() => {
    loadData(); 
  }, []);

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
    //SELECT da soma dos valores recebidos

    //SELECT das despesas pagas

    //SELECT das receitas do ente 1 do casal

    //SELECT das receitas do ente 2 do casal 

    console.log(Auth?.usuario.nome)
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
                      <IonCardHeader>Receitas {Auth?.usuario.nome}:</IonCardHeader>
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
