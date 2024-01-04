import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonCol, IonRow, IonGrid, } from "@ionic/react";
import React, { useContext } from "react";
import AuthContext from "../../../data/contexts/autenticaLogin";

interface HeaderProps {
  nome: string;
}

const Header: React.FC<HeaderProps> = ({ nome }) => {
  const Auth = useContext(AuthContext)
  const user = Auth?.getAuth()

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonTitle size="large">{nome}</IonTitle>
                <IonTitle size="small">Olá {user?.nome_usuario}</IonTitle>
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
