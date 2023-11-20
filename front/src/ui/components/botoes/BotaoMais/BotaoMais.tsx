import { IonFab, IonFabButton, IonFabList, IonIcon, IonLabel, IonText } from '@ionic/react';
import { add, analyticsOutline, walletOutline } from 'ionicons/icons';

interface BotaoMaisProps {
  lado: any;
}

const BotaoMais: React.FC<BotaoMaisProps> = ({ lado }) => {
  return (
    <IonFab slot="fixed" horizontal={lado} vertical="bottom">

      <IonFabButton color="primary">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>

      <IonFabList side="top">
        <IonLabel>Receitas</IonLabel>
        <IonFabButton color="success" href='/addReceita'>
          <IonIcon icon={walletOutline}></IonIcon>
        </IonFabButton>
      </IonFabList>

      <IonFabList side="end">
        <IonFabButton color="tertiary">
          <IonIcon icon={analyticsOutline}>
          </IonIcon>
        </IonFabButton>
      <IonText>Investimentos</IonText>
      </IonFabList>

      <IonFabList side="start">
        <IonFabButton color="danger" href="/addDespesa">
          <IonIcon icon={walletOutline}></IonIcon>
        </IonFabButton>
        <IonText>Despesas</IonText>
      </IonFabList>

    </IonFab>
  );
}
export default BotaoMais;