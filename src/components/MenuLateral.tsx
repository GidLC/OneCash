import React from 'react';
import {IonContent, IonHeader, IonMenu,IonTitle, IonToolbar } from '@ionic/react';


function MenuLateral() {
    return (
        <>
            <IonMenu side="end" contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>CONFIGURAÇÕES</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">CONFIGURAÇOES DA APLICAÇÃO</IonContent>
            </IonMenu>
        </>
    );
}
export default MenuLateral;