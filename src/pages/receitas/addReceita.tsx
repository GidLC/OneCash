import React, { useContext, useRef, useState } from 'react';
import { IonAlert, IonAvatar, IonButton, IonCheckbox, IonContent, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonToggle, } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../components/Header/Header';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import BarraInferior from '../../components/BarraInferior/BarraInferior';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import AuthContext from '../../contexts/autenticaLogin';
import useSQLiteDB from '../../composables/useSQLiteDB';

const AddReceita: React.FC = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const Auth = useContext(AuthContext);
  const modal = useRef<HTMLIonModalElement>(null);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [destino, setDestino] = useState('');
  //const [data, setData] = useState<Date>();
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState<Number>(0);

  function defineStatus(e: any) {
    const status = e;
    if (status.detail.checked == true) {
      setStatus(1);
      console.log(status.detail.checked)
    } else {
      setStatus(0);
      console.log(status.detail.checked)
    }
  }

  const cadReceita = async () => {
    try {
      const hoje = new Date();
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          if (status != null) {
            await db?.query(`INSERT INTO receita (descricao_receita, valor_receita, destino_receita, usuario_receita, 
            categoria_receita, status_receita, timestamp_receita, dia_receita, mes_receita, ano_receita) 
            values (?,?,?,?,?,?,?,?,?,?);`, [
              descricao,
              valor,
              destino,
              Auth?.usuario?.id,
              5,
              status,
              Date.now(),
              hoje.getDate(),
              hoje.getMonth() + 1,
              hoje.getFullYear()
            ]);
          } else {
            alert("Por favor, defina o status antes de cadastrar a receita.");
          }
        },

        async () => {
            setDescricao("");
            setValor("");
            setDestino("");
            setCategoria("");
            alert("Receita Cadastrada");
        }
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <Header nome='RECEITAS' />

        <IonContent>
          <div>
            <IonInput label="Descrição:" labelPlacement="stacked" placeholder="****" value={descricao} onIonChange={e => setDescricao(e.detail.value!)}></IonInput>
          </div>

          <div>
            <IonInput type="number" label="Valor da receita:" labelPlacement="stacked" placeholder="R$0,00"
              value={valor} onIonChange={(e) => setValor(e.detail.value!)}></IonInput>
          </div>

          <div>
            <IonInput label="Destino:" labelPlacement="stacked" placeholder="Destino" value={destino} onIonChange={e => setDestino(e.detail.value!)}></IonInput>
          </div>

          {/*<div>
              <IonButton id="open-modal">
                Categoria
              </IonButton>

              <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                <IonContent className="ion-padding">
                  <IonList>
                    <IonItem>
                    <IonCheckbox value={categoria} onIonChange={e => setCategoria(e.detail.value!)}>SALÁRIO</IonCheckbox>
                    </IonItem>
                  </IonList>
                </IonContent>
              </IonModal>
  </div>*/}

          <div>
            <IonToggle labelPlacement="end" onIonChange={defineStatus}>Recebido</IonToggle>
          </div>

          {/*<div>
              <IonInput label="Observação:" labelPlacement="stacked" placeholder="****" value={observacao} onIonChange={e => setObservacao(e.detail.value!)}></IonInput>
            </div>

            <div className='botaoData'>
              <IonIcon icon={calendarOutline} className='calendario'></IonIcon>
              <IonDatetimeButton datetime="datetime" onIonChange={e => setData(e.detail.value!)}></IonDatetimeButton>
              <IonModal keepContentsMounted={true}>
                <IonDatetime id="datetime" presentation='date' value={data}></IonDatetime>
              </IonModal>
            </div>*/}

          <div>
            <IonButton color='success' onClick={cadReceita}>
              <IonIcon icon={checkmark}></IonIcon>
            </IonButton>
          </div>
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default AddReceita;

