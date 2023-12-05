import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonIcon, IonGrid, IonRow, IonSegment, IonSegmentButton, IonLabel, IonInput } from '@ionic/react';
import { arrowBackCircleOutline } from 'ionicons/icons';
import './cadastroUsuario.css';
import InputTexto from '../../ui/components/inputs/InputTexto/InputTexto';
import api from '../../data/services/auth/api';

//Será necessário fazer autenticação via e-mail para o usuário (exemplo sistema de cadastro feito na matéria do Henrique)
// Para fazer a autenticação é necessário criar uma tabela com usuários "provisórios"

//Cadastrar a senha no banco de dados com criptografia (utilizar sha256)
//Validar as entradas do usuário (email como email, senha)
//Criar lógica para cadastrar o usuário e seu parceiro
//Criar código que deve ser armazenado localmente para garantir a segurança do acesso as informações
//Não pode ser cadastrados usuários com o mesmo e-mail


const Cadastro: React.FC = () => {
  const [usuario, setUsuario] = useState({})
  const [confSenha, setConfSenha] = useState('')
  const [cadastro, setCadastro] = useState(false)
  const [parcEncontrado, setParcEncontrado] = useState(false)


  const data = new Date;
  const hoje = data.toISOString();

  const eventoChange = (chave: string, valor: string) => {
    setUsuario({
      ...usuario,
      [chave]: valor,
      dt_criacao: hoje
    })
  }

  const onChangeSegment = (e: any) => {
    e.preventDefault();
    const segment = e.detail.value;

    if (segment === "atribuicao" && !cadastro) {
      setCadastro(true)
    } else if (segment === "cadastro" && cadastro) {
      setCadastro(false)
      setParcEncontrado(false)
    }
    console.log(cadastro)
  }

  const eventoSubmit = async () => {
    //cadastro
    if (!cadastro) {
      if (confSenha != usuario.senha) {
        alert(`As senhas não conferem`)
      } else {
        try {
          await api.addUsuario(usuario)
          alert(`Usuário Enviado para a API`)
        } catch (error: any) {
          console.error(`Erro ao cadastrar usuario`, error.message)
        }
      }
      //vinculação
    } else {
      if (parcEncontrado) {
        try {
          await api.vinculaCadastro(usuario)
          alert(`Usuário vinculado com sucesso`)
        }
        catch (error: any) {
          console.error(`Erro ao vincular usuario`, error.message)
        }
      } else {
        try {
          const parceiro = await api.buscaCadastro(usuario.cod_casal)
          if (parceiro == null) {
            alert(`Código não encontrado`)
          } else {
            const conf: any = confirm(`Você será vinculado ao seu parceiro ${parceiro.nome_usuario}`)
            if (confirm(conf) == true) {
              setParcEncontrado(true)
            }
            atribuiUsuario(parceiro)
          }

        } catch (error: any) {
          console.error(`Erro ao encontrar usuario`, error.message)
        }
      }
    }
  }

  const atribuiUsuario = async (parceiro: Object) => {

  }



  return (
    <IonPage>
      <IonHeader color='primary'>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonButton href="/" slot="start">
                <IonIcon aria-hidden="false" icon={arrowBackCircleOutline} size="size" />
              </IonButton>
              <IonTitle>CADASTRE-SE</IonTitle>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>

      <IonToolbar>
        <IonSegment value={cadastro ? "atribuicao" : "cadastro"} onIonChange={onChangeSegment}>
          <IonSegmentButton value="cadastro">
            <IonLabel>CADASTRO INICIAL</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="atribuicao">
            <IonLabel>ATRIBUIÇÃO</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonToolbar>

      {cadastro && !parcEncontrado ? (
        <IonContent>
          <IonInput type='text' placeholder='Código do casal' onIonChange={(e) => { eventoChange("cod_casal", e.detail.value!) }} />
          <IonButton color="success" onClick={eventoSubmit}>ENVIAR CÓDIGO</IonButton>
          {parcEncontrado ? (
            <>
              <InputTexto tipo="text" texto="Nome completo" change={(e: { detail: { value: string; }; }) => eventoChange("nome", e.detail.value!)} />
              <InputTexto tipo="email" texto="Email" change={(e: { detail: { value: string; }; }) => eventoChange("email", e.detail.value!)} />
              <InputTexto tipo="password" texto="Senha" change={(e: { detail: { value: string; }; }) => eventoChange("senha", e.detail.value!)} />
              <InputTexto tipo="password" texto="Confirmar Senha" change={(e: { detail: { value: string; }; }) => setConfSenha(e.detail.value!)} />
              <IonButton expand="block" type="button" color="success" onClick={eventoSubmit}>Cadastrar</IonButton>
            </>) :
            ""}
        </IonContent>
      ) : (
        <IonContent>
          <InputTexto tipo="text" texto="Nome completo" change={(e: { detail: { value: string; }; }) => eventoChange("nome", e.detail.value!)} />
          <InputTexto tipo="email" texto="Email" change={(e: { detail: { value: string; }; }) => eventoChange("email", e.detail.value!)} />
          <InputTexto tipo="password" texto="Senha" change={(e: { detail: { value: string; }; }) => eventoChange("senha", e.detail.value!)} />
          <InputTexto tipo="password" texto="Confirmar Senha" change={(e: { detail: { value: string; }; }) => setConfSenha(e.detail.value!)} />
          {/*<InputTexto tipo="email" texto="Email do Parceiro" change={(e: { detail: { value: string; }; }) => eventoChange("emailParc", e.detail.value!)} />*/}
          <IonButton expand="block" type="button" color="success" onClick={eventoSubmit}>{parcEncontrado == true ? "VINCULAR" : "CADASTRAR"}</IonButton>
        </IonContent>
      )}

    </IonPage>
  )
}

export default Cadastro
