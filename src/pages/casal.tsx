import {IonContent, IonFooter, IonHeader,IonPage} from '@ionic/react';
import './casal.css';
import BotaoMais from '../components/BotaoMais';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import BarraInferior from '../components/BarraInferior';

function Casal() {
  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='CASAL' />
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

export default Casal;
