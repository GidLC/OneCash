import React, { useState } from 'react';
import { IonButton, IonContent, IonFooter, IonIcon, IonInput, IonModal, IonPage, IonRouterContext, IonRouterLink } from '@ionic/react';
import {checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../components/Header';
import MenuLateral from '../../components/MenuLateral';
import BarraInferior from '../../components/BarraInferior';

const AddReceita: React.FC = () => {

  const [valor, setValor] = useState('');
  {/*const [data, setData] = useState<Date>();*/ }
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');

  const adicionaReceita = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dados enviados:', { valor, descricao, observacao });

    setValor('');
    setDescricao('');
    setObservacao('');
  };

  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <Header nome='RECEITAS' />

        <IonContent>

          <form onSubmit={adicionaReceita}>
            <div>
              <IonInput type="number" label="Valor da receita:" labelPlacement="stacked" placeholder="R$0,00"
                value={valor} onIonChange={(e) => setValor(e.detail.value!)}></IonInput>
            </div>

            {/*<div className='botaoData'>
              <IonIcon icon={calendarOutline} className='calendario'></IonIcon>
              <IonDatetimeButton datetime="datetime" onIonChange={e => setData(e.detail.value!)}></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime" presentation='date' value={data}></IonDatetime>
              </IonModal>
            </div>*/}

            <div>
              <IonInput label="Descrição:" labelPlacement="stacked" placeholder="****" value={descricao} onIonChange={e => setDescricao(e.detail.value!)}></IonInput>
            </div>

            <div>
              <IonInput label="Observação:" labelPlacement="stacked" placeholder="****" value={observacao} onIonChange={e => setObservacao(e.detail.value!)}></IonInput>
            </div>

            <div>
              <IonButton color='success' mode='md' type='submit'>
                <IonIcon icon={checkmark}></IonIcon>
              </IonButton>
            </div>
          </form>
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default AddReceita;

