import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonDatetime, IonFooter, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonToggle, } from '@ionic/react';
import { calendarOutline, checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../components/Header/Header';
import MenuLateral from '../../components/MenuLateral/MenuLateral';
import BarraInferior from '../../components/BarraInferior/BarraInferior';
import { SQLiteDBConnection } from 'react-sqlite-hook';
import useSQLiteDB from '../../composables/useSQLiteDB';

type SQLItemCategoria = {
  id_categoria_receita: number,
  nome_categoria_receita: string,
  cor_categoria_receita: string
}

type SQLItemUsuario = {
  id: number,
  nome: string,
}

type OBJData = {
  ano: Number,
  mes: Number,
  dia: Number,
  hora: Number,
  minuto: Number,
  segundo: Number
}

const AddReceita: React.FC = () => {
  const hoje = Date.now()

  const { performSQLAction, initialized } = useSQLiteDB();

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [usuariosBD, setUsuariosBD] = useState<Array<SQLItemUsuario>>();
  const [usuario, setUsuario] = useState<Number>();
  const [data, setData] = useState<OBJData>();
  const [categoriasBD, setCategoriasBD] = useState<Array<SQLItemCategoria>>();
  const [categoria, setCategoria] = useState<Number>();
  const [status, setStatus] = useState<Number>(0);
  const [showModal, setShowModal] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState('');

  useEffect(() => {
    carregaCategoria();
    carregaUsuario();
  }, [initialized]);

  const openModal = () => {
    setShowModal(true);
  };


  function carregaUsuario() {
    try {
      performSQLAction(async (db: SQLiteDBConnection | undefined) => {
        const respSelect = await db?.query(`SELECT * FROM usuario`);
        setUsuariosBD(respSelect?.values);
      });
    } catch (error) {
      alert((error as Error).message);
      setCategoriasBD([]);
    }
  }

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

  /*function carregaBanco() {
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
  }*/

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

  const addReceita = async () => {
    try {
      performSQLAction(
        async (db: SQLiteDBConnection | undefined) => {
          await db?.query(`INSERT INTO receita (descricao_receita, valor_receita, usuario_receita, 
            categoria_receita, status_receita, timestamp_receita, dia_receita, mes_receita, ano_receita) 
            values (?,?,?,?,?,?,?,?,?);`, [
            descricao,
            valor,
            usuario,
            categoria,
            status,
            Date.now(),
            data?.dia,
            data?.mes,
            data?.ano
          ]);
        },
        async () => {
          setDescricao("");
          setValor("");
          setCategoria(0);
          alert("Receita Cadastrada");
        }
      )
    } catch (error) {
      alert((error as Error).message);
    }
  };

  function separaData(e: any) {
    const [dataPart, horaPart] = e.split("T");
    const [ano, mes, dia] = dataPart.split("-");
    const [hora, minuto, segundo] = horaPart.split(":");

    const objData = {
      ano: parseInt(ano),
      mes: parseInt(mes),
      dia,
      hora: parseInt(hora),
      minuto: parseInt(minuto),
      segundo: parseInt(segundo)
    }

    if(dataSelecionada === "ONTEM"){
      objData.dia = parseInt(dia) - 1
    }else{
      objData.dia = parseInt(dia)
    }

    setData(objData)
    console.log(objData)
  }


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

          {/*<div>
            <IonList>
              <IonItem>
                <IonSelect aria-label="destino" placeholder="Destino" onIonChange={(e) => setDestino(e.detail.value!)}>
                  {bancoBD?.map((item, index) => (

                    <IonSelectOption value={item.id_banco} key={index}>{item.nome_banco}</IonSelectOption>

                  ))}
                </IonSelect>
              </IonItem>
            </IonList>
                  </div>*/}

          <div>
            <IonItem>
              <IonSelect aria-label="usuario" placeholder="Usuario" onIonChange={(e) => setUsuario(e.detail.value!)}>
                {usuariosBD?.map((item, index) => (
                  <IonSelectOption value={item.id} key={index}>{item.nome}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
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
            </div>*/}

          <div className='botaoData'>
            <IonIcon icon={calendarOutline} className='calendario' size="large"></IonIcon>

            <IonButton
              color={dataSelecionada === "HOJE" ? "success" : "primary"}
              onClick={() => {
                //separaData(hoje.toString)
                setDataSelecionada("HOJE")
              }}>HOJE</IonButton>

            <IonButton
              onClick={() => {
                separaData(hoje.toString)
                setDataSelecionada("ONTEM")
              }}
              color={dataSelecionada === "ONTEM" ? "success" : "primary"}
            >ONTEM</IonButton>

            <IonButton onClick={openModal}>OUTROS</IonButton>
          </div>

          <IonModal isOpen={showModal}>
            <IonDatetime
              id="datetime"
              presentation="date"
              showDefaultButtons
              doneText='OK'
              cancelText='CANCELAR'
              onIonChange={(e) => {
                setShowModal(false);
                separaData(e.detail.value);
                setDataSelecionada("OUTROS")
              }}
            ></IonDatetime>
          </IonModal>

          <div>
            <IonButton color='success' onClick={addReceita}>
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

