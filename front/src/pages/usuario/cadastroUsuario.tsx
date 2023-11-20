import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonTabButton, IonIcon, IonGrid, IonRow } from '@ionic/react';
import './cadastroUsuario.css';
import { arrowBackCircleOutline } from 'ionicons/icons';
import InputTexto from '../../ui/components/inputs/InputTexto/InputTexto';

//Será necessário fazer autenticação via e-mail para o usuário (exemplo sistema de cadastro feito na matéria do Henrique)
// Para fazer a autenticação é necessário criar uma tabela com usuários "provisórios"

//Necessário validar as entradas do usuário


const Cadastro: React.FC = () => {
  const [usuario, setUsuario] = useState({})
  const [confSenha, setConfSenha] = useState('')

  const eventoChange = (chave: string, valor: string) => {
    setUsuario({
      ...usuario,
      [chave]: valor,
    })
    console.log(`Chave: ${chave} Valor: ${valor}`)
  }

  const eventoSubmit = (e: any) => {
    e.preventDefault();

    if (confSenha != usuario.senha) {
      alert(`As senhas não conferem`)
    } else {
      console.log(`Dados a serem enviados para a API: ${JSON.stringify(usuario)}`)
    }
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
              <IonTitle>Faça agora seu cadastro</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <InputTexto tipo="text" texto="Nome completo" change={(e: { detail: { value: string; }; }) => eventoChange("nome", e.detail.value!)} />
        <InputTexto tipo="email" texto="Email" change={(e: { detail: { value: string; }; }) => eventoChange("email", e.detail.value!)} />
        <InputTexto tipo="password" texto="Senha" change={(e: { detail: { value: string; }; }) => eventoChange("senha", e.detail.value!)} />
        <InputTexto tipo="password" texto="Confirmar Senha" change={(e: { detail: { value: string; }; }) => setConfSenha(e.detail.value!)} />
        <InputTexto tipo="email" texto="Email do Parceiro" change={(e: { detail: { value: string; }; }) => eventoChange("emailParc", e.detail.value!)} />
        <IonButton expand="block" type="button" color="success" onClick={eventoSubmit}>Cadastrar</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Cadastro
