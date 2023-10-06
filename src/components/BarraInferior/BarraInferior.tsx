import { IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/react';
import { arrowDownOutline, arrowUpOutline, homeOutline, peopleCircleOutline } from 'ionicons/icons';

function BarraInferior() {
    return (
        <IonTabBar slot="bottom">

            <IonTabButton tab="home" href="/home">
                <IonIcon aria-hidden="true" icon={homeOutline} />
                <IonLabel>INICIO</IonLabel>
            </IonTabButton>

            <IonTabButton tab="entrada" href="/entrada">
                <IonIcon aria-hidden="true" icon={arrowUpOutline} />
                <IonLabel>ENTRADA</IonLabel>
            </IonTabButton>

            <IonTabButton tab="saida" href="/saida">
                <IonIcon aria-hidden="true" icon={arrowDownOutline} />
                <IonLabel>SAIDA</IonLabel>
            </IonTabButton>

        </IonTabBar>
    );
}
export default BarraInferior;
