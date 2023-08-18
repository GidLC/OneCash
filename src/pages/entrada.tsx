import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './entrada.css';

function Entrada () {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>ENTRADA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ENTRADA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="ENTRADA" />
      </IonContent>
    </IonPage>
  );
};

export default Entrada;
