import React, { useContext, useState } from 'react';
import { IonButton, IonContent,IonFooter, IonIcon, IonInput, IonPage, } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../components/Header';
import MenuLateral from '../../components/MenuLateral';
import BarraInferior from '../../components/BarraInferior';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import AuthContext from '../../contexts/autenticaLogin';
import useSQLiteDB from '../../composables/useSQLiteDB';

const AddReceita: React.FC = () => {
  const Auth = useContext(AuthContext);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [destino, setDestino] = useState('');
  //const [data, setData] = useState<Date>();
  const [categoria, setCategoria] = useState('');
  const [status, setStatus] = useState('');

  // Hook para o BD
  const { performSQLAction, initialized } = useSQLiteDB();

  const novaReceita = {
    descricao: descricao,
    valor: valor,
    destino: destino,
    categoria: categoria,
    status: status,
  }

  console.log('Dados enviados:', { novaReceita });

  const cadReceita = async () => {
    try {
      
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO receitas (id, descricao, valor, destino, categoria, status, usuarioId, timestamp) values (?,?,?,?,?,?,?,?);`, [
            Date.now(),
            descricao,
            valor,
            destino,
            categoria,
            status,
            "ADMIN",
            Date.now()
          ]);
        },

        async () => {
          setDescricao("");
          setValor("");
          setDestino("");
          setCategoria("");
          setStatus("");

          //alert("Receita Cadastrada");
          alert(`Cadastrado ->Descrição:${descricao}Valor: ${valor}`)
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

          <form onSubmit={cadReceita}>

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

            <div>
              <IonInput label="Categoria:" labelPlacement="stacked" placeholder="Categoria" value={categoria} onIonChange={e => setCategoria(e.detail.value!)}></IonInput>
            </div>

            <div>
              <IonInput label="Status:" labelPlacement="stacked" placeholder="Status" value={status} onIonChange={e => setStatus(e.detail.value!)}></IonInput>
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
              <IonButton color='success' mode='md' type='submit'>
                <IonIcon icon={checkmark}></IonIcon>
              </IonButton>
            </div>
          </form>

          <IonButton href='/testeReceitas'>RECEITAS NO BD</IonButton>
        </IonContent>

        <IonFooter>
          <BarraInferior />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default AddReceita;

