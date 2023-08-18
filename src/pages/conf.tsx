import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './conf.css';

function Conf () {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CONFIGURAÇÕES</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CONFIGURAÇÕES</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Conf;
