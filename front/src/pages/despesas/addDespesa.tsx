import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonDatetime, IonFooter, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonToggle, } from '@ionic/react';
import { calendarOutline, checkmark } from 'ionicons/icons';
import './addDespesa.css'
import Header from '../../ui/partials/HeaderHome/HeaderHome';
import MenuLateral from '../../ui/components/MenuLateral/MenuLateral';
import BarraInferior from '../../ui/partials/BarraInferior/BarraInferior';
import { SQLiteDBConnection } from 'react-sqlite-hook';

type SQLItemCategoria = {
  id_categoria_despesa: number,
  nome_categoria_despesa: string,
  cor_categoria_despesa: string
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

const AddDespesa: React.FC = () => {
  const hoje = Date.now()

  const [descricao, setDescricao] = useState('')
  const [valor, setValor] = useState('')
  const [usuariosBD, setUsuariosBD] = useState<Array<SQLItemUsuario>>()
  const [usuario, setUsuario] = useState<Number>()
  const [data, setData] = useState<OBJData>()
  const [categoriasBD, setCategoriasBD] = useState<Array<SQLItemCategoria>>()
  const [categoria, setCategoria] = useState<Number>()
  const [status, setStatus] = useState<Number>(0)
  const [showModal, setShowModal] = useState(false)
  const [dataSelecionada, setDataSelecionada] = useState('')

  useEffect(() => {
    loadData()
  }, /*[Estado para verificar se o banco de dados está inicializad]*/);

  const openModal = () => {
    setShowModal(true);
  };


  const loadData = async () => {
    //Carregar usuários do banco de dados

    //Carregar categorias de despesas cadastradas no banco de dados
  }

  function defineStatus(e: any) {
    const status = e;
    if (status.detail.checked == true) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }

  const AddDespesa = async () => {
    //Insere despesas no banco de dados
  };

  function separaData(e: any) {
    const [dataPart, horaPart] = e.split("T");
    const [ano, mes, dia] = dataPart.split("-");
    const [hora, minuto, segundo] = horaPart.split(":");

    let novoDia: number;

    if (dataSelecionada === "ONTEM") {
      novoDia = parseInt(dia) - 1;
    } else {
      novoDia = parseInt(dia);
    }

    const objData = {
      ano: parseInt(ano),
      mes: parseInt(mes),
      dia: novoDia,
      hora: parseInt(hora),
      minuto: parseInt(minuto),
      segundo: parseInt(segundo)
    }

    setData(objData);
    console.log(objData);
  }



  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <Header nome='DESPESAS' />

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

                    <IonSelectOption value={item.id_categoria_despesa} key={index}>{item.nome_categoria_despesa}</IonSelectOption>

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
            <IonToggle labelPlacement="end" onIonChange={defineStatus}>PAGO</IonToggle>
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
            <IonButton color='success' onClick={AddDespesa}>
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

export default AddDespesa;
