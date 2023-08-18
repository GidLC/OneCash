import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './saida.css';
import BotaoMais from '../components/BotaoMais';
import Header from '../components/Header';
import MenuLateral from '../components/MenuLateral';
import BarraInferior from '../components/BarraInferior';

function AddDespesa() {
  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='ADICIONAR DESPESA' />
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

export default AddDespesa;
