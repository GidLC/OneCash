import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import './home.css';
import BotaoMais from '../../components/BotaoMais';
import MenuLateral from '../../components/MenuLateral';
import Header from '../../components/Header';
import BarraInferior from '../../components/BarraInferior';

function Home() {
  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='HOME' />
        </IonHeader>

        <IonContent>
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
