import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, } from "@ionic/react";
import React from "react";
import MenuLateral from "./MenuLateral";

interface HeaderProps {
    nome: string;
}

const Header: React.FC<HeaderProps> = ({ nome }) => {
    return (
        <>
     <IonHeader>
        <IonToolbar>
          <IonTitle size="large">{nome}</IonTitle>
          <IonButtons slot="end">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        </>
    );
};

export default Header;
