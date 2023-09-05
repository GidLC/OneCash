import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './home.css';
import BotaoMais from '../../components/BotaoMais';
import MenuLateral from '../../components/MenuLateral';
import BarraInferior from '../../components/BarraInferior';
import HeaderHome from '../../components/HeaderHome';

function Home() {
  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <HeaderHome nome='HOME' />
        </IonHeader>

        <IonContent>
          <a href='/entrada'>
            <IonCard color="success">
              <IonCardHeader>
                <IonCardTitle>RECEITAS</IonCardTitle>
                <IonCardSubtitle>R$5.000,00</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </a>

          <a href='/saida'>
            <IonCard color="danger">
              <IonCardHeader>
                <IonCardTitle>DESPESAS</IonCardTitle>
                <IonCardSubtitle>R$3.000,00</IonCardSubtitle>
              </IonCardHeader>
            </IonCard>
          </a>
          <BotaoMais />
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default Home;
