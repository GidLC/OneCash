import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonFooter, IonHeader, IonIcon, IonInput, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../../components/Header';
import MenuLateral from '../../components/MenuLateral';
import BarraInferior from '../../components/BarraInferior';
import { calendarOutline, checkmark } from 'ionicons/icons';
import React, { useState } from 'react';

function AddDespesa() {
  const [valor, setValor] = useState<string>('');
  {/*const [data, setData] = useState<Date>();*/ }
  const [descricao, setDescricao] = useState<string>('');
  const [observacao, setObservacao] = useState<string>('');

  const adicionaDespesa = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dados enviados:', { valor, descricao, observacao });
  };

  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <IonHeader>
          <Header nome='DESPESA' />
        </IonHeader>

        <IonContent>
          <form onSubmit={adicionaDespesa}>
            <div>
              <IonInput type="number" label="Valor da Despesa:" labelPlacement="stacked" placeholder="R$0,00"
                value={valor} onIonChange={(e) => setValor(e.detail.value!)}></IonInput>
            </div>
  
            {/*<div className='botaoData'>
              <IonIcon icon={calendarOutline} className='calendario'></IonIcon>
              <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime" presentation='date'></IonDatetime>
              </IonModal>
              </div>*/}
  
            <div>
              <IonInput label="Descrição:" labelPlacement="stacked" placeholder="****" value={descricao} onIonChange={e => setDescricao(e.detail.value!)}></IonInput>
            </div>
  
            <div>
              <IonInput label="Observação:" labelPlacement="stacked" placeholder="****" value={observacao} onIonChange={e => setObservacao(e.detail.value!)}></IonInput>
            </div>
  
            <div>
              <IonButton color='danger' mode='md' type='submit'>
                <IonIcon icon={checkmark}>
                </IonIcon></IonButton>
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

export default AddDespesa;
