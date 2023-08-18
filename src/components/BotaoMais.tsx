import {IonFab, IonFabButton, IonFabList, IonIcon } from '@ionic/react';
import { add, analyticsOutline, walletOutline } from 'ionicons/icons';

function BotaoMais() {
  return (
    <IonFab slot="fixed" horizontal="center" vertical="bottom">

      <IonFabButton color="primary">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>

      <IonFabList side="top">
        <IonFabButton color="success" href='/addReceita'>
          <IonIcon icon={walletOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>

      <IonFabList side="end">
        <IonFabButton color="tertiary">
          <IonIcon icon={analyticsOutline}>
          </IonIcon>
        </IonFabButton>
      </IonFabList>

      <IonFabList side="start">
        <IonFabButton color="danger" href="/addDespesa">
          <IonIcon icon={walletOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>

    </IonFab>
  );
}
export default BotaoMais;