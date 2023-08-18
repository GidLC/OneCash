import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './saida.css';

function Saida() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SAIDA</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">SAIDA</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="SAIDA" />
      </IonContent>
    </IonPage>
  );
};

export default Saida;
