import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import { arrowBackCircleOutline } from 'ionicons/icons';


const CadastroParceiro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navegador = useHistory();

  //Antes de cadastrar é necessário verificar se já existem dois cadastros no banco de dados, pois devem se limitar a dois
  const cadUsuario = async () => {
    //Cadastro de usuário parceiro
  }


  return (
    <IonPage>
      <IonHeader color='primary'>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonTabButton href="/">
                <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
              </IonTabButton>
              <IonTitle>Cadastre agora seu parceiro</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonInput type="text" placeholder="Primeiro nome" value={nome} onIonChange={e => setNome(e.detail.value!)}></IonInput>
        <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
        <IonButton expand="block" type="submit" color="success" onClick={cadUsuario}>Cadastrar</IonButton>
        <IonButton href='/testeCadastro'>TESTE BD</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CadastroParceiro;
