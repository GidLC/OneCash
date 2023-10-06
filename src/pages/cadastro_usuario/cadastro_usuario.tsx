import React, {useState } from 'react';
import { useHistory } from 'react-router';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import './cadastro_usuario.css';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from '../../composables/useSQLiteDB';
import { arrowBackCircleOutline } from 'ionicons/icons';


const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const navegador = useHistory();

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  const cadUsuario = async () => {
    try {

      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO usuario (nome, email) values (?,?);`, [
            nome,
            email,
          ]);
        },

        async () => {
          setNome("");
          setEmail("");
          alert("Usuário Cadastrado");
          navegador.push("/cadastroParceiro");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };


  return (
    <IonPage>
      <IonHeader color='primary'>
        <IonToolbar>
          <IonGrid>   
            <IonRow>
              <IonTabButton href="/">
                <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
              </IonTabButton>
              <IonTitle>Faça agora seu cadastro</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent>
          <IonInput type="text" placeholder="Primeiro nome" value={nome} onIonChange={e => setNome(e.detail.value!)}></IonInput>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          <IonButton expand="block" type="button" color="success" onClick={cadUsuario}>Cadastrar</IonButton>
        <IonButton href='/testeCadastro'>TESTE BD</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
