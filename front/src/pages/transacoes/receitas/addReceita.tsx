import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonDatetime, IonFooter, IonIcon, IonInput, IonItem, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonToggle, } from '@ionic/react';
import { calendarOutline, checkmark } from 'ionicons/icons';
import './addReceita.css'
import Header from '../../../ui/partials/HeaderHome/HeaderHome';
import MenuLateral from '../../../ui/components/MenuLateral/MenuLateral';
import BarraInferior from '../../../ui/partials/BarraInferior/BarraInferior';
import apiReceita from '../../../data/services/api/receita/apiReceita';

type SQLItemCategoria = {
  id_categoria_receita: number,
  nome_categoria_receita: string,
  cor_categoria_receita: string
}

type SQLItemUsuario = {
  id: number,
  nome: string,
}

/*type OBJData = {
  ano: Number,
  mes: Number,
  dia: Number,
  hora: Number,
  minuto: Number,
  segundo: Number
}*/

const AddReceita: React.FC = () => {
  const hoje = Date.now()

  const [receita, setReceita] = useState({});
  const [usuariosBD, setUsuariosBD] = useState<Array<SQLItemUsuario>>();
  const [categoriasBD, setCategoriasBD] = useState<Array<SQLItemCategoria>>();
  const [showModal, setShowModal] = useState(false);
  const [dataSelecionada, setDataSelecionada] = useState('');

  useEffect(() => {
    carregaCategoria();
    carregaUsuario();
  },[]);

  const eventoChange = (chave: string, valor: any) => {
    setReceita({
      ...receita,
      [chave]: valor,
    })
  }

  const openModal = () => {
    setShowModal(true);
  };


  function carregaUsuario() {
    //Carrega usuário existente no banco de dados
  }

  function carregaCategoria() {
    //Carrega categorias existentes no banco de dados
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
      eventoChange("status", 1);
      console.log(status.detail.checked)
    } else {
      eventoChange("status", 1);
      console.log(status.detail.checked)
    }
  }

  const eventoSubmit = async () => {
    //Adiciona a receita no banco de dados
    await apiReceita.AddReceita(receita)
  };

  /*function separaData(e: any) {
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
  }*/
  


  return (
    <>
      <MenuLateral />
      <IonPage id="main-content">
        <Header nome='RECEITAS' />

        <IonContent>
          <div>
            <IonInput label="Descrição:" labelPlacement="stacked" placeholder="****" value={receita.descricao} onIonChange={e => eventoChange("descricao", e.detail.value!)}></IonInput>
          </div>

          <div>
            <IonInput type="number" label="Valor da receita:" labelPlacement="stacked" placeholder="R$0,00"
              value={receita.valor} onIonChange={(e) => eventoChange("valor", e.detail.value!)}></IonInput>
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
              <IonSelect aria-label="usuario" placeholder="Usuario" onIonChange={(e) => eventoChange("usuario", e.detail.value!)}>
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
                <IonSelect aria-label="categoria" placeholder="Categoria" onIonChange={(e) => eventoChange("categoria", e.detail.value!)}>
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
                eventoChange("data", hoje.toString)
                setDataSelecionada("HOJE")
              }}>HOJE</IonButton>

            <IonButton
              onClick={() => {
                //eventoChange("data", hoje.toString)
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
                eventoChange("data", e.detail.value);
                setDataSelecionada("OUTROS")
              }}
            ></IonDatetime>
          </IonModal>

          <div>
            <IonButton color='success' onClick={eventoSubmit}>
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
