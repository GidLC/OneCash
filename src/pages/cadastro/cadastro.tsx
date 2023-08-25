import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonAlert } from '@ionic/react';
import './Cadastro.css';
import { SQLiteDBConnection } from "@capacitor-community/sqlite";
import useSQLiteDB from '../../composables/useSQLiteDB';
import useConfirmationAlert from '../../composables/useConfirmationAlert';


const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  // Hook para o diálogo de confirmação
  const { showConfirmationAlert, ConfirmationAlert } = useConfirmationAlert();

    const novoCadastro = {
      nome: nome,
      email: email,
      senha: senha,
    }
    console.log('Dados enviados:', { novoCadastro });

    const cadUsuario = async () => {
      try {

        performSQLAction(
          async (db: SQLiteDBConnection | undefined) => {
            await db?.query(`INSERT INTO usuario (id,nome, email, senha) values (?,?,?,?);`, [
              Date.now(),
              nome,
              email,
              senha
            ]);
          },
          async () => {
            setNome("");
            setEmail("");
            setSenha("");
            alert("Usuário Cadastrado");
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
          <IonTitle>CADASTRAR</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={cadUsuario}>
          <IonInput type="text" placeholder="Nome" value={nome} onIonChange={e => setNome(e.detail.value!)}></IonInput>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          <IonInput type="password" placeholder="Senha" value={senha} onIonChange={e => setSenha(e.detail.value!)}></IonInput>
          <IonInput type="password" placeholder="Confirme a Senha" value={confSenha} onIonChange={e => setConfSenha(e.detail.value!)}></IonInput>
          <IonButton expand="block" type="submit" color="success">Cadastrar</IonButton>
        </form>
        <IonButton href='/testeCadastro'>TESTE BD</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
