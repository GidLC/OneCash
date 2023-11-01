import React, { useContext, useEffect, useRef, useState } from 'react';
import { IonAlert, IonAvatar, IonButton, IonCheckbox, IonContent, IonFooter, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSearchbar, IonSelect, IonSelectOption, IonToggle, } from '@ionic/react';
import { checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../components/Header/Header';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import BarraInferior from '../../components/BarraInferior/BarraInferior';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import AuthContext from '../../contexts/autenticaLogin';
import useSQLiteDB from '../../composables/useSQLiteDB';

type SQLItemCategoria = {
  id_categoria_receita: number,
  nome_categoria_receita: string,
  cor_categoria_receita: string
}

type SQLItemBanco = {
  id_banco: number,
  nome_banco: string
}

const AddReceita: React.FC = () => {
  const { performSQLAction, initialized } = useSQLiteDB();
  const Auth = useContext(AuthContext);
  const modal = useRef<HTMLIonModalElement>(null);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [destino, setDestino] = useState('');
  //const [data, setData] = useState<Date>();
  const [categoria, setCategoria] = useState<Number>();
  const [status, setStatus] = useState<Number>(0);
  const [categoriasBD, setCategoriasBD] = useState<Array<SQLItemCategoria>>();
  const [bancoBD, setBancoBD] = useState<Array<SQLItemBanco>>();

  useEffect(() => {
    carregaCategoria();
    carregaBanco(); // Carrega os dados da base de dados quando o componente é montado ou quando o banco de dados é inicializado
  }, [initialized]);

  function carregaCategoria() {
    try {
      // Consulta a base de dados
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM categoria_receita`);
        setCategoriasBD(respSelect?.values);
      });

    } catch (error) {
      alert((error as Error).message);
      setCategoriasBD([]);
    }
  }

  function carregaBanco() {
    try {
      // Consulta a base de dados
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM banco`);
        setBancoBD(respSelect?.values);
      });

    } catch (error) {
      alert((error as Error).message);
      setBancoBD([]);
    }
  }

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
          await db?.query(`INSERT INTO receita (descricao_receita, valor_receita, destino_receita, usuario_receita, 
            categoria_receita, status_receita, timestamp_receita, dia_receita, mes_receita, ano_receita) 
            values (?,?,?,?,?,?,?,?,?,?);`, [
            descricao,
            valor,
            destino,
            1,
            categoria,
            status,
            Date.now(),
            hoje.getDate(),
            hoje.getMonth() + 1,
            hoje.getFullYear()
          ]);
        },
        async () => {
          setDescricao("");
          setValor("");
          setDestino("");
          setCategoria(0);
          alert("Receita Cadastrada");
        }
      )
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
            <IonList>
              <IonItem>
                <IonSelect aria-label="destino" placeholder="Destino" onIonChange={(e) => setDestino(e.detail.value!)}>
                  {bancoBD?.map((item, index) => (

                    <IonSelectOption value={item.id_banco} key={index}>{item.nome_banco}</IonSelectOption>

                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
          </div>

          <div>
            <IonList>
              <IonItem>
                <IonSelect aria-label="categoria" placeholder="Categoria" onIonChange={(e) => setCategoria(e.detail.value!)}>
                  {categoriasBD?.map((item, index) => (

                    <IonSelectOption value={item.id_categoria_receita} key={index}>{item.nome_categoria_receita}</IonSelectOption>

                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
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

