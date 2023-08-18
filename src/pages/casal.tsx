import { IonAvatar, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './casal.css';
import { personCircleOutline } from 'ionicons/icons';

function Casal () {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonAvatar>
          <IonIcon aria-hidden="true" icon={personCircleOutline} />
          </IonAvatar>
          <IonTitle>CASAL</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CASAL</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="CASAL" />
      </IonContent>
    </IonPage>
  );
};

export default Casal;
