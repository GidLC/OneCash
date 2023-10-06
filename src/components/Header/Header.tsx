import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonTabButton, IonIcon, IonCol, IonRow, IonGrid, } from "@ionic/react";
import { arrowBackCircleOutline } from "ionicons/icons";
import React from "react";
import './Header.css'

interface HeaderProps {
  nome: string;
}

const Header: React.FC<HeaderProps> = ({ nome }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar>

        <IonGrid>
            <IonRow>
              <IonCol size="auto">
                  <IonTabButton href="/home">
                    <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="large"/>
                  </IonTabButton>
              </IonCol>
              <IonCol>
                  <IonTitle size="large">{nome}</IonTitle>
              </IonCol>
              <IonCol size="auto">

                <div>
                  <IonButtons slot="end">
                    <IonMenuButton></IonMenuButton>
                  </IonButtons>
                </div>
                
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
