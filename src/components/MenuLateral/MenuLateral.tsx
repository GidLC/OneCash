import { IonButton, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import AuthContext from '../../contexts/autenticaLogin';
import { useContext } from 'react';

function MenuLateral() {
    const Auth = useContext(AuthContext);

    const logoff = async () => {
        Auth?.logout();
        console.log("SAINDO");
    }

    return (
        <>
            <IonMenu side="end" contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>CONFIGURAÇÕES</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonButton expand="block" href="/categorias">CATEGORIAS</IonButton>                    
                </IonContent>
                <IonButton color="danger" onClick={logoff}>SAIR</IonButton>
            </IonMenu>
        </>
    );
}
export default MenuLateral;