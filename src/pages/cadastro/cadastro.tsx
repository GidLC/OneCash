import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonAlert } from '@ionic/react';
import './Cadastro.css';


const Cadastro: React.FC = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [emailParceiro, setEmailParceiro] = useState('');

  const cadastraUsuario = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (senha === confSenha) {
      const novoCadastro = {
        nome: nome,
        email: email,
        senha: senha,
        emailParceiro: emailParceiro,
      }
      console.log('Dados enviados:', { novoCadastro });
      
      setNome('');
      setEmail('');
      setSenha('');
      setConfSenha('');
      setEmailParceiro('');
    }else{
      <IonAlert
        trigger="present-alert"
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={['OK']}
      ></IonAlert>
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
        <form onSubmit={cadastraUsuario}>
          <IonInput type="text" placeholder="Nome" value={nome} onIonChange={e => setNome(e.detail.value!)}></IonInput>
          <IonInput type="email" placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)}></IonInput>
          <IonInput type="password" placeholder="Senha" value={senha} onIonChange={e => setSenha(e.detail.value!)}></IonInput>
          <IonInput type="password" placeholder="Confirme a Senha" value={confSenha} onIonChange={e => setConfSenha(e.detail.value!)}></IonInput>
          <IonInput type="email" placeholder="Email Parceiro" value={emailParceiro} onIonChange={e => setEmailParceiro(e.detail.value!)}></IonInput>
          <IonButton expand="block" type="submit" color="success">Cadastrar</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Cadastro;
