import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonCol, IonRow, IonGrid, } from "@ionic/react";
import React, { useContext } from "react";
import './Header.css'
import AuthContext from "../contexts/autenticaLogin";

interface HeaderProps {
  nome: string;
}

const Header: React.FC<HeaderProps> = ({ nome }) => {
  const Auth = useContext(AuthContext);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
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
